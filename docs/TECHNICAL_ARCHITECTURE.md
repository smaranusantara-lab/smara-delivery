# TECHNICAL ARCHITECTURE

SMARA Delivery MVP — for review before Milestone 0 begins.

---

## 1. Folder Structure

Feature-based, as specified:

```
src/
├── app/                    # Next.js App Router — routes only, thin
│   ├── (auth)/
│   │   └── login/
│   ├── (owner)/
│   │   ├── dashboard/
│   │   ├── deliveries/
│   │   │   └── [id]/
│   │   └── kpi/
│   └── (driver)/
│       ├── dashboard/
│       └── deliveries/
│           └── [id]/
├── components/              # Shared, generic UI (design-system output)
│   ├── button/
│   ├── input/
│   ├── card/
│   └── badge/
├── features/
│   ├── auth/                 # Login forms, session logic, role guards
│   ├── dashboard/             # Owner dashboard summary widgets
│   ├── delivery/              # Delivery list, detail, create/edit, assignment, sequencing
│   ├── driver/                # Driver dashboard, delivery execution, POD upload
│   └── kpi/                   # KPI calculations & charts
├── lib/                     # Supabase client setup, app-wide config
├── services/                 # Typed data-access functions per table (deliveries, drivers, delivery_status_logs)
├── hooks/                   # Shared hooks not owned by one feature
├── types/                   # Shared TypeScript types mirroring DB schema
└── utils/                   # Date/timezone (Asia/Jakarta), formatting, validation helpers
```

**Rule of thumb:** a `feature/` folder contains everything specific to that feature (its own components, hooks, and calls into `services/`). `components/` only holds things with zero business meaning (a Button doesn't know what a delivery is). `services/` only holds Supabase queries/mutations — no JSX, no business rules beyond basic validation.

---

## 2. Routing Strategy

- Next.js App Router with **route groups** separating Owner and Driver areas: `(owner)` and `(driver)`, plus `(auth)` for login.
- Each route group has its own layout that enforces the relevant role guard (see Section 6) before rendering children.
- `app/(owner)/deliveries/[id]` and `app/(driver)/deliveries/[id]` are separate routes even though they both show "delivery detail" — they render different `features/delivery` or `features/driver` components, since Owner and Driver see different actions on the same data.
- No route pagination params for MVP (per your decision), but list routes accept an optional `?date=` filter from the start since "today's deliveries" is a core concept everywhere.

---

## 3. State Management & Data Flow

- **Default to Server Components** for anything that's a read (dashboard, lists, detail views) — data fetched directly via `services/` functions at render time, no client-side fetching library needed for the common case.
- **Server Actions** for writes (create delivery, assign driver, update status, upload POD, login) — keeps mutation logic co-located with the feature and avoids exposing extra API routes.
- **Client-side state** is local and minimal: form state (`useState`/`useReducer` inside a feature's own components), no global state library (Redux/Zustand) needed for MVP — the app doesn't have complex cross-feature shared client state.
- **Data flow**, end to end:
  `Component (Server Component)` → calls `services/deliveries.ts` function → Supabase client (anon key, user's session attached) → Postgres, filtered by RLS → data returned → rendered.
  `Component (form)` → Server Action → `services/deliveries.ts` mutation → Supabase (anon key, session attached) → RLS-checked write → revalidate/redirect.

This keeps `services/` as the single place that knows how to talk to Supabase; features never import the Supabase client directly.

---

## 4. Supabase Integration

- **Only the anon key is used**, everywhere — browser and server. There is no `SUPABASE_SERVICE_ROLE_KEY` in the codebase or environment at all, by design, so it can't be accidentally exposed or misused.
- Every Supabase call (server or client) carries the **current user's session** (Owner's Supabase Auth session, or the Driver's Supabase Auth session — see Section 5), so Postgres always evaluates RLS against a real `auth.uid()`. There is no "admin" path that bypasses RLS.
- Supabase Storage (`pod-images` bucket) is also accessed with the anon key; bucket policies (not just table RLS) will need to permit authenticated uploads/reads — covered in Section 7.

---

## 5. Authentication Flow

### Owner
- Standard Supabase Auth email + password. A single Owner user is created once (via Supabase dashboard or a one-time setup step) — no `owners` table needed.
- Login: `supabase.auth.signInWithPassword({ email, password })` using the anon key. Supabase issues a session; the Supabase SSR helper persists it in cookies.
- Owner identity for RLS purposes is just `auth.uid()` — since there's exactly one Owner, policies check against that one known UUID.

### Driver
Drivers authenticate against the `drivers` table only — no Supabase Auth account is created for them, and no new columns are needed on `drivers` (the schema as defined in DATABASE_SCHEMA.md is sufficient).

1. Driver picks their name from an active-drivers list, enters their PIN.
2. A Server Action looks up the driver, verifies the PIN with `bcrypt.compare()` against `drivers.pin` — entirely server-side.
3. On success, the server issues its own session: a signed, `httpOnly`, `secure` cookie (e.g., a JWT signed with an app-only secret, or an equivalent signed token) containing the driver's id. This is an application-layer session, unrelated to Supabase Auth.
4. Subsequent driver requests are verified by reading and validating this cookie in server-side code (middleware or a shared `requireDriverSession()` helper in `features/auth`) — there is no `auth.uid()` for drivers, since they never sign in to Supabase.

**Consequence for data access:** because the driver's identity lives only in the app's own session, not in a Supabase Auth JWT, all Supabase calls made on a driver's behalf must happen **server-side**, using the driver id read from the verified app session to explicitly scope every query (e.g., `.eq('driver_id', session.driverId)`) in the `services/` layer. The browser never talks to Supabase directly for driver flows — only through the app's own Server Actions/Route Handlers, which sit in front of Supabase and enforce driver scoping in application code.

### Session/Role Guards
- Owner routes check for a valid Supabase Auth session belonging to the Owner's known UUID.
- Driver routes check for a valid app-issued session cookie (verified signature + driver still `is_active`).
- These are two separate, independent guards — a request is never treated as "authenticated" by one system and trusted by the other.

---

## 6. RLS Strategy

RLS remains the enforcement layer for the **Owner**, since the Owner has a real Supabase Auth session (`auth.uid()`). For **drivers**, since identity now lives only in the app's own session (Section 5) and never reaches Postgres as an `auth.uid()`, RLS cannot distinguish "driver A" from "driver B" — both arrive at Postgres as the same unauthenticated `anon` role. Row-level isolation between drivers is therefore enforced in the **application layer** (every `services/` function scopes its query by the driver id read from the verified session cookie), not by Postgres.

**`deliveries` table:**
- `SELECT` / `UPDATE` (all columns) / `INSERT` / `DELETE` for `auth.uid() = OWNER_UUID`: full access, as before.
- `SELECT` / `UPDATE` (status, `pod_image_url`, `delivered_at` only) for the `anon` role: allowed, since driver requests are unauthenticated at the Postgres level. **Driver-to-driver row scoping and column restriction is enforced entirely by the application** — every driver-facing query in `services/` filters by `driver_id = <session driver id>`, and no driver-facing code path allows arbitrary `driver_id` input from the client.

**`drivers` table:**
- `SELECT` / `INSERT` / `UPDATE` / `DELETE`: Owner only. Driver login itself (looking up a driver by name to check the PIN) happens through a Server Action using the anon key — this requires a narrow `SELECT` policy for `anon` limited to the columns needed for login (name, id, `pin`, `is_active`), since the PIN comparison happens in the Next.js server, not in Postgres.

**`delivery_status_logs` table:**
- `SELECT` / `INSERT` for `auth.uid() = OWNER_UUID`: full access.
- `INSERT` for `anon`: allowed (driver status updates write here); again scoped in application code to the driver's own delivery, not by RLS.
- No `UPDATE`/`DELETE` for anyone — append-only.

**`OWNER_UUID` handling:** hardcoded directly into policy definitions, since there's exactly one Owner for MVP (simplest approach; revisit if multi-owner is ever needed).

**Storage (`pod-images` bucket) policy:** since driver uploads are also unauthenticated at the Postgres/Storage level, the bucket policy permits `anon` uploads; the application ensures a driver's Server Action only ever uploads against their own assigned delivery id before writing `pod_image_url`.

### Important trade-off to flag

Moving driver authorization out of Supabase Auth means Postgres itself can no longer tell one driver's request from another's, or from any request carrying the public anon key. The `anon` key is embedded in the client bundle regardless (it's needed for the Owner's login call too), so **RLS alone cannot fully prevent someone with the anon key from querying `deliveries`/`delivery_status_logs` directly, bypassing the Next.js app's driver-scoping logic** — the isolation between drivers, and between "logged in as a driver" vs. "not logged in at all," is a property the application guarantees, not the database.

For an internal, low-value-target MVP this is a reasonable and common trade-off, and it matches what you've asked for. If you'd like the database layer itself to close this gap later without reintroducing per-driver Supabase Auth accounts or a service role key, the standard pattern is routing all driver writes through a small number of Postgres RPC functions that verify a signed, server-issued token before touching any row — happy to design that as a post-MVP hardening step if/when it's a priority. No action needed now; flagging so the trade-off is a known, chosen decision rather than an implicit gap.
