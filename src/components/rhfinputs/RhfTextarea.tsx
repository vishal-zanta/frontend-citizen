import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface RhfTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  textareaClassName?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

/**
 * Textarea field wired to react-hook-form context.
 */
export default function RhfTextarea({
  name,
  label,
  placeholder,
  className,
  labelClassName,
  textareaClassName,
  required = false,
  disabled = false,
  rows = 3,
  ...props
}: RhfTextareaProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("flex flex-col gap-1.5", className)}>
          {label && (
            <Label
              htmlFor={name}
              className={cn(
                "font-normal text-sm text-foreground mb-0.5",
                labelClassName,
              )}
            >
              {label}
              {required && <span className="text-destructive"> *</span>}
            </Label>
          )}

          <Textarea
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={cn(
              error && "border-destructive focus-visible:ring-destructive",
              textareaClassName,
            )}
            {...field}
            {...props}
          />

          {error && (
            <span className="text-destructive text-xs font-medium">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}
