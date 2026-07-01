# Bin Jimz Website — Team Project Guide

_The single orientation doc for everyone working on the Bin Jimz corporate site — engineers, content editors, and ops. It explains what the system is, how the pieces fit, and where to find things. For a 5‑minute local setup use the [README](../README.md); for taking it live or day‑2 operations use the [Go‑Live Runbook](./runbook.md)._

---

## What this is

Bin Jimz is a bilingual (English / Arabic, full RTL) corporate marketing site for an engineering, contracting, supplies, and cybersecurity company. Beyond the public marketing pages it ships three things most brochure sites don't:

- an **admin CMS** for managing projects, news, team members, media, leads, and site settings;
- a **voice‑enabled AI assistant** ("Jimz") that chats with visitors, captures sales leads, and can speak and listen; and
- a **full AWS deployment** defined in Terraform, shipped as a Docker image to ECS Fargate behind CloudFront + WAF.

It is a Next.js 16 App Router application in TypeScript, backed by PostgreSQL (with the `pgvector` extension for chatbot retrieval) via Prisma.

> Heads‑up for anyone (or any AI tool) writing code here: this repo pins **Next.js 16**, which has breaking changes from earlier versions. Check `node_modules/next/dist/docs/` and heed deprecation notices before reaching for patterns from older Next. This is the rule captured in `AGENTS.md`.

## System at a glance

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, `@tailwindcss/typography` |
| Motion / 3D | Framer Motion, GSAP, Lenis smooth‑scroll, React‑Three‑Fiber + drei |
| i18n | next-intl (EN + AR, `localePrefix: "always"`, RTL) |
| Database | PostgreSQL 16 + `pgvector`, Prisma ORM |
| Auth | NextAuth v5 — Credentials (bcrypt) + optional AWS Cognito |
| AI | OpenAI GPT‑4o (streaming chat), Whisper (STT), GPT‑4o‑mini‑tts (TTS), `text-embedding-3-small` (RAG) |
| Storage | AWS S3 + CloudFront (with Vercel Blob support) |
| Email | AWS SES |
| Editor | TipTap (rich text in the admin CMS) |
| Deploy | Docker → ECR → ECS Fargate · ALB · CloudFront · WAF · RDS · Cognito · SES · Route 53 |
| CI/CD | GitHub Actions (`ci.yml` build, `deploy.yml` ship) |

## Architecture overview

The app runs as a single standalone Next.js server (`output: "standalone"`) that serves three surfaces from one codebase:

1. **Public site** — `src/app/[locale]/…`. Locale‑prefixed, mostly prerendered marketing pages. All public traffic passes through `src/proxy.ts` (the next-intl middleware) which handles locale routing; note the middleware `matcher` deliberately excludes `/api` and `/admin`.
2. **Admin CMS** — `src/app/admin/…`. Split into an `(auth)` group (the public login page) and a `(dashboard)` group (everything behind authentication). Not locale‑prefixed.
3. **API routes** — `src/app/api/…`. Server handlers for auth, the AI chat stream, voice in/out, lead capture, and admin media upload.

A typical request path in production: **Route 53 → CloudFront (+ WAF) → ALB → ECS Fargate task (the Next.js container) → RDS / S3 / SES / OpenAI**. Static assets and uploaded media are served from S3 via CloudFront; the Next image loader is configured (in `next.config.ts`) to allow S3, CloudFront, Vercel Blob, and a few known hosts.

Security headers (`X-Frame-Options: DENY`, `nosniff`, referrer policy, a restrictive `Permissions-Policy` that only grants microphone to self for the voice feature) are set globally in `next.config.ts`.

## Repository map

```
src/
├─ app/
│  ├─ [locale]/          Public site (about, services/[pillar], projects/[slug],
│  │                     industries, insights, careers, contact, chat, privacy, terms)
│  ├─ admin/
│  │  ├─ (auth)/login    Public admin login
│  │  └─ (dashboard)/    Dashboard, projects, news, team, leads, chat-logs, media,
│  │                     settings, site  (all auth-gated)
│  ├─ api/               auth/[...nextauth], chat, voice/transcribe, voice/speak,
│  │                     leads, admin/upload, admin/media
│  ├─ layout.tsx         Root layout; robots.ts + sitemap.ts live here too
│  └─ globals.css        Tailwind v4 theme tokens (@theme inline)
├─ components/
│  ├─ sections/          Page sections: hero, stats, services-grid, featured-projects…
│  ├─ three/             R3F scenes: shield-hero, cyber-grid
│  ├─ chat/              chat-dock, chat-panel (text + voice UI)
│  ├─ motion/            reveal, counter, page-transition
│  ├─ admin/             CMS forms + media pickers (project-form, news-form, team-form…)
│  ├─ layout/            navbar, footer
│  ├─ providers/         smooth-scroll, html-attrs
│  ├─ seo/               structured-data (JSON-LD)
│  └─ ui/                button, section, brand-mark
├─ lib/                  db, openai, s3, ses, blob, rate-limit, utils,
│                        auth/ (options + index), chat/system-prompt, site-content
├─ i18n/                 routing, navigation, request (next-intl wiring)
├─ messages/             en.json, ar.json (UI copy)
├─ data/                 projects.ts (seed / fallback content)
├─ types/                next-auth.d.ts (session type augmentation)
└─ proxy.ts              next-intl middleware

prisma/     schema.prisma (Postgres + pgvector), migrations/, seed.ts
infra/      terraform/ (vpc, ecs, rds, s3, cloudfront, cognito, ses, route53, waf…)
docs/       runbook.md, PROJECT_GUIDE.md (this file)
.github/    workflows/ci.yml, workflows/deploy.yml
Dockerfile  Multi-stage standalone image for ECS
```

## Data model

The schema lives in `prisma/schema.prisma`. A recurring pattern: **content models are split from their translations** — e.g. `Project` holds structural/media fields while `ProjectTranslation` holds the EN and AR copy, keyed uniquely on `(projectId, locale)`. The same split applies to `Service`, `TeamMember`, and `NewsArticle`. When you add a localized field, add it to the `*Translation` model, not the base model.

Core entities:

- **User** — admin accounts. `passwordHash` for the Credentials provider; `cognitoSub` for federated login. `Role` is `superadmin | editor | viewer`.
- **Service / ServiceTranslation** — the four pillars (`engineering`, `supplies`, `contracting`, `cybersecurity`), each with capabilities and a process description.
- **Project / ProjectTranslation** — portfolio work, with `status` (`draft | published | archived`), `featured` flag, cover + gallery media, and service tags.
- **TeamMember**, **NewsArticle** — same translation pattern; news bodies are rich text.
- **MediaAsset** — every uploaded image; tracks the S3 key, mime, dimensions, and uploader. Referenced by project covers, article covers, and team photos.
- **Lead** — captured enquiries. `source` records where it came from (`contact_form`, `chatbot`, `consultation`, `cybersecurity_assessment`) and `status` tracks the sales pipeline.
- **ChatSession / ChatMessage** — full transcript of every assistant conversation, including tool calls and token counts. Sessions can spawn leads.
- **KnowledgeChunk** — RAG store; holds a `vector(1536)` embedding column (declared as Prisma `Unsupported`) powered by pgvector.
- **SiteSetting** — arbitrary key/value JSON for editable global settings.

## Key subsystems

**Internationalization & RTL.** Routing is defined in `src/i18n/routing.ts` (`locales: ["en","ar"]`, default `en`, prefix always). The middleware in `src/proxy.ts` rewrites locale paths. UI strings live in `src/messages/{en,ar}.json`. The document direction and font swap (Cinzel/Montserrat for EN, Reem Kufi/Cairo for AR) are driven per‑locale — Arabic renders full RTL.

**Authentication.** Configured in `src/lib/auth/options.ts`. The Credentials provider validates email/password against the `User` table with bcrypt. If `COGNITO_*` env vars are present, an AWS Cognito provider is added automatically — otherwise it's silently skipped, so local dev works with just the seeded admin. Session/user types are augmented in `src/types/next-auth.d.ts` to carry `role`.

**AI assistant "Jimz".** The brain lives in `src/lib/chat/system-prompt.ts` and `src/lib/openai.ts`.
- Chat is a streamed response at `POST /api/chat` (server‑sent text stream).
- Voice input: `POST /api/voice/transcribe` (Whisper). Voice output: `POST /api/voice/speak` (GPT‑4o‑mini‑tts).
- Retrieval is backed by the `KnowledgeChunk` table + pgvector embeddings.
- Sales intent triggers a `Lead` row and an SES notification to `SES_SALES_EMAIL`.
- **Graceful degradation:** with no `OPENAI_API_KEY`, chat falls back to a canned‑reply engine so the UI never breaks in dev. The chat UI is `src/components/chat/` (`chat-dock`, `chat-panel`); there's also a full‑page `/[locale]/chat`.

**Media & storage.** Uploads go through `POST /api/admin/upload`; `src/lib/s3.ts` handles S3 (with presigned URLs) and `src/lib/blob.ts` supports Vercel Blob. Every upload is recorded as a `MediaAsset`. Admin media pickers live in `src/components/admin/`.

**Email.** `src/lib/ses.ts` wraps AWS SES for transactional mail (lead notifications, contact‑form receipts).

**Rate limiting.** `src/lib/rate-limit.ts` protects the public API routes (chat, voice, leads) from abuse.

**Brand, cursor & motion.** Design tokens are defined in `src/app/globals.css` via Tailwind v4 `@theme inline` (dark base `#0b0b0c`, gold accent `#c8a96a`, cyber blue `#1b9cfc`). Motion primitives are in `src/components/motion/`; the 3D hero and cyber grid are R3F scenes in `src/components/three/`. A custom state‑machine cursor (variants like `hover`, `view`, `talk`, `read`) is documented in the README and is hidden on touch devices.

## Local development

Full instructions are in the [README](../README.md). The short version:

```bash
npm install --legacy-peer-deps      # note: legacy peer deps is required
cp .env.example .env.local          # then fill in the blanks
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed                     # seeds admin@binjimz.com / ChangeMe!2026
npm run dev
```

Then open `http://localhost:3000/en`, `/ar`, or `/admin/login`.

Handy scripts (`package.json`): `db:migrate`, `db:deploy`, `db:seed`, `db:studio` (browse data), `db:push`, `format` (Prettier), `lint`. Note that `build` runs `prisma generate` first, and `postinstall` does too — so the Prisma client is always in sync.

## Environment variables

Every variable is listed with a sample value in `.env.example`. They group into: **App** (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`), **Database** (`DATABASE_URL`), **NextAuth** (`NEXTAUTH_URL`, `NEXTAUTH_SECRET`), **Cognito** (optional admin auth), **AWS** (region + credentials), **S3** (media/upload buckets, CDN URL), **SES** (from + sales addresses), **OpenAI** (API key + model names), and **Admin bootstrap** (`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`).

Never commit real secrets. `.env`, `.env.local` are git‑ignored; in production these come from AWS Secrets Manager (see the runbook).

## Conventions

- **TypeScript everywhere**, path alias `@/…` maps to `src/…` (see `tsconfig.json`).
- **Components** are grouped by role (`sections`, `admin`, `ui`, `motion`, `three`, …). Reusable primitives go in `ui/`; page‑specific composition goes in `sections/`.
- **Localized content** always goes through a `*Translation` model + `messages/*.json` — never hardcode user‑facing copy in a component.
- **Formatting** is Prettier with the Tailwind plugin (`npm run format`); linting is `eslint-config-next` (`npm run lint`). `.prettierrc` and `eslint.config.mjs` hold the config.
- **Server‑only secrets** (OpenAI, AWS, DB) are only read in `lib/` modules and API routes — never in client components.

## CI/CD & deployment

- **CI** (`.github/workflows/ci.yml`): on every PR and push to `main`, installs deps, runs `prisma generate`, and does a full `next build` with dummy env — this is the build gate.
- **Deploy** (`.github/workflows/deploy.yml`): on push to `main` (or manual dispatch), authenticates to AWS via OIDC (`AWS_DEPLOY_ROLE_ARN`), builds and pushes the Docker image to ECR (tagged with the commit SHA and `latest`), runs `prisma migrate deploy` against RDS, forces a new ECS deployment, and waits for service stability.
- **Image**: the multi‑stage `Dockerfile` produces a Next standalone build running as a non‑root `nextjs` user on `node:22-alpine`, listening on port 3000.
- **Infra**: everything AWS is in `infra/terraform/` — VPC, ECS, RDS, S3, CloudFront, Cognito, SES, Route 53, WAF. Provisioning, DNS, SES production access, monitoring alarms, rollback, and cost breakdown are all in the [runbook](./runbook.md).

Required GitHub secrets: `AWS_DEPLOY_ROLE_ARN`, `DATABASE_URL`.

## Where to find things / who owns what

| I need to… | Go to |
|---|---|
| Change public page copy | `src/messages/{en,ar}.json` and the page in `src/app/[locale]/…` |
| Add/edit a project, news post, team member | Admin CMS at `/admin` (no code needed) |
| Change the DB shape | `prisma/schema.prisma` → `npm run db:migrate` |
| Tune the AI assistant's behavior | `src/lib/chat/system-prompt.ts` |
| Adjust brand colors / fonts | `src/app/globals.css` |
| Add an API endpoint | `src/app/api/…/route.ts` |
| Change deployment / infra | `infra/terraform/` + `.github/workflows/deploy.yml` |
| Take the site live or operate it | [`docs/runbook.md`](./runbook.md) |

**Primary contact / owner:** Bin Jimz IT — m.mostafa@binjimz.com.

## Related docs

- [README.md](../README.md) — quick start, stack, brand system, routes, cursor & assistant reference.
- [docs/runbook.md](./runbook.md) — full AWS go‑live plan, monitoring, rollback, cost, and disaster scenarios.
- `AGENTS.md` — the Next.js‑16 rule for anyone (human or AI) generating code in this repo.

---

_Last updated: 2026-07-01._
