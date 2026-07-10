# PRODUCT REQUIREMENTS

## Product Name

SMARA Delivery MVP

---

# Purpose

SMARA Delivery MVP is an internal web application designed to manage daily delivery operations for SMARA Catering.

The system focuses on operational efficiency, delivery tracking, and performance monitoring.

---

# User Roles

## Owner

Permissions:

- View all deliveries
- Assign driver
- Edit delivery
- View dashboard
- View KPI
- Monitor delivery progress

---

## Driver

Permissions:

- Login using PIN
- View assigned deliveries
- Open Google Maps
- Update delivery status
- Upload Proof of Delivery (POD)

---

# Workflow

Delivery List

↓

Generate Route (Google Maps + Gemini assist — not route optimization)

↓

Delivery Sequence

↓

Driver Assignment

↓

Driver Task List

↓

Delivery Execution

↓

Proof of Delivery

↓

Delivery Monitoring

↓

Delivery Completed

↓

KPI Dashboard

---

# Core Features

## Login

Owner

- Supabase Auth (email + password)

Driver

- Driver selection
- PIN authentication (bcrypt hash, application-layer session)

---

## Delivery Management

Owner can:

- Create delivery (manual entry for MVP)
- Edit delivery
- Delete delivery
- Assign driver
- Set delivery sequence

---

## Driver Dashboard

Display:

- Today's deliveries
- Completed deliveries
- Remaining deliveries

---

## Delivery Detail

Display:

- Customer Name
- Phone
- Address
- Notes
- Status
- Google Maps Button

---

## Delivery Status

Available status:

- Pending
- Assigned
- In Progress
- Delivered
- Failed

---

## Proof of Delivery

Driver can:

- Upload photo (single photo, required)
- View uploaded photo
- Uploading automatically sets status to Delivered

---

## Dashboard

Owner dashboard displays:

- Total deliveries
- Assigned deliveries
- In progress
- Delivered
- Failed

---

## KPI

Display:

- Delivery Success Rate
- Failed Deliveries
- Average Delivery Time (calculated from delivery_status_logs)
- Daily Performance

---

# Business Rules

- One delivery belongs to one driver.
- One driver can have many deliveries.
- Every completed delivery should have one Proof of Delivery.
- Status changes should be recorded in delivery_status_logs.
- Driver cannot edit deliveries assigned to another driver.
- Only Owner can assign drivers.
- Only Owner can edit delivery information.
- All dates/times are handled in Asia/Jakarta.

---

# Future Modules (Out of Scope)

- Inventory
- Kitchen Production
- Purchasing
- Customer Portal
- Notifications
- Route Optimization
- Finance
