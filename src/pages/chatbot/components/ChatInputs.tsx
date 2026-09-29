import React from "react";
import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import { Send, SkipForward } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { isAlpha, isValidNumber } from "@/utils/helpers";

// ============================================================================
// 1. ChatMessageInput
// ============================================================================

export interface ChatMessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  hide?: boolean;
  required?: boolean;
  isDisableFutureDates?: boolean;
  isNumsOnly?: boolean;
  isLettersAllowed?: boolean;
  max?: string | number;
  min?: string | number;
  [key: string]: any;
}

export const ChatMessageInput: React.FC<ChatMessageInputProps> = ({
  onChange,
  onSend,
  value,
  placeholder,
  type = "text",
  disabled = false,
  hide = false,
  required = false,
  isDisableFutureDates = false,
  isNumsOnly = false,
  isLettersAllowed = false,
  max,
  min,
  ...props
}) => {
  const { t } = useLanguage();

  const handleSend = () => {
    const trimmed = typeof value === "string" ? value.trim() : String(value ?? "").trim();
    if (disabled || !trimmed) return;
    onSend(trimmed);
  };

  const handleSkip = () => {
    if (disabled) return;
    onSend("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumsOnly && !isValidNumber(e.target.value)) {
      return;
    }
    if (isLettersAllowed && !isAlpha(e.target.value)) {
      return;
    }
    onChange?.(e);
  };

  if (hide) return null;

  return (
    <div className="p-2.5 sm:p-3 border-t border-border bg-card flex items-center gap-2 shrink-0">
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={(e) => {
          if (type === "date") {
            try {
              e.target.showPicker?.();
            } catch {
              // fallback if not supported
            }
          }
        }}
        max={
          isDisableFutureDates
            ? new Date().toISOString().split("T")[0]
            : max
        }
        min={min}
        
        placeholder={placeholder || t("Type a message...", "संदेश टाइप करें...")}
        disabled={disabled}
        className="flex-1 bg-muted/40 border border-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 min-w-0"
        {...props}
      />

      {!required && (
        <button
          type="button"
          onClick={handleSkip}
          disabled={disabled}
          className="p-2 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-border rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
          title={t("Skip", "छोड़ें")}
        >
          <SkipForward className="w-4 h-4" />
        </button>
      )}

      <button
        type="button"
        onClick={handleSend}
        disabled={disabled || !String(value ?? "").trim()}
        className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
        title={t("Send", "भेजें")}
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
};

// ============================================================================
// 2. ChatSelectInput
// ============================================================================

export interface ChatSelectOption {
  label: string;
  value: string;
  [key: string]: any;
}

export interface ChatSelectInputProps {
  value: any;
  onChange: (value: any, option?: any) => void;
  onSend: (value: any) => void;
  options?: ChatSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  hide?: boolean;
  required?: boolean;
  isMultiple?: boolean;
  isCreatable?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  colors?: {
    placeholder?: string;
  };
  hasError?: boolean;
  className?: string;
  [key: string]: any;
}

const buildSelectStyles = (hasError: boolean, disabled: boolean, colors: any, isMulti?: boolean) => ({
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
    borderRadius: "0.75rem",
    minHeight: "36px",
    backgroundColor: disabled ? "var(--color-muted)" : "var(--color-card)",
    cursor: disabled ? "not-allowed" : "default",
    fontSize: "0.75rem",
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
    padding: "2px 10px",
    minHeight: "34px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    maxHeight: "120px",
    overflowY: isMulti ? "auto" : "hidden",
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 99999,
    width: "100%",
    backgroundColor: "var(--color-popover)",
    border: "1px solid var(--color-border)",
    color: "var(--color-popover-foreground)",
    borderRadius: "0.75rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 99999,
    pointerEvents: "auto",
  }),
  menuList: (provided: any) => ({
    ...provided,
    maxHeight: "200px",
    overflowY: "auto",
    backgroundColor: "var(--color-popover)",
    color: "var(--color-popover-foreground)",
    borderRadius: "0.75rem",
    padding: "4px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "0.5rem",
    margin: "1px 0",
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
    fontSize: "0.75rem",
    padding: "6px 10px",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--color-secondary)",
    borderRadius: "0.5rem",
    fontSize: "11px",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "var(--color-secondary-foreground)",
    fontSize: "11px",
    padding: "1px 5px",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "var(--color-muted-foreground)",
    padding: "1px 3px",
    borderRadius: "0.5rem",
    "&:hover": {
      backgroundColor: "var(--color-destructive)",
      color: "var(--color-destructive-foreground)",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: "0.75rem",
    color: "var(--color-foreground)",
  }),
  input: (provided: any) => ({
    ...provided,
    fontSize: "0.75rem",
    color: "var(--color-foreground)",
    margin: 0,
    padding: 0,
  }),
  placeholder: (provided: any) => ({
    ...provided,
    position: "absolute",
    fontSize: "0.75rem",
    color: colors?.placeholder ?? "var(--color-muted-foreground)",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: "34px",
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    padding: "0px 6px",
    color: state.isFocused
      ? "var(--color-foreground)"
      : "var(--color-muted-foreground)",
    "&:hover": {
      color: "var(--color-foreground)",
    },
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    padding: "0px 6px",
    color: "var(--color-muted-foreground)",
    "&:hover": {
      color: "var(--color-foreground)",
    },
  }),
});

export const ChatSelectInput: React.FC<ChatSelectInputProps> = ({
  onChange,
  onSend,
  value,
  options = [],
  placeholder,
  disabled = false,
  hide = false,
  required = false,
  isMultiple = false,
  isCreatable = false,
  isLoading = false,
  isClearable = true,
  isSearchable = true,
  colors,
  hasError = false,
  className,
  ...props
}) => {
  const { t } = useLanguage();
  const isMulti = !!isMultiple;
  const SelectComponent = isCreatable ? CreatableSelect : ReactSelect;

  const toOption = (val: any) => {
    if (val === null || val === undefined) return null;
    if (typeof val === "object" && "value" in val) return val;
    return options.find((o) => o.value === val) ?? { label: String(val), value: String(val) };
  };

  const selectValue = isMulti
    ? Array.isArray(value)
      ? value.map(toOption).filter(Boolean)
      : value
      ? [toOption(value)].filter(Boolean)
      : []
    : value
    ? toOption(value)
    : null;

  const handleChange = (selected: any, actionMeta: any) => {
    if (isMulti) {
      const arr = selected ?? [];
      const valArray = arr.map((o: any) => o.value);
      onChange?.(valArray, arr);
    } else {
      onChange?.(selected?.value ?? "", selected);
    }
  };

  const isValueEmpty =
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0);

  const handleSend = () => {
    if (disabled) return;
    if (required && isValueEmpty) return;
    onSend?.(value);
  };

  const handleSkip = () => {
    if (disabled) return;
    onSend?.(isMulti ? [] : "");
  };

  if (hide) return null;

  const styles = buildSelectStyles(hasError, disabled, colors, isMulti);

  return (
    <div className={`p-2.5 sm:p-3 border-t border-border bg-card flex items-center gap-2 shrink-0 ${className || ""}`}>
      <div className="flex-1 min-w-0">
        <SelectComponent
          options={options}
          placeholder={placeholder || t("Select an option...", "विकल्प चुनें...")}
          isDisabled={disabled}
          isLoading={isLoading}
          isMulti={isMulti}
          isClearable={isClearable}
          isSearchable={isSearchable}
          value={selectValue}
          onChange={handleChange}
          styles={styles}
          menuShouldBlockScroll={true}
          menuPortalTarget={typeof document !== "undefined" ? document.body : undefined}
          menuPosition="fixed"
          menuPlacement="auto"
          classNamePrefix="chat-select"
          {...props}
        />
      </div>

      {!required && (
        <button
          type="button"
          onClick={handleSkip}
          disabled={disabled}
          className="p-2 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-border rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
          title={t("Skip", "छोड़ें")}
        >
          <SkipForward className="w-4 h-4" />
        </button>
      )}

      <button
        type="button"
        onClick={handleSend}
        disabled={disabled || (required && isValueEmpty)}
        className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
        title={t("Send", "भेजें")}
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ChatMessageInput;
