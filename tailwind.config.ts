import type { Config } from "tailwindcss";

/**
 * Design tokens implemented here come directly from
 * docs/DESIGN_SYSTEM_SPECIFICATION.md (Milestone 0).
 *
 * These are intentionally neutral / functional values, not a brand
 * proposal. When SMARA's official design system is defined, only the
 * values in this file need to change — components consume these tokens
 * by name, not hardcoded colors, so no component code should need to
 * change when the real brand palette is applied.
 *
 * Spacing scale is NOT customized: Tailwind's default spacing scale
 * (4px base unit — 1=4px, 2=8px, 3=12px, 4=16px, 6=24px, 8=32px,
 * 12=48px, 16=64px) already matches the spec's space-1..space-16
 * scale exactly, so the default is used as-is.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral scale — backgrounds, text, borders (Section 2.1)
        neutral: {
          0: "#FFFFFF",
          50: "#F7F7F8",
          100: "#EEEEF1",
          200: "#E2E2E7",
          300: "#CBCBD3",
          400: "#9C9CA8", // also used as the "Pending" status color
          500: "#71717A",
          700: "#3F3F46",
          900: "#18181B",
        },
        // Functional action color — neutral, not a brand color (Section 2.1)
        primary: {
          100: "#E4E9FD",
          500: "#3E63DD",
          600: "#3151C4",
        },
        // Semantic colors (Section 2.1)
        success: {
          500: "#16A34A",
        },
        warning: {
          500: "#D97706",
        },
        danger: {
          500: "#DC2626",
        },
        // Delivery status colors — 1:1 with the `deliveries.status` column (Section 2.2)
        status: {
          pending: "#9C9CA8", // neutral-400
          assigned: "#3E63DD", // primary-500
          inprogress: "#D97706", // warning-500
          delivered: "#16A34A", // success-500
          failed: "#DC2626", // danger-500
        },
      },
      fontFamily: {
        // Neutral system-UI stack — no licensed/branded typeface chosen yet (Section 2.3)
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        // Mobile-first type scale (Section 2.3)
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px — avoids iOS input auto-zoom
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
      },
      borderRadius: {
        sm: "6px", // badges, small inputs
        md: "10px", // buttons, inputs
        lg: "16px", // cards
      },
      boxShadow: {
        // Kept minimal — this is a data-dense operational tool (Section 2.6)
        sm: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
        md: "0 4px 12px -2px rgba(16, 24, 40, 0.12), 0 2px 4px -2px rgba(16, 24, 40, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
