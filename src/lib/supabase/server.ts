import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";
import { getSupabaseUrl, getSupabaseAnonKey } from "./client";

/**
 * Supabase client for use in Server Components, Server Actions, and
 * Route Handlers.
 *
 * Anon key ONLY (see client.ts and docs/TECHNICAL_ARCHITECTURE.md).
 * This client carries the Owner's Supabase Auth session (read from
 * cookies) when present, which is what lets Row Level Security scope
 * Owner requests correctly. Driver requests are unauthenticated at
 * this layer by design — driver scoping happens in `services/`
 * functions using the driver id read from the app's own session
 * cookie (introduced in Milestone 2), not from this client.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll is called from a Server Component in some cases,
          // where cookies can't be mutated. Safe to ignore as long as
          // middleware handles session refresh (added in Milestone 2).
        }
      },
    },
  });
}
