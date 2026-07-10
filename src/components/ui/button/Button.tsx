import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "destructive" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner in place of the label and disables the button.
   * Width is preserved so the layout doesn't shift. */
  isLoading?: boolean;
}

const baseClasses =
  "relative inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary-500 text-neutral-0 hover:bg-primary-600",
  secondary:
    "bg-neutral-0 text-neutral-700 border border-neutral-300 hover:bg-neutral-50",
  destructive: "bg-danger-500 text-neutral-0 hover:bg-danger-500/90",
  ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  // Larger tap target — used for primary driver actions (e.g. "Upload POD")
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", isLoading = false, disabled, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <span
            className="absolute h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        ) : null}
        <span className={cn(isLoading && "invisible")}>{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
