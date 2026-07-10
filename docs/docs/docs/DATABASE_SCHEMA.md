# DATABASE SCHEMA

This document describes the database structure used by SMARA Delivery MVP.

Database: PostgreSQL (Supabase)

---

# Table: deliveries

| Column | Type | Nullable | Description |
|---------|------|----------|-------------|
| id | uuid | No | Primary Key |
| created_at | timestamptz | No | Record creation timestamp |
| order_number | text | No | Delivery order number |
| customer_name | text | No | Customer name |
| customer_phone | text | Yes | Customer phone number |
| address | text | No | Delivery address |
| latitude | double precision | Yes | Latitude coordinate |
| longitude | double precision | Yes | Longitude coordinate |
| delivery_date | date | No | Scheduled delivery date |
| driver_id | uuid | Yes | Assigned driver |
| sequence_number | integer | Yes | Delivery sequence |
| status | text | No | Current delivery status |
| notes | text | Yes | Delivery notes |
| pod_image_url | text | Yes | Proof of Delivery image URL |
| delivered_at | timestamptz | Yes | Delivery completion timestamp |

---

# Table: drivers

| Column | Type | Nullable | Description |
|---------|------|----------|-------------|
| id | uuid | No | Primary Key |
| created_at | timestamptz | No | Record creation timestamp |
| name | text | No | Driver name |
| phone | text | Yes | Driver phone number |
| pin | text | No | Login PIN |
| is_active | boolean | No | Driver status |

---

# Table: delivery_status_logs

| Column | Type | Nullable | Description |
|---------|------|----------|-------------|
| id | uuid | No | Primary Key |
| created_at | timestamptz | No | Record creation timestamp |
| delivery_id | uuid | No | Delivery reference |
| status | text | No | Delivery status |
| notes | text | Yes | Status notes |
| updated_by | text | Yes | User updating status |

---

# Relationships

drivers.id

↓

deliveries.driver_id

Relationship:

One Driver → Many Deliveries

---

deliveries.id

↓

delivery_status_logs.delivery_id

Relationship:

One Delivery → Many Status Logs

---

# Delivery Status

Allowed values:

- Pending
- Assigned
- In Progress
- Delivered
- Failed

---

# Authentication

Driver login uses:

- Driver Name
- PIN

Owner authentication will be implemented separately.

---

# Storage

Bucket

pod-images

Stores Proof of Delivery (POD) images.

Database stores only the image URL.
