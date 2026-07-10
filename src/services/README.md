# services

Typed Supabase data-access functions, one file per table
(`deliveries.ts`, `drivers.ts`, `delivery-status-logs.ts`), added
starting Milestone 4 alongside the features that need them.

Rule: this is the only layer that imports the Supabase client
(`lib/supabase`). Features call into `services/`, never Supabase
directly, so RLS assumptions and driver-scoping logic
(docs/TECHNICAL_ARCHITECTURE.md Section 6) live in one place. Empty for now.
