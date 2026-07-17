import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";

interface RhfMobileInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Phone number input wired to react-hook-form.
 * Wraps the shadcn PhoneInput with default country set to India (IN).
 * Stores the full E.164 number string (e.g. "+919876543210") in the form.
 */
export default function RhfMobileInput({
  name,
  label,
  placeholder = "Enter mobile number",
  className,
  labelClassName,
  required = false,
  disabled = false,
}: RhfMobileInputProps) {
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

          <PhoneInput
            defaultCountry="IN"
            placeholder={placeholder}
            disabled={disabled}
            value={field.value ?? ""}
            onChange={(val) => {
              if(disabled) return;
              field.onChange(val ?? "")}}
            onBlur={field.onBlur}
            className={cn(
              "h-9",
              error &&
                "[&_input]:border-destructive [&_button]:border-destructive",
            )}
            countrySelectProps={{ disabled: true }}
            maxLength={15}
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
