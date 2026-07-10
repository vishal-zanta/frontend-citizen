import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

interface SearchDebouncedProps {
  initialValue?: string;
  handleDebouncedChange?: (value: string) => void;
  handleInstantChange?: (value: string) => void;
  delay?: number;
  className?: string;
  inputClassName?: string;
  inputProps?: React.ComponentProps<typeof Input>;
  placeholder?: string;
  icon?: boolean;
}

const SearchDebounced: React.FC<SearchDebouncedProps> = ({
  initialValue = "",
  handleDebouncedChange,
  handleInstantChange,
  delay = 500,
  className = "",
  inputClassName = "",
  inputProps = {},
  placeholder = "Search by name or email...",
  icon = true,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const timerRef = useRef<number| null>(null);

  // Sync state if initialValue changes externally
  useEffect(() => {
    setSearchQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (handleInstantChange) {
      handleInstantChange(searchQuery);
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      if (handleDebouncedChange) {
        handleDebouncedChange(searchQuery);
      }
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [searchQuery]);

  return (
    <div className={clsx("relative", className)}>
      {icon && (
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      )}
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className={clsx(icon && "pl-9", inputClassName)}
        {...inputProps}
      />
    </div>
  );
};

export default SearchDebounced;
