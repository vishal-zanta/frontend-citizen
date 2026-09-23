import React from "react";
import SearchDebounced from "@/components/debounced/SearchDebounced";

interface SearchComplaintProps {
  searchId: string;
  setSearchId: (id: string) => void;
  quickTrackIds?: any[];
  t: any;
  onQuickTrack?: (complaint: any) => void;
  filterNode?: React.ReactNode;
}

export default function SearchComplaint({
  searchId,
  setSearchId,
  t,
  filterNode,
}: SearchComplaintProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-3 sm:p-4 mb-6 no-print">
      <div className="flex items-center gap-2 sm:gap-3">
        <SearchDebounced
          initialValue={searchId}
          handleDebouncedChange={setSearchId}
          placeholder={t(
            "Enter Complaint number ",
            "शिकायत संख्या दर्ज करें ",
          )}
          className="flex-1"
          inputClassName="h-10 text-xs sm:text-sm"
        />
        {filterNode}
      </div>
    </div>
  );
}
