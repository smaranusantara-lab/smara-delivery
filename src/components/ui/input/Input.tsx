import { InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Error message. When set, the input shows a danger border and the
   * message is displayed below it. */
  error?: string;
}

export const fieldBaseClasses =
  "block w-full rounded-md border bg-neutral-0 px-3 text-base text-neutral-900 " +
  "placeholder:text-neutral-400 transition-colors " +
  "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 " +
  "disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed";

export const fieldBorderClasses = (hasError: boolean) =>
  hasError
    ? "border-danger-500 focus:ring-danger-500 focus:border-danger-500"
    : "border-neutral-300";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="w-full">
        {label ? (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            fieldBaseClasses,
            fieldBorderClasses(!!error),
            "h-10",
            className,
          )}
          aria-invalid={!!error || undefined}
          aria-describedby={errorId}
          {...props}
        />
        {error ? (
          <p id={errorId} className="mt-1.5 text-sm text-danger-500">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
