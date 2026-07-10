import { SelectHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/utils/cn";
import { fieldBaseClasses, fieldBorderClasses } from "./Input";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  /** Placeholder shown as a disabled first option, e.g. "Select a driver". */
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options, placeholder, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const errorId = error ? `${selectId}-error` : undefined;

    return (
      <div className="w-full">
        {label ? (
          <label
            htmlFor={selectId}
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        ) : null}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            fieldBaseClasses,
            fieldBorderClasses(!!error),
            "h-10",
            className,
          )}
          aria-invalid={!!error || undefined}
          aria-describedby={errorId}
          defaultValue={props.defaultValue ?? (placeholder ? "" : undefined)}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error ? (
          <p id={errorId} className="mt-1.5 text-sm text-danger-500">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";
