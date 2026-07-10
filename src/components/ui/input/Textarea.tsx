import { TextareaHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/utils/cn";
import { fieldBaseClasses, fieldBorderClasses } from "./Input";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const errorId = error ? `${textareaId}-error` : undefined;

    return (
      <div className="w-full">
        {label ? (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            fieldBaseClasses,
            fieldBorderClasses(!!error),
            "py-2 resize-y",
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

Textarea.displayName = "Textarea";
