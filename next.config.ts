import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Supabase Storage (pod-images bucket) will serve images from your project's
    // storage domain. Add it here once the Supabase project is created, e.g.:
    // remotePatterns: [{ hostname: "<project-ref>.supabase.co" }],
    remotePatterns: [],
  },
};

export default nextConfig;
