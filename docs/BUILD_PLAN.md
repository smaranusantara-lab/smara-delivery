# BUILD PLAN

## Project Goal

Develop the SMARA Delivery MVP incrementally, ensuring that every milestone is functional, testable, and approved before moving to the next stage.

---

# Milestone 1 — Project Foundation

Objective:

Set up the development environment.

Deliverables:

- Initialize Next.js project
- Configure TypeScript
- Configure Tailwind CSS
- Configure Supabase Client
- Configure environment variables
- Create project folder structure
- Create reusable layout
- Create reusable UI components

Status:

Complete (see IMPLEMENTATION_PLAN.md — built together with Milestone 0)

---

# Milestone 2 — Authentication

Objective:

Allow internal users to access the application.

Deliverables:

- User selection screen
- Driver PIN login
- Owner login (Supabase Auth)
- Session management
- Logout

Status:

Pending

---

# Milestone 3 — Owner Dashboard

Objective:

Provide operational visibility.

Deliverables:

- Dashboard summary
- Today's deliveries
- Driver statistics
- Delivery status summary
- Quick actions

Status:

Pending

---

# Milestone 4 — Delivery Management

Objective:

Manage daily delivery operations.

Deliverables:

- Delivery list
- Search & filter
- Delivery detail
- Assign driver
- Sequence number
- Status management

Status:

Pending

---

# Milestone 5 — Driver Application

Objective:

Support driver execution.

Deliverables:

- Driver dashboard
- Assigned deliveries
- Delivery detail
- Open Google Maps
- Update status
- Upload Proof of Delivery (POD)

Status:

Pending

---

# Milestone 6 — Monitoring & KPI

Objective:

Provide operational reporting.

Deliverables:

- Delivery progress
- Success rate
- Failed deliveries
- Delivery completion time
- Daily KPI dashboard

Status:

Pending

---

# Development Workflow

For every milestone:

1. Understand requirements.
2. Build only the approved scope.
3. Test the implementation.
4. Wait for approval.
5. Continue to the next milestone.

Never build multiple milestones simultaneously.

---

# Definition of Done

A milestone is considered complete only when:

- Requirements are implemented.
- Code compiles successfully.
- No TypeScript errors.
- No linting errors.
- Responsive layout works.
- Supabase integration functions correctly.
- Ready for review.

---

# Amendment Log

- Added **Milestone 0 — Design System** ahead of Milestone 1 (see IMPLEMENTATION_PLAN.md).
- Milestone 2's Owner login changed from a temporary env-var scheme to Supabase Auth (email + password) from the start.
