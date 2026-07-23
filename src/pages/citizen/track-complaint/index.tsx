import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import CenterLayout from "@/components/CenterLayout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import LoaderErrWrapper from "@/components/LoaderErrWrapper";

import ComplaintDetailsView from "./components/ComplaintDetailsView";
import SearchComplaint from "./components/SearchComplaint";
import PreviousComplaintsTable from "./components/PreviousComplaintsTable";
import { useGetComplaints, useGetComplaintById } from "@/hooks/useGetQuery";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";

interface TrackComplaintProps {
  role?: string;
}

export default function TrackComplaint({
  role = "citizen",
}: TrackComplaintProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const complaintId = searchParams.get("complaint") || searchParams.get("id");
  const { page, limit, ...pageProps } = usePagination();
  const [searchId, setSearchId] = useState("");


  // ── API Queries ────────────────────────────────────────────────────────────
  // Fetch paginated history list
  const {
    data: listData,
    isLoading: isListLoading,
    error: listError,
  } = useGetComplaints(
    [page, limit, searchId],
    { page, limit, search: searchId },
    !complaintId
  );
  const compl = listData?.data?.data?.docs || [];
  const totalPages = listData?.data?.data?.pagination?.totalPages || 1;

  // Fetch individual details if tracking a specific ID
  const {
    data: detailData,
    isLoading: isDetailLoading,
    error: detailError,
  } = useGetComplaintById([complaintId], { _id: complaintId }, !!complaintId);
  const complaint = detailData?.data?.data;

  const { t, lang, toggle } = useLanguage();

  // Update input if URL param changes (e.g. user clicks "View Full Timeline")
  useEffect(() => {
    if (complaintId) {
      setSearchId(complaintId);
    }
  }, [complaintId]);

  const statusFilter = searchParams.get("status");

  // Apply frontend filter based on backend status values
  const filteredComplaints =
    statusFilter && statusFilter !== "all"
      ? compl.filter((c: any) => {
          if (statusFilter === "in_progress")
            return ["OPEN", "IN_PROGRESS", "REOPENED", "PENDING"].includes(
              c.status,
            );
          if (statusFilter === "resolved")
            return ["RESOLVED", "CLOSED"].includes(c.status);
          if (statusFilter === "escalated") return c.status === "ESCALATED";
          return true;
        })
      : compl;

  // Grab the first 5 complaints from the database for the quick-track suggestion list
  const quickTrackComplaints = compl.slice(0, 5);

  const handleSearch = (id: string) => {
    if (!id.trim()) return;
    setSearchParams({ complaint: id });
  };

  const handleQuickTrack = (c: any) => {
    setSearchParams({ complaint: c._id || c.id });
  };

  const handlePrint = () => {
    window.print();
  };

  const showDetails = !!complaintId;
  const showNotFound = showDetails && !isDetailLoading && !complaint;

  return (
    <PortalLayout role={role}>
      <CenterLayout className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 no-print">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              {statusFilter === "resolved"
                ? t("Resolved Complaints", "हल की गई शिकायतें")
                : statusFilter === "in_progress"
                ? t("In-Progress Complaints", "प्रगति पर शिकायतें")
                : statusFilter === "escalated"
                ? t("Escalated Complaints", "गंभीर शिकायतें")
                : t("Track Complaint", "शिकायत ट्रैक करें")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t(
                "Enter your Complaint ID to view status, timeline, and officer details.",
                "स्थिति, समयरेखा और अधिकारी विवरण देखने के लिए अपनी शिकायत आईडी दर्ज करें।",
              )}
            </p>
          </div>
        </div>

        {showDetails ? (
          <div className="space-y-4">
            <Button
              onClick={() => {
                setSearchId("");
                setSearchParams({});
              }}
              variant="link"
              className="px-0 text-primary hover:underline flex items-center gap-1 no-print mb-2 cursor-pointer"
            >
              &larr;{" "}
              {t("Back to Search & History", "खोज और इतिहास पर वापस जाएं")}
            </Button>
            <LoaderErrWrapper isLoading={isDetailLoading} error={detailError}>
              {complaint ? (
                <ComplaintDetailsView
                  complaint={complaint}
                  t={t}
                  onPrint={handlePrint}
                />
              ) : (
                showNotFound && (
                  <div className="bg-card rounded-xl border border-border p-12 text-center no-print mb-6">
                    <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      {t(
                        "No complaint found with ID",
                        "इस आईडी के साथ कोई शिकायत नहीं मिली",
                      )}{" "}
                      "{complaintId}".
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {t(
                        "Try check your previous complaints table or check the ID again.",
                        "अपनी पिछली शिकायतों की तालिका देखें या आईडी दोबारा जांचें।",
                      )}
                    </p>
                  </div>
                )
              )}
            </LoaderErrWrapper>
          </div>
        ) : (
          <>
            <SearchComplaint
              searchId={searchId}
              setSearchId={setSearchId}
              quickTrackIds={quickTrackComplaints}
              t={t}
              onQuickTrack={handleQuickTrack}
            />

            <PreviousComplaintsTable
              filteredComplaints={filteredComplaints}
              t={t}
              isLoading={isListLoading}
              error={listError}
              Pagination={
                <Pagination
                  page={page}
                  limit={limit}
                  {...pageProps}
                  totalPage={totalPages}
                />
              }
            />
          </>
        )}
      </CenterLayout>
    </PortalLayout>
  );
}
