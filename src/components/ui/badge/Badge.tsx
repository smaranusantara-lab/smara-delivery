import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import type { DeliveryStatus } from "@/types";

export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-neutral-100 text-neutral-700",
  primary: "bg-primary-100 text-primary-600",
  success: "bg-success-500/10 text-success-500",
  warning: "bg-warning-500/10 text-warning-500",
  danger: "bg-danger-500/10 text-danger-500",
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}

/**
 * Maps each of the five delivery statuses (docs/DATABASE_SCHEMA.md) to
 * its badge tone, per the Design System Specification (Section 2.2).
 * This mapping is used everywhere a delivery's status is shown, so
 * status stays recognizable at a glance across Owner and Driver views.
 */
const STATUS_TONE: Record<DeliveryStatus, BadgeTone> = {
  Pending: "neutral",
  Assigned: "primary",
  "In Progress": "warning",
  Delivered: "success",
  Failed: "danger",
};

export interface StatusBadgeProps extends Omit<BadgeProps, "tone"> {
  status: DeliveryStatus;
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  return (
    <Badge tone={STATUS_TONE[status]} className={className} {...props}>
      <span
        className="h-1.5 w-1.5 rounded-full bg-current"
        aria-hidden="true"
      />
      {status}
    </Badge>
  );
}
