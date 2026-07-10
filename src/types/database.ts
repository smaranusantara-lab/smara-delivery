/**
 * Hand-written to mirror docs/DATABASE_SCHEMA.md exactly.
 *
 * Once the Supabase project exists, this can be regenerated with:
 *   npx supabase gen types typescript --project-id <ref> > src/types/database.ts
 * Until then, keep this file in sync with DATABASE_SCHEMA.md by hand.
 */

export type DeliveryStatus =
  | "Pending"
  | "Assigned"
  | "In Progress"
  | "Delivered"
  | "Failed";

export interface Database {
  public: {
    Tables: {
      deliveries: {
        Row: {
          id: string;
          created_at: string;
          order_number: string;
          customer_name: string;
          customer_phone: string | null;
          address: string;
          latitude: number | null;
          longitude: number | null;
          delivery_date: string; // date, e.g. "2026-07-10"
          driver_id: string | null;
          sequence_number: number | null;
          status: DeliveryStatus;
          notes: string | null;
          pod_image_url: string | null;
          delivered_at: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          order_number: string;
          customer_name: string;
          customer_phone?: string | null;
          address: string;
          latitude?: number | null;
          longitude?: number | null;
          delivery_date: string;
          driver_id?: string | null;
          sequence_number?: number | null;
          status?: DeliveryStatus;
          notes?: string | null;
          pod_image_url?: string | null;
          delivered_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["deliveries"]["Insert"]>;
      };
      drivers: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          phone: string | null;
          pin: string; // bcrypt hash — never the raw PIN
          is_active: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          phone?: string | null;
          pin: string;
          is_active?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["drivers"]["Insert"]>;
      };
      delivery_status_logs: {
        Row: {
          id: string;
          created_at: string;
          delivery_id: string;
          status: DeliveryStatus;
          notes: string | null;
          updated_by: string | null; // plain text for MVP (driver name or "owner")
        };
        Insert: {
          id?: string;
          created_at?: string;
          delivery_id: string;
          status: DeliveryStatus;
          notes?: string | null;
          updated_by?: string | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["delivery_status_logs"]["Insert"]
        >;
      };
    };
  };
}
