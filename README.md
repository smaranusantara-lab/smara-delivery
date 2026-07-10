# SMARA Delivery MVP

Internal Delivery Management System for SMARA Catering.

## Status

✅ Milestone 0 — Design System: complete
✅ Milestone 1 — Project Foundation: complete
⏳ Milestone 2 — Authentication: pending approval

Not implemented yet (by design, per BUILD_PLAN.md): Authentication, Owner Dashboard, Delivery Management, Driver Application, KPI. See `src/features/*/README.md` for what's reserved for each.

## Tech Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS
- Supabase (anon key only — no service role key, see `docs/TECHNICAL_ARCHITECTURE.md`)
- Vercel (hosting target)

## Getting Started

This project was generated without network access, so dependencies have **not** been installed and the build has **not** been run yet. Do this locally:

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# then fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
# from your Supabase project settings (anon/public key only — never the
# service role key, per docs/TECHNICAL_ARCHITECTURE.md)

# 3. Run the dev server
npm run dev
```

Open http://localhost:3000 — you'll see a style-guide page reviewing the Milestone 0 design tokens and Milestone 1 base components (not a product screen; feature pages start in Milestone 2).

Other useful commands:

```bash
npm run build        # production build
npm run lint         # ESLint
npm run type-check   # TypeScript check with no emit
```

## Project Structure

```
src/
├── app/                 # Next.js App Router routes (currently: root layout + style-guide home page)
├── components/
│   ├── ui/               # Generic, reusable UI (Button, Input, Select, Textarea, Card, Badge)
│   └── layout/            # Shared layout primitives (PageContainer)
├── features/             # Feature-owned code, one folder per product area
│   ├── auth/               # Milestone 2 (empty — see README inside)
│   ├── dashboard/           # Milestone 3 (empty)
│   ├── delivery/            # Milestone 4 (empty)
│   ├── driver/               # Milestone 5 (empty)
│   └── kpi/                   # Milestone 6 (empty)
├── lib/
│   ├── supabase/           # Browser + server Supabase clients (anon key only)
│   └── config.ts            # App-wide constants
├── services/              # Supabase data-access functions (empty until Milestone 4 — see README inside)
├── hooks/                 # Shared hooks not owned by one feature (empty for now)
├── types/                 # Shared TypeScript types, mirroring docs/DATABASE_SCHEMA.md
└── utils/                 # date.ts (Asia/Jakarta helpers), cn.ts (classname utility)
```

See `docs/TECHNICAL_ARCHITECTURE.md` for the full rationale behind this structure, the auth flow, and the RLS strategy.

## Documentation

All approved project documentation lives in `docs/`:

- `PROJECT_BRIEF.md`, `PRODUCT_REQUIREMENTS.md`, `DATABASE_SCHEMA.md`, `DEVELOPER_SPEC.md` — original product docs
- `BUILD_PLAN.md` — milestone plan and status
- `IMPLEMENTATION_PLAN.md` — how each milestone maps to concrete technical tasks
- `TECHNICAL_ARCHITECTURE.md` — folder structure, routing, auth flow, RLS strategy
- `DESIGN_SYSTEM_SPECIFICATION.md` — design tokens, component inventory, responsive strategy

## Modules (per BUILD_PLAN.md)

- Delivery Management
- Driver Management
- Proof of Delivery (POD)
- KPI & Reporting

## Next Milestone

Milestone 2 — Authentication is scoped and ready, but **not started**. Waiting for approval per `docs/BUILD_PLAN.md`'s development workflow (one milestone at a time).
