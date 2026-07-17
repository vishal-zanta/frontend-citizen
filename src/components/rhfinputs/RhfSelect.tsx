import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SelectOption {
  label: string;
  value: string;
}

interface RhfSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
  className?: string;
  labelClassName?: string;
  required?: boolean;
  disabled?: boolean;
  isMultiple?: boolean;
  isCreatable?: boolean;
  isLoading?: boolean;
  colors?: {
    placeholder?: string;
  };
}

const buildStyles = (hasError: boolean, disabled: boolean, colors: any) => {
  // const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const baseFontSize =  "14px";

  return {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: hasError
        ? "#ef4444"
        : state.isFocused
        ? "hsl(var(--ring))"
        : "#D7DFEA",
      boxShadow: state.isFocused
        ? hasError
          ? "0 0 0 1px #ef4444"
          : "0 0 0 1px hsl(var(--ring))"
        : "none",
      borderRadius: "var(--radius)",
      minHeight: "36px",
      height: "36px",
      backgroundColor: disabled ? "#f3f4f6" : "#FFFFFF",
      cursor: disabled ? "not-allowed" : "default",
      "&:hover": {
        borderColor: hasError
          ? "#ef4444"
          : state.isFocused
          ? "hsl(var(--ring))"
          : "#D7DFEA",
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: "0px 12px",
      height: "34px",
      display: "flex",
      alignItems: "center",
      overflowY: "auto",
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999,
      width: "100%",
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999,
      pointerEvents: "auto",
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: "200px",
      overflowY: "auto",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "hsl(var(--primary))"
        : state.isFocused
        ? "#f1f5f9"
        : "transparent",
      color: state.isSelected
        ? "hsl(var(--primary-foreground))"
        : "#0f1729",
      cursor: "pointer",
      fontSize: baseFontSize,
      padding: "8px 12px",
      "&:active": {
        backgroundColor: "hsl(var(--accent))",
      },
      "&:hover": {
        backgroundColor: state.isSelected
          ? "hsl(var(--primary))"
          : "#f1f5f9",
        color: state.isSelected
          ? "hsl(var(--primary-foreground))"
          : "#0f1729",
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "hsl(var(--secondary))",
      borderRadius: "calc(var(--radius) - 2px)",
      fontSize: "13px",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#0F1729",
      fontSize: "13px",
      padding: "2px 6px",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "hsl(var(--muted-foreground))",
      padding: "2px",
      borderRadius: "calc(var(--radius) - 2px)",
      "&:hover": {
        backgroundColor: "hsl(var(--destructive))",
        color: "hsl(var(--destructive-foreground))",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: baseFontSize,
      color: "#0F1729",
    }),
    input: (provided: any) => ({
      ...provided,
      fontSize: baseFontSize,
      color: "#0F1729",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: baseFontSize,
      color: colors?.placeholder ?? "hsl(var(--muted-foreground))",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: "34px",
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      padding: "0px 8px",
      color: state.isFocused
        ? "hsl(var(--foreground))"
        : "hsl(var(--muted-foreground))",
      "&:hover": {
        color: "hsl(var(--foreground))",
      },
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      padding: "0px 8px",
    }),
  };
};

export default function RhfSelect({
  name,
  label,
  placeholder,
  options = [],
  className,
  labelClassName,
  required = false,
  disabled = false,
  isMultiple = false,
  isCreatable = false,
  isLoading = false,
  colors,
}: RhfSelectProps) {
  const { control } = useFormContext();

  // isCreatable always implies multiple
  const isMulti = isCreatable ? true : isMultiple;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const styles = buildStyles(!!error, disabled, colors);

        const toOption = (val: any) =>
          options.find((o) => o.value === val) ?? { label: val, value: val };

        const selectValue = isMulti
          ? Array.isArray(field.value)
            ? field.value.map(toOption)
            : []
          : field.value
          ? toOption(field.value)
          : null;

        const handleChange = (selected: any) => {
          if (isMulti) {
            const arr = selected ?? [];
            field.onChange(arr.map((o: any) => o.value));
          } else {
            field.onChange(selected?.value ?? "");
          }
        };

        const commonProps: any = {
          inputId: name,
          options,
          placeholder: placeholder ?? label ?? "Select...",
          isDisabled: disabled,
          isLoading: isLoading,
          isMulti: isMulti,
          isClearable: true,
          isSearchable: true,
          value: selectValue,
          onChange: handleChange,
          onBlur: field.onBlur,
          styles,

          // Portal the menu into <body> so it escapes dialog/overflow contexts
          menuPortalTarget:
            typeof document !== "undefined" ? document.body : undefined,

          menuPosition: "fixed",
          menuPlacement: "auto",
          classNamePrefix: "rhf-select",
          theme: (theme: any) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "hsl(var(--ring))",
              primary25: "hsl(var(--accent))",
              primary50: "hsl(var(--accent))",
            },
          }),
        };

        return (
          <div
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            className={cn("flex flex-col gap-1.5", className)}
            data-invalid={!!error}
          >
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

            {isCreatable ? (
              <CreatableSelect
                {...commonProps}
                isMulti
                createOptionPosition="last"
                isValidNewOption={(inputValue) => inputValue.trim().length > 0}
                formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                value={selectValue}
                onChange={handleChange}
              />
            ) : (
              <ReactSelect {...commonProps} />
            )}

            {error && (
              <span className="text-destructive text-xs font-medium">
                {error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
}
