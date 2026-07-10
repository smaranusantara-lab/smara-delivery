# DESIGN SYSTEM SPECIFICATION

SMARA Delivery MVP — Milestone 0 deliverable, for review before any component is built.

This is a **neutral, functional interface**, not placeholder branding. SMARA's official design system (colors, typography, spacing, components) will be defined separately and applied afterward. Components are built to consume tokens (Section 2) rather than hardcoded values, so that swap-in happens without restructuring any component or feature logic — only the token values change.

---

## 1. UI Principles (from PROJECT_BRIEF / DEVELOPER_SPEC)

- **Mobile first**: every component is designed for a driver's phone screen first, then scaled up for the Owner's desktop dashboard.
- **Minimal clicks**: driver-facing flows (status update, POD upload) should be reachable in as few taps as possible.
- **Clean, low-noise UI**: this is an operational tool used daily, not a marketing surface — favor clarity and speed over decoration.
- **Consistent spacing & alignment** across Owner and Driver views, even though their layouts differ.
- **Accessible**: sufficient color contrast (especially for status colors, which carry meaning), tap targets sized for one-handed phone use.

---

## 2. Design Tokens

### 2.1 Color System

**Neutrals** (backgrounds, text, borders):
| Token | Usage |
|---|---|
| `neutral-0` (white) | Base surface / cards |
| `neutral-50` | App background |
| `neutral-100–300` | Borders, dividers, disabled states |
| `neutral-500` | Secondary text |
| `neutral-700` | Primary text |
| `neutral-900` | Headings / high-emphasis text |

**Primary** (functional action color — neutral, not a brand color; will be replaced when SMARA's brand palette is defined):
| Token | Usage |
|---|---|
| `primary-500` | Primary buttons, links, active states |
| `primary-600` | Hover/pressed |
| `primary-100` | Subtle backgrounds (selected row, highlighted card) |

**Semantic:**
| Token | Usage |
|---|---|
| `success-500` | Positive confirmations |
| `warning-500` | Caution states |
| `danger-500` | Destructive actions, errors |

### 2.2 Status Colors (1:1 with `deliveries.status`)

| Status | Color token | Rationale |
|---|---|---|
| Pending | `neutral-400` (grey) | Not yet actioned |
| Assigned | `primary-500` (blue) | In the queue, owned by a driver |
| In Progress | `warning-500` (amber) | Active, needs attention |
| Delivered | `success-500` (green) | Completed, positive |
| Failed | `danger-500` (red) | Needs review |

These five map directly to the Badge component (Section 3.4) and are used consistently across Owner dashboard, delivery list, and driver views — no alternate color meanings anywhere else in the UI, to keep status recognizable at a glance.

### 2.3 Typography

- **Font**: a neutral system-UI font stack (no licensed/branded typeface chosen yet) — e.g., `-apple-system, Segoe UI, Roboto, sans-serif` — for fast load and clean legibility on small screens, to be replaced by SMARA's chosen typeface when defined.
- **Scale** (mobile-first, rem-based):
| Token | Size | Usage |
|---|---|---|
| `text-xs` | 12px | Meta info, timestamps |
| `text-sm` | 14px | Secondary text, labels |
| `text-base` | 16px | Body text, form inputs (16px avoids iOS auto-zoom on focus) |
| `text-lg` | 18px | Section headers |
| `text-xl` | 20px | Card/page titles |
| `text-2xl` | 24px | Dashboard headline numbers |
- **Weights**: regular (400) for body, medium (500) for labels/emphasis, semibold (600) for headings — avoid bold (700)+ except sparingly for KPI headline numbers.

### 2.4 Spacing Scale

4px base unit, standard multiples: `4, 8, 12, 16, 24, 32, 48, 64` (`space-1` through `space-16`). Consistent use avoids arbitrary one-off margins across Owner and Driver views.

### 2.5 Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 6px | Badges, small inputs |
| `radius-md` | 10px | Buttons, inputs |
| `radius-lg` | 16px | Cards |

### 2.6 Shadows

Kept minimal — this is a data-dense operational tool, not a marketing site.
| Token | Usage |
|---|---|
| `shadow-sm` | Cards resting on the page background |
| `shadow-md` | Modals, dropdowns, elevated overlays |

---

## 3. Component Inventory

### 3.1 Button
Variants: `primary`, `secondary`, `destructive`, `ghost`.
Sizes: `sm`, `md` (default), `lg` (used for primary driver actions like "Upload POD" — bigger tap target).
States: default, hover, pressed, disabled, loading (spinner replaces label, button stays same width to avoid layout shift).

### 3.2 Input
Variants: text, number, textarea, select — all share one visual language.
States: default, focused (`primary-500` ring), error (`danger-500` border + inline message below), disabled.
16px base font size on all inputs (mobile-zoom prevention, per 2.3).

### 3.3 Card
Base container for list items, dashboard summary tiles, and delivery detail sections. `radius-lg`, `shadow-sm`, `neutral-0` background, `space-4`–`space-6` internal padding depending on content density.

### 3.4 Badge (Status)
Pill-shaped, `radius-sm`, colored background at low opacity with full-opacity text/dot in the matching status color (Section 2.2). Used anywhere a delivery's status is shown — list rows, detail headers, dashboard breakdowns.

### 3.5 Layout Grid
- **Mobile** (driver's primary context): single column, full-width cards, sticky bottom action bar for primary actions (e.g., "Upload POD") where relevant.
- **Tablet/Desktop** (Owner's primary context): 12-column grid; dashboard summary tiles in a responsive row (wraps to 2-column, then 1-column, as width shrinks); delivery list becomes a table above a defined breakpoint, staying card-based below it.

---

## 4. Responsive Strategy

**Breakpoints** (Tailwind defaults, adopted as-is unless you'd prefer custom values):
| Breakpoint | Width | Primary user |
|---|---|---|
| Base (no prefix) | <640px | Driver (phone) |
| `sm` | ≥640px | Driver (large phone/small tablet) |
| `md` | ≥768px | Owner (tablet) |
| `lg`+ | ≥1024px | Owner (desktop) |

**Rule**: every component is authored mobile-first (base styles = phone), with `md:`/`lg:` overrides layered on for the Owner's larger-screen views. Driver-facing routes are not expected to need `lg:` overrides at all, since drivers are phone-only by design.

---

## 5. Notes

- Colors and typography here are intentionally neutral and functional — not a brand proposal. SMARA's official design system will be defined separately (colors, typography, spacing, components) and swapped in via the token layer once ready, without touching component structure.
- Status colors (Section 2.2) are the one place semantic meaning is load-bearing (grey/blue/amber/green/red mapped to the five delivery statuses) — these should carry over conceptually even after the official brand palette is applied, so status remains recognizable at a glance.

Everything in this document is ready to implement as Tailwind config + base components once approved.
