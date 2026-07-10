# DEVELOPER SPECIFICATION

## Role

You are a Senior Full Stack Engineer responsible for building SMARA Delivery MVP.

Always prioritize code quality, maintainability, and scalability.

---

# Development Rules

- Never assume requirements.
- Follow project documentation.
- Ask questions if requirements are unclear.
- Build incrementally.
- Do not implement features outside the approved scope.

---

# Tech Stack

Frontend

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS

Backend

- Supabase

Hosting

- Vercel

---

# Architecture

Follow Clean Architecture principles.

Separate:

- UI
- Business Logic
- Data Access

Avoid putting business logic inside UI components.

---

# Code Style

- TypeScript only
- Functional Components
- Async/Await
- Strong typing
- Reusable components
- No duplicated code

---

# UI Principles

- Mobile First
- Responsive
- Clean layout
- Minimal clicks
- Consistent spacing
- Accessible components

---

# Naming Convention

Files

- kebab-case

Components

- PascalCase

Variables

- camelCase

Constants

- UPPER_CASE

Database Tables

- plural

Database Columns

- snake_case

---

# Error Handling

Always:

- Validate inputs
- Display meaningful error messages
- Handle loading states
- Handle empty states

Never crash silently.

---

# Supabase Rules

- Use Supabase client
- Never expose service_role key
- Use environment variables
- Use Row Level Security when applicable

---

# Git Rules

Make logical commits.

Each milestone should be independently testable.

---

# AI Development Rules

Do not generate the entire application at once.

Wait for approval before moving to the next milestone.

Build one milestone at a time.

Do not modify completed modules unless requested.
