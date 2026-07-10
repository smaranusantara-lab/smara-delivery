import type { Database, DeliveryStatus } from "./database";

export type { Database, DeliveryStatus };

export type Delivery = Database["public"]["Tables"]["deliveries"]["Row"];
export type DeliveryInsert = Database["public"]["Tables"]["deliveries"]["Insert"];
export type DeliveryUpdate = Database["public"]["Tables"]["deliveries"]["Update"];

export type Driver = Database["public"]["Tables"]["drivers"]["Row"];
export type DriverInsert = Database["public"]["Tables"]["drivers"]["Insert"];
export type DriverUpdate = Database["public"]["Tables"]["drivers"]["Update"];

export type DeliveryStatusLog =
  Database["public"]["Tables"]["delivery_status_logs"]["Row"];
export type DeliveryStatusLogInsert =
  Database["public"]["Tables"]["delivery_status_logs"]["Insert"];

/** All five allowed delivery statuses, in workflow order — useful for
 * rendering filter dropdowns / legends without repeating the literal list. */
export const DELIVERY_STATUSES: DeliveryStatus[] = [
  "Pending",
  "Assigned",
  "In Progress",
  "Delivered",
  "Failed",
];
