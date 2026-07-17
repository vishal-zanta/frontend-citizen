import React from "react";
import SearchDebounced from "@/components/debounced/SearchDebounced";
import { Button } from "@/components/ui/button";

interface SearchComplaintProps {
  searchId: string;
  setSearchId: (id: string) => void;
  quickTrackIds: any[];
  t: any;
  onQuickTrack: (complaint: any) => void;
}

export default function SearchComplaint({
  searchId,
  setSearchId,
  quickTrackIds,
  t,
  onQuickTrack,
}: SearchComplaintProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      onQuickTrack({ _id: searchId.trim() });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border p-4 sm:p-5 mb-6 no-print">
      <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
        <SearchDebounced
          initialValue={searchId}
          handleDebouncedChange={setSearchId}
          placeholder={t(
            "Enter Complaint ID (e.g., BH-2026-047821)",
            "शिकायत आईडी दर्ज करें (जैसे, BH-2026-047821)",
          )}
          className="flex-1"
          inputClassName="h-11 text-xs sm:text-sm"
        />
        <Button type="submit" className="h-11 bg-primary hover:bg-primary/90 px-4 sm:px-6 font-semibold text-xs sm:text-sm shrink-0">
          {t("Track", "ट्रैक करें")}
        </Button>
      </form>
      {quickTrackIds.length > 0 && (
        <div className="mt-3 text-xs text-muted-foreground">
          <span>
            {t(
              "Try tracking these complaints: ",
              "ये शिकायतें ट्रैक करने का प्रयास करें: ",
            )}
          </span>
          <div className="inline-flex flex-wrap gap-2 mt-1">
            {quickTrackIds.map((c) => (
              <button
                key={c._id || c.id}
                onClick={() => onQuickTrack(c)}
                className="px-3 py-1 bg-muted hover:bg-blue-50 hover:text-primary rounded-full font-mono text-xs transition-colors cursor-pointer"
              >
                {c.grievanceId || c.id}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
