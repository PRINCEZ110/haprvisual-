# HAPR Visual — 3D Agency Website

A full-stack, pixel-faithful HAPR Visual agency website

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · GSAP · Framer
Motion · Three.js + React Three Fiber + Drei · Prisma + PostgreSQL ·
NextAuth.js (admin auth) · Resend (contact emails) · Cloudflare R2 /
local uploads · Vercel-ready.

---

## Features

### Public site
- **Home** — sticky navbar with live **Kyiv clock**, hero with an interactive
  **3D floating chair** (mouse parallax + scroll-driven motion), filterable
  **projects grid** (Rendering / Furniture / Architecture / Visualisation /
  Space / Products), **services accordion** (5 services, exact copy), working
  **contact form** ("Let's collaborate!"), dark footer with time, location and
  copyright.
- **/about** — studio story, process, stats.
- **/privacy-policy**, **/terms-conditions** — legal pages.
- Fully responsive (desktop 12-col, tablet, mobile with fullscreen menu).

### Backend / Admin (`/admin`)
- **Contact form** — `POST /api/contact`: Zod validation, rate limiting
  (3/hour/IP), stored in PostgreSQL, optional email via Resend. Exact success /
  error messages from the original site.
- **Auth** — NextAuth credentials login (env-configurable admin user), sessions
  protect `/admin/*` and all `/api/admin/*` routes.
- **Dashboard** — project / submission / unread counts.
- **Projects CRUD** — create, edit, delete; categories (multi-tag), cover +
  gallery uploads (R2 when configured, otherwise local `/public/uploads`).
- **Services editor** — edit the five service titles/descriptions.
- **Submissions inbox** — view, mark read/unread, delete, filter.

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Database (PostgreSQL)

Option A — Docker:

```bash
docker compose up -d db
```

Option B — use any PostgreSQL (local or hosted, e.g. Neon/Supabase).
Either way, point `DATABASE_URL` in `.env` at your database:

```bash
cp .env.example .env   # then edit DATABASE_URL (and admin credentials)
```

### 3. Create tables + seed sample data

```bash
npx prisma migrate dev   # applies prisma/migrations (or: npm run db:push)
npm run db:seed          # 12 sample projects + 5 services
```

### 4. Run

```bash
npm run dev
```

Open http://localhost:3000

---

## Admin access

| URL      | Credentials (from `.env`)                         |
| -------- | ------------------------------------------------- |
| `/admin` | `ADMIN_EMAIL` / `ADMIN_PASSWORD` (defaults: `admin@haprvisual.com` / `admin1234`) |

Change the defaults before going live.

---

## Environment variables

See `.env.example` for the full list:

| Variable                | Purpose                                          |
| ----------------------- | ------------------------------------------------ |
| `DATABASE_URL`          | PostgreSQL connection string                     |
| `NEXTAUTH_URL`          | Site URL (http://localhost:3000 in dev)          |
| `NEXTAUTH_SECRET`       | Auth session secret (`openssl rand -base64 32`)  |
| `ADMIN_EMAIL`           | Admin login email                                |
| `ADMIN_PASSWORD`        | Admin login password                             |
| `RESEND_API_KEY`        | Optional — send contact emails via Resend        |
| `CONTACT_FROM_EMAIL`    | Sender for contact emails                        |
| `CONTACT_TO_EMAIL`      | Recipient for contact emails (default haprvisual@gmail.com) |
| `R2_*` (5 vars)         | Optional — store uploads on Cloudflare R2; leave blank to use local `/public/uploads` |

## Deployment (Vercel)

1. Push the repo to GitHub and import it on Vercel.
2. Add a hosted Postgres (Neon/Supabase) and run `npx prisma migrate deploy` + `npm run db:seed` against it.
3. Add all env vars in the Vercel dashboard.
4. Deploy.

> Note: `next build` needs `DATABASE_URL` reachable if you don't use the
> `catch` fallbacks — the public site gracefully degrades when the DB is
> unreachable (projects/services fall back to defaults).

## Images

The original site's render assets are copyrighted, so this build uses:
- **Unsplash CDN photos** for the projects grid and service thumbnails
  (free to use — replace from the admin panel with your own renders).
- **Local SVG placeholder renders** (`/public/images/*.svg`) for the contact
  section and about page.
- A real-time **3D scene (Three.js/R3F)** in the hero — no image required.

## Project structure

```
prisma/                 schema, migration, seed
src/app/                App Router pages + API routes
src/app/api/contact/    public contact endpoint (rate-limited)
src/app/api/admin/      protected admin CRUD endpoints
src/components/         public site components (Navbar, Hero3D, Projects, …)
src/components/admin/   admin panel components
src/lib/                prisma, auth, validation, mail, storage, constants
public/images/          local SVG placeholder renders
```
