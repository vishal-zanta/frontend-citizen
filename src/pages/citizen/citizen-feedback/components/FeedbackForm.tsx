import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ChevronDown,
  Loader2,
  Search,
  X,
  CheckCircle2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { getComplaints } from "@/api/complaints.api";
import { useLanguage } from "@/context/LanguageContext";
import { feedbackStatus } from "@/utils/constants";
import ComplaintFeedback from "@/pages/citizen/track-complaint/components/ComplaintFeedback";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Complaint {
  _id: string;
  grievanceId: string;
  status: string;
  rating?: number;
  feedbackText?: string;
  classification?: {
    subService?: {
      title?: string;
      titleHindi?: string;
    };
  };
  address?: {
    district?: any;
    state?: string;
  };
  createdAt?: string;
}

// ─── Custom Complaint Dropdown ────────────────────────────────────────────────

const PAGE_SIZE = 5;

interface ComplaintDropdownProps {
  value: Complaint | null;
  onChange: (c: Complaint | null) => void;
  t: (en: string, hi: string) => string;
}

function ComplaintDropdown({ value, onChange, t }: ComplaintDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Complaint[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus search on open
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open]);

  // Fetch first page (reset)
  const fetchFirst = useCallback(async (q: string) => {
    setLoading(true);
    setItems([]);
    setPage(1);
    try {
      const res = await getComplaints({
        status: feedbackStatus.join(","),
        page: 1,
        limit: PAGE_SIZE,
        search: q || undefined,
      });
      const docs: Complaint[] = res?.data?.data?.docs ?? [];
      const tp: number = res?.data?.data?.pagination?.totalPages ?? 1;
      setItems(docs);
      setTotalPages(tp);
      setPage(2);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch next page (append)
  const fetchMore = useCallback(async () => {
    if (loadingMore || page > totalPages) return;
    setLoadingMore(true);
    try {
      const res = await getComplaints({
        status: feedbackStatus.join(","),
        page,
        limit: PAGE_SIZE,
        search: search || undefined,
      });
      const docs: Complaint[] = res?.data?.data?.docs ?? [];
      setItems((prev) => [...prev, ...docs]);
      setPage((p) => p + 1);
    } catch {
      /* ignore */
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, page, totalPages, search]);

  // Debounced search — 0ms delay on initial open, 350ms while typing
  useEffect(() => {
    if (!open) return;
    const delay = search ? 350 : 0;
    const id = setTimeout(() => {
      fetchFirst(search);
    }, delay);
    return () => clearTimeout(id);
  }, [search, open, fetchFirst]);

  // Infinite scroll listener
  const onListScroll = () => {
    const el = listRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
      fetchMore();
    }
  };

  const handleOpen = () => {
    setOpen((o) => {
      if (!o) {
        setSearch("");
        // fetchFirst is triggered by the useEffect above when open becomes true
      }
      return !o;
    });
  };

  const handleSelect = (c: Complaint) => {
    onChange(c);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        className={`w-full flex items-center justify-between gap-2 h-10 px-3 rounded-lg border text-sm transition-colors
          ${open ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/60"}
          bg-background text-foreground`}
      >
        {value ? (
          <span className="flex-1 text-left truncate font-medium">
            {value.grievanceId} —{" "}
            {value.classification?.subService?.title ?? ""}
          </span>
        ) : (
          <span className="flex-1 text-left text-muted-foreground">
            {t("Search or select a resolved complaint…", "हल की गई शिकायत खोजें…")}
          </span>
        )}
        <span className="flex items-center gap-1 text-muted-foreground shrink-0">
          {value && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              className="hover:text-foreground p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 mt-1 z-50 bg-background border border-border rounded-xl shadow-lg overflow-hidden">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("Search by ID or service…", "ID या सेवा से खोजें…")}
              className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* List */}
          <div
            ref={listRef}
            onScroll={onListScroll}
            className="max-h-64 overflow-y-auto"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("Loading…", "लोड हो रहा है…")}
              </div>
            ) : items.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                {t(
                  "No resolved complaints found.",
                  "कोई हल की गई शिकायत नहीं मिली।"
                )}
              </div>
            ) : (
              <>
                {items.map((c) => {
                  const active = value?._id === c._id;
                  const alreadyRated = typeof c.rating === "number" && c.rating > 0;
                  return (
                    <button
                      key={c._id}
                      type="button"
                      onClick={() => handleSelect(c)}
                      className={`w-full text-left px-4 py-3 flex flex-col gap-0.5 border-b border-border/50 last:border-0 transition-colors
                        ${active ? "bg-primary/10" : "hover:bg-muted/60 cursor-pointer"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm font-medium ${active ? "text-primary" : "text-foreground"}`}
                        >
                          {c.grievanceId}
                        </span>
                        {alreadyRated && (
                          <span className="text-[10px] font-medium bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
                            {t("Feedback given", "प्रतिक्रिया दी गई")}
                          </span>
                        )}
                        {active && !alreadyRated && (
                          <span className="text-[10px] font-medium bg-primary/15 text-primary px-1.5 py-0.5 rounded-full">
                            {t("Selected", "चुना गया")}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground truncate">
                        {c.classification?.subService?.title ?? ""}{" "}
                        {c.address?.district?.name ? `· ${c.address.district?.name}` : ""}
                      </span>
                    </button>
                  );
                })}

                {/* Load more spinner */}
                {page <= totalPages && (
                  <div className="flex items-center justify-center gap-2 py-3 text-xs text-muted-foreground">
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        {t("Loading more…", "और लोड हो रहा है…")}
                      </>
                    ) : (
                      <span>{t("Scroll to load more", "अधिक के लिए स्क्रॉल करें")}</span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

interface FeedbackFormProps {
  onSuccess?: () => void;
}

export default function FeedbackForm({ onSuccess }: FeedbackFormProps) {
  const { t } = useLanguage();

  const [selected, setSelected] = useState<Complaint | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // ── Success screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h2 className="text-xl font-bold text-foreground">
          {t("Thank You for Your Feedback!", "आपकी प्रतिक्रिया के लिए धन्यवाद!")}
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          {t(
            "Your feedback has been recorded successfully.",
            "आपकी प्रतिक्रिया सफलतापूर्वक दर्ज कर ली गई है।"
          )}
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setSelected(null);
          }}
        >
          {t("Submit Another", "एक और जमा करें")}
        </Button>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">

      {/* ── Complaint selector ─── */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">
          {t("Select Resolved Complaint", "हल की गई शिकायत चुनें")}
          <span className="text-destructive ml-0.5">*</span>
        </Label>
        <p className="text-xs text-muted-foreground mt-1 mb-2">
          {t(
            "Only Resolved and Closed complaints are listed. Scroll inside the dropdown to load more.",
            "केवल हल की गई और बंद शिकायतें सूची में हैं। अधिक के लिए ड्रॉपडाउन में स्क्रॉल करें।"
          )}
        </p>
        <ComplaintDropdown
          value={selected}
          onChange={(c) => setSelected(c)}
          t={t}
        />

        {/* Preview card */}
        {selected && (
          <div className="mt-2 p-3 bg-muted/40 border border-border/60 rounded-lg text-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                {selected.grievanceId}
              </span>
              <span className="text-[11px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                {selected.status}
              </span>
            </div>
            <p className="text-muted-foreground text-xs">
              {selected.classification?.subService?.title ?? ""}
              {selected.address?.district?.name
                ? ` · ${selected.address.district?.name}`
                : ""}
            </p>
          </div>
        )}
      </div>

      {/* ── Feedback section (ComplaintFeedback) ─── */}
      {selected && (
        <ComplaintFeedback
          key={selected._id}
          complaintId={selected._id}
          existingRating={selected.rating}
          existingFeedback={selected.feedbackText}
          setSelected={setSelected}
          t={t}
        />
      )}
    </div>
  );
}
