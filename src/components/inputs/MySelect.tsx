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
      ? "var(--color-destructive)"
      : state.isFocused
      ? "var(--color-ring)"
      : "var(--color-border)",
    boxShadow: state.isFocused
      ? hasError
        ? "0 0 0 1px var(--color-destructive)"
        : "0 0 0 1px var(--color-ring)"
      : "none",
    borderRadius: "var(--radius)",
    minHeight: "36px",
    backgroundColor: disabled ? "var(--color-muted)" : "var(--color-card)",
    cursor: disabled ? "not-allowed" : "default",
    "&:hover": {
      borderColor: hasError
        ? "var(--color-destructive)"
        : state.isFocused
        ? "var(--color-ring)"
        : "var(--color-border)",
    },
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "4px 12px",
    minHeight: "34px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    maxHeight: "120px",
    overflowY: isMulti ? "auto" : "hidden",
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999,
    width: "100%",
    backgroundColor: "var(--color-popover)",
    border: "1px solid var(--color-border)",
    color: "var(--color-popover-foreground)",
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
    backgroundColor: "var(--color-popover)",
    color: "var(--color-popover-foreground)",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "var(--color-primary)"
      : state.isFocused
      ? "var(--color-accent)"
      : "transparent",
    color: state.isSelected
      ? "var(--color-primary-foreground)"
      : state.isFocused
      ? "var(--color-accent-foreground)"
      : "var(--color-popover-foreground)",
    cursor: "pointer",
    fontSize: "0.875rem",
    "@media (max-width: 768px)": {
      fontSize: "1rem",
    },
    padding: "8px 12px",
    "&:active": {
      backgroundColor: "var(--color-accent)",
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--color-secondary)",
    borderRadius: "calc(var(--radius) - 2px)",
    fontSize: "13px",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "var(--color-secondary-foreground)",
    fontSize: "13px",
    padding: "2px 6px",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "var(--color-muted-foreground)",
    padding: "2px",
    borderRadius: "calc(var(--radius) - 2px)",
    "&:hover": {
      backgroundColor: "var(--color-destructive)",
      color: "var(--color-destructive-foreground)",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: "0.875rem",
    color: "var(--color-foreground)",
    "@media (max-width: 768px)": {
      fontSize: "1rem",
    },
  }),
  input: (provided: any) => ({
    ...provided,
    fontSize: "0.875rem",
    color: "var(--color-foreground)",
    margin: 0,
    padding: 0,
    "@media (max-width: 768px)": {
      fontSize: "1rem",
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    position: "absolute",
    fontSize: "0.875rem",
    color: colors?.placeholder ?? "var(--color-muted-foreground)",
    "@media (max-width: 768px)": {
      fontSize: "1rem",
    },
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
      ? "var(--color-foreground)"
      : "var(--color-muted-foreground)",
    "&:hover": {
      color: "var(--color-foreground)",
    },
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    padding: "0px 8px",
    color: "var(--color-muted-foreground)",
    "&:hover": {
      color: "var(--color-foreground)",
    },
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
        primary: "var(--color-ring)",
        primary25: "var(--color-accent)",
        primary50: "var(--color-accent)",
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
