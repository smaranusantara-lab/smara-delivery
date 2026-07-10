import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Caps width on large screens (Owner desktop views). Driver routes
   * generally won't need this, since they're phone-only by design. */
  maxWidth?: "md" | "lg" | "xl" | "full";
}

const maxWidthClasses: Record<NonNullable<PageContainerProps["maxWidth"]>, string> = {
  md: "max-w-2xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

/**
 * Base layout container (Milestone 0 "Base layouts" deliverable).
 * Mobile-first: full-width with comfortable padding on small screens,
 * capped width and more breathing room on md+ (Owner desktop/tablet).
 */
export function PageContainer({
  className,
  maxWidth = "lg",
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 py-6 md:px-8 md:py-8",
        maxWidthClasses[maxWidth],
        className,
      )}
      {...props}
    />
  );
}
