import React from "react";
import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SelectOption {
  label: string;
  value: string;
}

interface MySelectProps {
  value: any;
  onValueChange: (val: any) => void;
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
  className?: string;
  labelClassName?: string;
  required?: boolean;
  disabled?: boolean;
  isMultiple?: boolean;
  isCreatable?: boolean;
  error?: string;
  colors?: {
    placeholder?: string;
  };
}

const buildStyles = (hasError: boolean, disabled: boolean, colors: any, isMulti: boolean) => ({
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
    maxHeight: "200px",
    overflowY: isMulti ? "auto" : "hidden",
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
      ? "hsl(var(--accent))"
      : "transparent",
    color: state.isSelected
      ? "hsl(var(--primary-foreground))"
      : state.isFocused
      ? "hsl(var(--accent-foreground))"
      : "#0F1729",
    cursor: "pointer",
    fontSize: "14px",
    padding: "8px 12px",
    "&:active": {
      backgroundColor: "hsl(var(--accent))",
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
    fontSize: "14px",
    color: "#0F1729",
  }),
  input: (provided: any) => ({
    ...provided,
    fontSize: "14px",
    color: "#0F1729",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontSize: "14px",
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
});

export default function MySelect({
  value,
  onValueChange,
  label,
  placeholder,
  options = [],
  className,
  labelClassName,
  required = false,
  disabled = false,
  isMultiple = false,
  isCreatable = false,
  error,
  colors,
}: MySelectProps) {
  const isMulti = isCreatable ? true : isMultiple;
  const styles = buildStyles(!!error, disabled, colors, isMulti);

  const toOption = (val: any) =>
    options.find((o) => o.value === val) ?? { label: val, value: val };

  const selectValue = isMulti
    ? Array.isArray(value)
      ? value.map(toOption)
      : []
    : value
    ? toOption(value)
    : null;

  const handleChange = (selected: any) => {
    if (isMulti) {
      const arr = selected ?? [];
      onValueChange(arr.map((o: any) => o.value));
    } else {
      onValueChange(selected?.value ?? "");
    }
  };

  const commonProps: any = {
    options,
    placeholder: placeholder ?? label ?? "Select...",
    isDisabled: disabled,
    isMulti: isMulti,
    isClearable: true,
    isSearchable: true,
    value: selectValue,
    onChange: handleChange,
    styles,
    menuPortalTarget: typeof document !== "undefined" ? document.body : undefined,
    menuPosition: "fixed",
    menuPlacement: "auto",
    classNamePrefix: "my-select",
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
          className={cn(
            "font-normal text-sm text-foreground mb-0.5",
            labelClassName
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
          {error}
        </span>
      )}
    </div>
  );
}
