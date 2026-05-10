# Bin Jimz — Corporate Website

**Building the future. Securing what matters.**

A luxurious, motion-rich corporate website for Bin Jimz Company —
engineering, contracting and cybersecurity solutions — with a custom cursor,
voice-enabled AI assistant, full EN/AR + RTL bilingual support, and an admin
CMS, deployed on AWS.

## Stack

- **Framework**: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- **Motion**: Framer Motion · GSAP · Lenis · React-Three-Fiber + drei
- **Cursor**: Custom state-machine cursor with `view`, `talk`, `drag`, `hover`,
  `read`, `loading`, `default` variants
- **i18n**: next-intl (EN + AR with full RTL)
- **DB**: Prisma · PostgreSQL 16 + `pgvector` extension
- **Auth**: NextAuth v5 (Credentials + AWS Cognito provider)
- **AI**: OpenAI GPT-4o (streaming chat) · Whisper (STT) · GPT-4o-mini-tts
  (TTS) · text-embedding-3-small for RAG
- **Email**: AWS SES
- **Storage**: AWS S3 + CloudFront (signed assets)
- **Deploy**: Docker → ECR → ECS Fargate · ALB · CloudFront · WAF · Cognito · RDS · SES · Route 53

## Quick start (local dev)

```bash
# 1) Install dependencies
npm install --legacy-peer-deps

# 2) Set up env
cp .env.example .env.local
# Fill in DATABASE_URL, OPENAI_API_KEY, NEXTAUTH_SECRET, AWS_*, etc.

# 3) Database
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed         # creates the admin user (admin@binjimz.com / ChangeMe!2026)

# 4) Run
npm run dev
```

Visit:

- `http://localhost:3000/en` — English home
- `http://localhost:3000/ar` — Arabic home (RTL)
- `http://localhost:3000/admin/login` — Admin (use seeded credentials)

## Project layout

```
.
├─ src/
│  ├─ app/
│  │  ├─ [locale]/                # public site (EN/AR)
│  │  │  ├─ about, services, projects, industries, insights, contact, chat
│  │  ├─ admin/                   # CMS
│  │  │  ├─ (auth)/login
│  │  │  └─ (dashboard)/...
│  │  └─ api/                     # chat, voice, leads, admin/upload, auth
│  ├─ components/
│  │  ├─ cursor/                  # Custom cursor + magnetic
│  │  ├─ motion/                  # Reveal, Counter, PageTransition
│  │  ├─ three/                   # ShieldHero, CyberGrid (R3F)
│  │  ├─ chat/                    # ChatDock, ChatPanel (text+voice)
│  │  ├─ sections/                # Hero, Stats, ServicesGrid, etc.
│  │  ├─ layout/                  # Navbar, Footer
│  │  └─ admin/                   # Admin shell components
│  ├─ lib/                        # db, openai, ses, s3, auth, rate-limit
│  ├─ messages/                   # en.json, ar.json
│  ├─ i18n/                       # next-intl routing/navigation
│  └─ data/                       # seed projects fallback
├─ prisma/
│  ├─ schema.prisma               # Postgres + pgvector
│  └─ seed.ts                     # admin user + services + projects
├─ infra/terraform/               # full AWS stack
├─ Dockerfile                     # multi-stage standalone image
└─ .github/workflows/             # CI + deploy
```

## Brand system

Tokens (defined in `src/app/globals.css` via Tailwind v4 `@theme inline`):

| Token | Value | Use |
|---|---|---|
| `--color-base` | `#0b0b0c` | Background |
| `--color-surface` | `#1e1e22` | Cards |
| `--color-gold` | `#c8a96a` | Primary accent |
| `--color-gold-deep` | `#8c7345` | Gold gradient end |
| `--color-gold-soft` | `#e6cf9c` | Highlight |
| `--color-cyber` | `#1b9cfc` | Cybersecurity accent |
| `--color-text` | `#f5f6fa` | Body text |

Fonts: **Cinzel** (display, EN) · **Montserrat** (body, EN) · **Reem Kufi** (display, AR) · **Cairo** (body, AR).

## Custom cursor

Drives entirely from `useCursor()` context. Any element can opt in:

```tsx
import { Magnetic } from "@/components/cursor/magnetic";
import { HoverArea } from "@/components/cursor/hover-area";

<Magnetic variant="hover">
  <Button>Get in touch</Button>
</Magnetic>

<HoverArea variant="view">
  <ProjectCard ... />
</HoverArea>
```

Variants: `default · hover · view · drag · talk · read · loading`.
Hidden on touch devices via `(hover: none)` media query.

## AI Assistant ("Jimz")

- Streamed chat at **`/api/chat`** (Server-Sent text stream).
- Voice in: **`/api/voice/transcribe`** (Whisper).
- Voice out: **`/api/voice/speak`** (GPT-4o-mini-tts).
- System prompt and knowledge base in
  `src/lib/chat/system-prompt.ts`.
- RAG-ready (table `KnowledgeChunk` with `vector(1536)` column).
- Lead capture tool: any sales intent triggers a Lead row + SES email to
  `SES_SALES_EMAIL`.
- Without an `OPENAI_API_KEY`, the chat falls back to a smart canned-reply
  engine so the UI never breaks in dev.

## Going live (AWS)

See `docs/runbook.md` for the full step-by-step launch guide, including:

1. AWS account + IAM Identity Center setup
2. Terraform `apply` (provisioning ~50 AWS resources)
3. Docker build + push to ECR
4. Prisma migrations against RDS
5. SES production access
6. DNS cutover at registrar / Route 53
7. CloudFront cache invalidation
8. CloudWatch alarms + AWS Backup plan

Estimated monthly cost: **$110–250 / month** + OpenAI usage.

## Key scripts

```bash
npm run dev              # local dev
npm run build            # production build
npm run start            # serve production build
npm run lint
npm run format
npm run db:generate      # prisma generate
npm run db:migrate       # create + apply dev migration
npm run db:deploy        # apply migrations (prod)
npm run db:seed          # seed admin + content
npm run db:studio        # browse data
```

## Production build

```bash
docker build -t binjimz-web .
docker run --rm -p 3000:3000 \
  -e DATABASE_URL=... \
  -e NEXTAUTH_SECRET=... \
  -e OPENAI_API_KEY=... \
  binjimz-web
```

## Routes summary

Public (50 prerendered pages, EN+AR):

```
/[locale]                       Home
/[locale]/about
/[locale]/services
/[locale]/services/[pillar]     engineering · supplies · contracting · cybersecurity
/[locale]/projects
/[locale]/projects/[slug]
/[locale]/industries
/[locale]/insights
/[locale]/careers
/[locale]/contact
/[locale]/chat                  Full-page voice assistant
/[locale]/privacy /[locale]/terms
```

Admin:

```
/admin/login                    Public login
/admin                          Dashboard (auth-gated)
/admin/projects /admin/projects/new /admin/projects/[id]
/admin/news /admin/team /admin/leads /admin/chat-logs
/admin/media /admin/settings
```

API:

```
/api/auth/[...nextauth]
/api/chat                       SSE streaming chat
/api/voice/transcribe
/api/voice/speak
/api/leads
/api/admin/upload
```

## Contact

- Email: m.mostafa@binjimz.com
- Phone: +20 10 10429021
- Office: Nasr City, Cairo, Egypt
- Web: www.binjimz.com

---

© Bin Jimz Company. All rights reserved.
