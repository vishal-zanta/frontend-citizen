import React from "react";
import { Filter as FilterIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export interface FilterOptionItem {
  label: string;
  value: string | number;
}

export interface FilterOption {
  filterKey: string;
  label: string;
  labelHindi?: string;
  isMultiple?: boolean;
  options: FilterOptionItem[];
}

export interface FilterProps {
  filters?: Record<string, any>;
  setFilters?: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  filterOptions?: FilterOption[];
}

export default function Filter({
  filters = {},
  setFilters,
  filterOptions = [],
}: FilterProps) {
  const { t } = useLanguage();

  const hasActiveFilters = Object.values(filters).some(
    (val) => val !== undefined && val !== ""
  );

  const handleSelectFilter = (
    key: string,
    value: any,
    isMultiple: boolean = false
  ) => {
    if (setFilters) {
      setFilters((prev) => {
        const next = { ...prev };
        let finalValue = value;

        if (isMultiple && value !== undefined && value !== "") {
          const currentVals = next[key]
            ? String(next[key]).split(",").filter(Boolean)
            : [];
          const strVal = String(value);
          let updatedVals: string[];
          if (currentVals.includes(strVal)) {
            updatedVals = currentVals.filter((v) => v !== strVal);
          } else {
            updatedVals = [...currentVals, strVal];
          }
          finalValue = updatedVals.length > 0 ? updatedVals.join(",") : undefined;
        }

        if (finalValue === undefined || finalValue === "") {
          delete next[key];
        } else {
          next[key] = finalValue;
        }

        return next;
      });
    }
  };

  const handleClearAll = () => {
    if (setFilters) {
      setFilters({});
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`px-3 py-3 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer relative border ${
            hasActiveFilters
              ? "bg-primary/10 text-primary border-primary/30 font-semibold"
              : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <FilterIcon className="w-3.5 h-3.5" />
          <span>{t("Filter", "फ़िल्टर")}</span>
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 bg-card border border-border"
      >
        {filterOptions.map((opt) => (
          <DropdownMenuSub key={opt.filterKey}>
            <DropdownMenuSubTrigger className="cursor-pointer flex items-center justify-between text-xs py-2">
              <span className="flex items-center gap-1.5">
                {t(opt.label, opt.labelHindi || opt.label)}
                {filters[opt.filterKey] && (
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-56 max-h-64 overflow-y-auto bg-card border border-border">
              <DropdownMenuItem
                onClick={() =>
                  handleSelectFilter(opt.filterKey, undefined, opt.isMultiple)
                }
                className={`cursor-pointer text-xs py-1.5 ${
                  !filters[opt.filterKey]
                    ? "font-semibold bg-accent text-accent-foreground"
                    : ""
                }`}
              >
                {t("All", "सभी")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {opt.options.map((subOpt) => {
                const currentValues =
                  opt.isMultiple && filters[opt.filterKey]
                    ? String(filters[opt.filterKey]).split(",").filter(Boolean)
                    : [];
                const isSelected = opt.isMultiple
                  ? currentValues.includes(String(subOpt.value))
                  : filters[opt.filterKey] === subOpt.value;

                return (
                  <DropdownMenuItem
                    key={subOpt.value}
                    onClick={() =>
                      handleSelectFilter(
                        opt.filterKey,
                        subOpt.value,
                        opt.isMultiple
                      )
                    }
                    className={`cursor-pointer text-xs py-1.5 ${
                      isSelected
                        ? "font-semibold bg-accent text-accent-foreground"
                        : ""
                    }`}
                  >
                    <span className="truncate">{subOpt.label}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}

        {hasActiveFilters && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleClearAll}
              className="text-destructive focus:text-destructive cursor-pointer text-xs py-1.5 font-medium"
            >
              {t("Clear All", "सभी साफ़ करें")}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
