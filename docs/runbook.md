# Bin Jimz — Go-Live Runbook

This is the step-by-step plan to take the Bin Jimz website live on AWS.
Estimated end-to-end time: **3–5 working days** for the first launch (most of
that is DNS/SES propagation).

## 0 · Prerequisites

- [ ] Domain `binjimz.com` registered and accessible
- [ ] AWS account with payment method, billing alerts, and IAM Identity Center enabled
- [ ] GitHub repository with the project code
- [ ] OpenAI account + production API key
- [ ] Local installs: `terraform >= 1.6`, `aws cli v2`, `docker`, `node >= 22`

## 1 · AWS account hardening (one-time, ~30 min)

```bash
aws sts get-caller-identity
```

Then in the AWS Console:

1. **Root user** → enable hardware MFA → never use again.
2. **IAM Identity Center** → create "Bin Jimz" instance → invite human admins.
3. **Cost Explorer** + **AWS Budgets** → set $300/mo alert at 50/80/100 %.
4. **CloudTrail** → enable a multi-region trail (S3 destination, KMS-encrypted).
5. **GuardDuty** → enable in `us-east-1` (and any other region you'll use).
6. **AWS Backup** → create a default plan with daily snapshots, 30-day retention.

## 2 · Terraform state bucket (one-time)

Create the remote-state bucket manually before running Terraform:

```bash
aws s3api create-bucket --bucket binjimz-tfstate --region us-east-1
aws s3api put-bucket-versioning --bucket binjimz-tfstate \
    --versioning-configuration Status=Enabled
aws s3api put-bucket-encryption --bucket binjimz-tfstate \
    --server-side-encryption-configuration '{
      "Rules": [{ "ApplyServerSideEncryptionByDefault": { "SSEAlgorithm": "AES256" }}]
    }'
```

Then uncomment the `backend "s3"` block in `infra/terraform/main.tf` with:

```hcl
backend "s3" {
  bucket = "binjimz-tfstate"
  key    = "prod/terraform.tfstate"
  region = "us-east-1"
}
```

## 3 · Provision the AWS stack with Terraform (~45 min)

```bash
cd infra/terraform
terraform init
terraform plan -var "environment=prod" \
               -var "domain_name=binjimz.com" \
               -var "openai_api_key=$OPENAI_API_KEY" \
               -var "nextauth_secret=$(openssl rand -base64 32)"
terraform apply
```

Resources created (~50): VPC + 2 AZs · NAT GW · ECS Fargate cluster + service ·
ECR · RDS PostgreSQL 16 (Multi-AZ + pgvector) · 2× S3 buckets ·
CloudFront + WAF · Route 53 zone · ACM certs (us-east-1 + region) ·
Cognito user pool · SES identities · Secrets Manager · CloudWatch logs.

After apply, Terraform prints:

- `name_servers` — set these at your domain registrar (or skip if domain already in Route 53)
- `ecr_repository_url` — for the next step
- `cognito_user_pool_id` / `cognito_client_id`

## 4 · DNS at the registrar (~5 min, +24h propagation)

At your registrar (e.g. GoDaddy, Namecheap), update name-servers to the four
NS values from Terraform output `name_servers`. Wait for propagation
(`dig NS binjimz.com` should return AWS NS).

Once DNS is hot, ACM cert validation completes automatically (Terraform created
the validation records).

## 5 · First Docker image (~10 min)

```bash
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <ECR_URL>

docker build -t binjimz-web .
docker tag binjimz-web:latest <ECR_URL>:latest
docker push <ECR_URL>:latest
```

ECS service auto-redeploys with the new image (forced deployment).

## 6 · Prisma migrations + seed (~5 min)

You need a temporary jump host inside the VPC (or run via a one-off ECS task).
Easiest: add `aws_instance` bastion or use AWS Systems Manager Session Manager.

```bash
# Pull DB URL from Secrets Manager
DATABASE_URL=$(aws secretsmanager get-secret-value \
  --secret-id binjimz-prod/db --query SecretString --output text \
  | jq -r .url)

DATABASE_URL="$DATABASE_URL" npx prisma migrate deploy
DATABASE_URL="$DATABASE_URL" npm run db:seed
```

Verify the admin user exists:

```sql
SELECT id, email, role FROM "User";
```

## 7 · SES production access (~24h, request via console)

By default SES is in sandbox mode (only verified recipients).

1. Verify the domain: Terraform created the `aws_sesv2_email_identity`
   resources. Add the **DKIM CNAME** records to Route 53 (Terraform output
   `ses_dkim_records` if you add it; otherwise grab from console).
2. Request **production access** via the SES console
   ("Request production access"). Provide a brief use-case description.
3. Send a test:
   ```bash
   aws ses send-email --from no-reply@binjimz.com \
     --to your-email@example.com \
     --subject "Bin Jimz SES smoke test" \
     --text "It works."
   ```

## 8 · Cognito admin users

```bash
aws cognito-idp admin-create-user \
  --user-pool-id <POOL_ID> \
  --username m.mostafa@binjimz.com \
  --user-attributes Name=email,Value=m.mostafa@binjimz.com Name=email_verified,Value=true \
  --temporary-password 'TempBinJimz#2026'
```

User signs in at `/admin/login`, is forced to set a permanent password
(via Cognito Hosted UI flow if they use the Cognito provider — otherwise
the credentials provider works against the seeded admin row).

## 9 · GitHub Actions CI/CD (~15 min)

Add the following secrets in your GitHub repo:

| Secret | Value |
|---|---|
| `AWS_DEPLOY_ROLE_ARN` | OIDC role ARN with ECR + ECS permissions |
| `DATABASE_URL` | RDS connection URL (from Secrets Manager) |

Optionally configure GitHub OIDC trust for your AWS account (no static keys):

```bash
# In AWS:
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list ffffffffffffffffffffffffffffffffffffffff
# Then create a role with trust policy for your repo + push permissions to ECR/ECS
```

Push to `main` → CI builds & runs migrations → ECS rolls out the new task
revision → `services-stable` waits until healthy targets are stable.

## 10 · Smoke tests (~15 min)

After CloudFront finishes deploying (15–25 min for first deploy):

- [ ] `https://www.binjimz.com/en` loads, hero shield animates
- [ ] `https://www.binjimz.com/ar` loads, layout flips RTL, fonts swap
- [ ] Custom cursor works on desktop
- [ ] Project pages and image galleries load from CloudFront
- [ ] `/contact` form submits → lead row created + SES email arrives
- [ ] `/chat` floating dock opens, sends a message, gets a streamed reply
- [ ] Voice button records, transcribes, replies (Whisper + TTS)
- [ ] `/admin/login` blocks unauthenticated access
- [ ] Admin dashboard shows 1 lead from the contact form test
- [ ] Sitemap reachable at `https://www.binjimz.com/sitemap.xml`
- [ ] `robots.txt` reachable
- [ ] Lighthouse desktop score > 90 (Perf, A11y, BP, SEO)
- [ ] WAF logs show blocked traffic (visit the site with a known-bad UA)

## 11 · Monitoring & alarms

CloudWatch alarms to add (via console or extra Terraform module):

| Alarm | Trigger | Action |
|---|---|---|
| ECS `CPUUtilization` > 80% for 10 min | scale-out + page on-call | SNS → email |
| ALB `HTTPCode_Target_5XX` > 5/min | application errors | SNS → email |
| RDS `CPUUtilization` > 80% for 10 min | DB pressure | SNS → email |
| RDS `FreeStorageSpace` < 10% | disk pressure | SNS → email |
| CloudFront `5xxErrorRate` > 2% for 5 min | edge errors | SNS → email |
| WAF `BlockedRequests` spike (>1000/5 min) | possible attack | SNS → email |
| SES `Bounce` rate > 5% | sender reputation | SNS → email |

Confirm AWS Backup is taking RDS snapshots daily (retention 30 days) and S3
versioning is enabled on both buckets.

## 12 · Day-2 ops

### Deploy a new version

```bash
git push origin main      # GitHub Actions handles the rest
```

### Rollback

```bash
aws ecs update-service \
  --cluster binjimz-prod-cluster \
  --service binjimz-prod-web \
  --task-definition binjimz-prod-web:<previous_revision>
```

### Add a new admin

```bash
# Via DB seed (credentials provider):
SEED_ADMIN_EMAIL=name@binjimz.com SEED_ADMIN_PASSWORD='strong!' \
  npm run db:seed

# Via Cognito (federated):
aws cognito-idp admin-create-user --user-pool-id <POOL> ...
```

### Edit content

Sign in at `/admin/login` → use the CMS to add Projects, News, Team, etc.

### Re-embed the chatbot knowledge base

After publishing a batch of new projects:

```bash
DATABASE_URL=... OPENAI_API_KEY=... \
  npx tsx scripts/embed-knowledge.ts   # (optional: add this script later)
```

### Database backups

- RDS automated snapshots: 7 days
- AWS Backup plan: 30 days (cross-account if compliance required)
- Manual snapshot before any major migration:
  ```bash
  aws rds create-db-snapshot \
    --db-snapshot-identifier binjimz-pre-migration-$(date +%Y%m%d) \
    --db-instance-identifier binjimz-prod-pg
  ```

## 13 · Cost watch

Approximate monthly costs (us-east-1):

| Item | Monthly |
|---|---|
| Route 53 hosted zone | $0.50 |
| ACM certificates | $0 |
| ECS Fargate (1 task, 0.5 vCPU, 1GB) | ~$15 |
| ALB | ~$20 |
| NAT Gateway + data | ~$33 |
| RDS db.t4g.small Multi-AZ | ~$50 |
| RDS storage 30GB gp3 | ~$3 |
| S3 + CloudFront (~50GB transfer) | ~$10 |
| Cognito (free up to 50k MAU) | $0 |
| SES (1k emails/mo) | < $1 |
| CloudWatch logs + GuardDuty | ~$10 |
| Secrets Manager (3 secrets) | ~$1.20 |
| WAF | ~$10 |
| **Subtotal infra** | **~$155** |
| OpenAI usage (chat + voice) | $50–200 |
| **Total** | **~$200–355** |

To save: run `db.t4g.micro` Single-AZ for staging, set ECS desired-count
autoscaling minimum to 1.

## 14 · Disaster scenarios

- **CloudFront 502** → check ALB target health → ECS task health → recent deploy.
- **RDS down** → check Multi-AZ failover, restore from snapshot if needed.
- **SES suppression** → check bounce rate, request review.
- **WAF blocking legitimate users** → adjust rule scope or disable specific managed rule.
- **Domain compromise** → lock at registrar, rotate all secrets in Secrets Manager.

---

Owner: Bin Jimz IT · Last updated: 2026-05.
