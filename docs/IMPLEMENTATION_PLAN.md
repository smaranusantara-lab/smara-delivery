# IMPLEMENTATION PLAN

Aligned with `docs/BUILD_PLAN.md`. This document translates each approved milestone into concrete technical tasks, based on clarified requirements. No implementation begins until each milestone is individually approved, per the Development Workflow rule (one milestone at a time).

---

## Cross-Cutting Decisions (apply to all milestones)

- **Timezone**: Asia/Jakarta everywhere — a single shared date/time utility (e.g., `utils/date.ts`) wraps all date math, "today" boundaries, and display formatting. No raw `new Date()` comparisons in business logic.
- **Architecture**: Feature-based folder structure (see Technical Architecture doc). Each feature owns its UI, hooks, and feature-specific logic; shared data-access clients live in `services/`.
- **Auth model**: Owner authenticates via **Supabase Auth (email + password)**. Driver authenticates via **Driver Name + PIN**, checked server-side against a bcrypt hash in the `drivers` table, with no Supabase Auth account created for drivers — a successful PIN check results in the application issuing its own signed, server-side session cookie. Driver data access is scoped by the application layer, not by Supabase RLS (see Technical Architecture doc, Section 6, for the resulting trade-off and why it's an accepted decision for this MVP).
- **Supabase key policy**: Only the **anon key** is used, client and server. The **service role key is not used anywhere** in this MVP. All access control is enforced through Row Level Security policies, not through elevated server privileges.
- **No pagination**: Lists fetch full result sets for MVP; code should still be written so pagination can be added later without a rewrite (e.g., data-access functions accept optional range params, unused for now).

---

## Milestone 0 — Design System

**Goal:** A finished, reusable visual language exists before any feature screen is built, so every later milestone builds on approved tokens and components instead of ad hoc styling.

Deliverables:
- Color system (primary/neutral palette + semantic colors)
- Typography scale (font, sizes, weights, line-heights)
- Spacing scale
- Border radius scale
- Shadow/elevation scale
- Button variants (primary, secondary, destructive, ghost; sizes; disabled/loading states)
- Input variants (text, number, textarea, select; default/focus/error/disabled states)
- Card component
- Badge component (used for delivery status)
- Status colors (mapped 1:1 to the five delivery statuses: Pending, Assigned, In Progress, Delivered, Failed)
- Layout grid (mobile-first breakpoints and container rules)
- Mobile-first responsive rules

Output of this milestone is documented in the **Design System Specification** and, once approved, implemented as Tailwind config + a small set of base components in `components/` — no feature screens yet.

---

## Milestone 1 — Project Foundation

**Goal:** Environment and scaffolding ready for feature work.

Tasks:
- Initialize Next.js 15 (App Router) + TypeScript + Tailwind.
- Configure Supabase client (browser + server instances) using **only** `SUPABASE_URL` and `SUPABASE_ANON_KEY` — no service role key in the codebase or env files at all.
- Feature-based folder structure (full detail in Technical Architecture doc):
  - `app/` (routes only — thin, delegates to features)
  - `components/` (shared, generic UI: Button, Input, Card, Badge, etc. from Milestone 0)
  - `features/auth/`, `features/dashboard/`, `features/delivery/`, `features/driver/`, `features/kpi/`
  - `lib/` (Supabase client setup, config)
  - `services/` (typed data-access functions per table, consumed by features)
  - `hooks/` (shared hooks not tied to one feature)
  - `types/` (shared TypeScript types mirroring DB schema)
  - `utils/` (date/timezone helpers, formatting, etc.)
- Reusable layout shell (mobile-first) and base UI components (button, input, card, status badge, etc.), built to the Milestone 0 design system — no page logic yet.

**Definition of Done check:** compiles, no TS/lint errors, responsive shell renders.

---

## Milestone 2 — Authentication

**Goal:** Owner and Driver can each log in and maintain a session.

Tasks:
- **User selection screen**: entry point choosing Owner vs Driver flow.
- **Owner login**: standard Supabase Auth email + password sign-in (`supabase.auth.signInWithPassword`, anon key). No custom credential handling — Supabase Auth manages the session and its own password hashing.
- **Driver PIN login**:
  - Driver selects their name from an active-drivers list (`is_active = true`).
  - Enters PIN → server-side action verifies it against the bcrypt hash stored for that driver.
  - On success, the server issues its own signed, `httpOnly` session cookie identifying the driver — no Supabase Auth account involved.
- **Session management**: 
  - Owner: Supabase Auth session, checked via the standard SSR helper.
  - Driver: app-issued signed cookie, checked via a shared `requireDriverSession()` helper.
  - Both guards are independent; a route only trusts the session type it expects.
- **Logout**: clears the Supabase Auth session (Owner) or the app session cookie (Driver), as appropriate.
- Bcrypt hashing utility for creating/rotating driver PINs (used when Owner creates a driver in Milestone 4, or a seed script for initial data).

---

## Milestone 3 — Owner Dashboard

**Goal:** Owner gets operational visibility at a glance.

Tasks:
- Dashboard summary cards: total deliveries, assigned, in progress, delivered, failed (counts scoped to a selected date, default today, Asia/Jakarta boundaries).
- Today's deliveries list (compact view).
- Driver statistics (deliveries per driver, completion rate — basic, not full KPI module which is Milestone 6).
- Delivery status summary (visual breakdown, e.g., simple counts/bar).
- Quick actions (e.g., jump to create delivery, jump to unassigned list) — links only, no new logic.

Data access: read-only aggregation queries against `deliveries`; no writes in this milestone.

---

## Milestone 4 — Delivery Management

**Goal:** Owner can fully manage delivery orders.

Tasks:
- **Delivery list**: full table/list, mobile-responsive, status badges.
- **Search & filter**: by customer name/order number, status, driver, date.
- **Create delivery** (manual entry, per clarification): form capturing order_number, customer_name, customer_phone, address, delivery_date, notes; latitude/longitude captured via Google Maps geocoding on address entry.
- **Delivery detail**: full record view/edit.
- **Assign driver**: Owner selects an active driver for a delivery; writes `driver_id`, status → `Assigned`, and a `delivery_status_logs` entry (`updated_by = "owner"`).
- **Sequence number**: manual field Owner sets per delivery per day.
  - **Generate Route (assist)**: a Google Maps + Gemini–assisted suggestion — given the day's assigned deliveries' addresses, Gemini proposes a suggested visiting order using map/distance context; Owner reviews and can accept or manually override before saving `sequence_number` values. This is explicitly an assist/suggestion tool, not automatic route optimization.
- **Status management**: Owner can manually change status (e.g., correct a mistake), writing a `delivery_status_logs` entry each time.
- Enforce business rules: only Owner can assign drivers/edit delivery info; one driver per delivery.

**Open implementation note for approval:** exact Gemini prompt/interaction design for route suggestion (e.g., single-shot suggestion vs. iterative chat) — will propose a simple version and confirm before building.

---

## Milestone 5 — Driver Application

**Goal:** Driver can execute their assigned deliveries end-to-end.

Tasks:
- **Driver dashboard**: today's deliveries, completed count, remaining count (Asia/Jakarta "today").
- **Assigned deliveries list**: sorted by `sequence_number`.
- **Delivery detail** (driver view): customer name, phone, address, notes, status, Google Maps button.
- **Open Google Maps**: deep link/button using stored lat/lng (or address fallback) to open native/Google Maps navigation.
- **Update status**: driver can move status forward (e.g., Assigned → In Progress; and Failed with a note), writing `delivery_status_logs` (`updated_by = <driver name>`).
- **Upload Proof of Delivery (POD)**:
  - Single photo upload to Supabase Storage bucket `pod-images`.
  - On successful upload: set `pod_image_url`, set `status = 'Delivered'`, set `delivered_at = now()`, write a `delivery_status_logs` entry — all as one atomic action (server action/transaction), not separate driver steps.
- Enforce: driver can only view/act on deliveries where `driver_id` matches their session; cannot touch other drivers' deliveries.

---

## Milestone 6 — Monitoring & KPI

**Goal:** Operational reporting for the Owner.

Tasks:
- **Delivery progress**: live counts by status for a selected date/range.
- **Success rate**: Delivered ÷ (Delivered + Failed) for a period.
- **Failed deliveries**: list/count with reasons (from `notes`), filterable by date/driver.
- **Delivery completion time**: per-delivery duration derived from `delivery_status_logs` (start event → `Delivered` event timestamp), all in Asia/Jakarta.
- **Average Delivery Time**: aggregate of the above across a period.
- **Daily KPI dashboard**: composite view combining the above metrics, date-range selectable.

Data access: read-only queries/aggregations over `deliveries` + `delivery_status_logs`; no new tables anticipated, but will flag if aggregation performance suggests otherwise once real data volume is known.

---

## Still Open (non-blocking, can decide per-milestone)

These don't block starting Milestone 0, but will need a decision before their respective milestone:

- Milestone 4: exact Gemini prompt design for route-sequencing assistance, and Google Maps API key/billing setup responsibility.
- Milestone 5: what "Failed" reason capture looks like in the UI (free text vs. predefined reason list) — currently assumed free text via `notes`.
- Post-MVP (not needed now): if driver-to-driver data isolation ever needs to be enforced at the database layer rather than the application layer, see Technical Architecture Section 6 for the trade-off and a possible hardening path.

---

## Note on Design System (Milestone 0)

No placeholder branding will be used. Milestone 0 builds a **neutral, functional interface** (system-default-adjacent colors, standard typography, no assumed brand identity). SMARA's official design system — colors, typography, spacing, components — will be defined separately and applied afterward, replacing the neutral tokens without requiring changes to component structure or logic, since components will consume tokens rather than hardcoded values.

---

## Next Step

Two supporting documents — **Technical Architecture** and **Design System Specification** — are provided alongside this plan for review. Once approved, we begin **Milestone 0 — Design System**, followed by **Milestone 1 — Project Foundation**. No code will be written until you confirm.
