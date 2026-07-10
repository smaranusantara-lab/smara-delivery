import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

/**
 * Supabase client for use in Client Components.
 *
 * Uses the public anon key ONLY — per the approved Technical
 * Architecture, this project never uses the Supabase service role
 * key. All access control is enforced through Row Level Security
 * (Owner) and application-layer scoping (Driver — see
 * docs/TECHNICAL_ARCHITECTURE.md Section 6 for the reasoning).
 */
export function createClient() {
  return createBrowserClient<Database>(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
  );
}

export function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not set. Copy .env.example to .env.local and fill it in.",
    );
  }
  return url;
}

export function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Copy .env.example to .env.local and fill it in.",
    );
  }
  return key;
}
