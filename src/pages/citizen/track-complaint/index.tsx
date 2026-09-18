import React, { useState, useEffect } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import CenterLayout from "@/components/CenterLayout";
import { useLanguage } from "@/context/LanguageContext";
import LoaderErrWrapper from "@/components/LoaderErrWrapper";
import { useQuery } from "@tanstack/react-query";

import ComplaintDetailsView from "./components/ComplaintDetailsView";
import SearchComplaint from "./components/SearchComplaint";
import PreviousComplaintsTable from "./components/PreviousComplaintsTable";
import { useGetComplaints, useGetComplaintById } from "@/hooks/useGetQuery";
import { getExternalComplaintsById } from "@/api/externalDept.api";
import {
  getExternalDepartment,
  isExternalDepartment,
} from "@/utils/departments";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";

interface TrackComplaintProps {
  role?: string;
}

export default function TrackComplaint({
  role = "citizen",
}: TrackComplaintProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const complaintId = searchParams.get("complaint") || searchParams.get("id");
  const grievanceTypeParam = searchParams.get("grievanceType");
  const departmentCodeParam = searchParams.get("departmentCode");
  const { page, limit, ...pageProps } = usePagination();
  const [searchId, setSearchId] = useState("");
  const statusFilter = searchParams.get("status");

  const isExternal =
    grievanceTypeParam === "EXTERNAL" ||
    Boolean(departmentCodeParam && isExternalDepartment(departmentCodeParam));

  // ────────────────────────────────────────────────────────────

  // ── API Queries
  // Fetch paginated history list
  const {
    data: listData,
    isLoading: isListLoading,
    error: listError,
  } = useGetComplaints(
    [page, limit, searchId, statusFilter],
    { page, limit, search: searchId, status: statusFilter },
    !complaintId,
  );
  const compl = listData?.data?.data?.docs || [];
  const totalPages = listData?.data?.data?.pagination?.totalPages || 1;

  // Fetch individual details if tracking a specific ID (Internal)
  const {
    data: detailData,
    isLoading: isInternalLoading,
    error: internalError,
  } = useGetComplaintById(
    [complaintId],
    { _id: complaintId },
    Boolean(complaintId && !isExternal),
  );

  // Fetch individual details if tracking a specific ID (External)
  const {
    data: externalDetailData,
    isLoading: isExternalLoading,
    error: externalError,
  } = useQuery({
    queryKey: ["external-complaint", complaintId],
    queryFn: () => getExternalComplaintsById(complaintId || ""),
    enabled: Boolean(complaintId && isExternal),
  });

  const isDetailLoading = isExternal ? isExternalLoading : isInternalLoading;
  const detailError = isExternal ? externalError : internalError;
  const complaint = isExternal
    ? externalDetailData?.data?.data
    : detailData?.data?.data;

  const { t } = useLanguage();

  // Update input if URL param changes (e.g. user clicks "View Full Timeline")
  useEffect(() => {
    if (complaintId) {
      setSearchId(complaintId);
    }
  }, [complaintId]);

  // Apply frontend filter based on backend status values
  const filteredComplaints = compl;

  // Grab the first 5 complaints from the database for the quick-track suggestion list
  const quickTrackComplaints = compl.slice(0, 5);

  const handleSearch = (id: string) => {
    if (!id.trim()) return;
    setSearchParams({ complaint: id });
  };

  const handleQuickTrack = (c: any) => {
    const isExt =
      c.grievanceType === "EXTERNAL" ||
      c.isExternal === true ||
      Boolean(c.departmentCode);
    const gType = isExt ? "EXTERNAL" : c.grievanceType || "INTERNAL";
    const deptCode =
      c.departmentCode ||
      c.classification?.departmentCode ||
      (isExt ? c.classification?.department : undefined);

    const params: Record<string, string> = {
      complaint: c._id || c.id,
      grievanceType: gType,
    };
    if (isExt && deptCode) {
      params.departmentCode = deptCode;
    }
    setSearchParams(params);
  };

  const handlePrint = () => {
    window.print();
  };

  const showDetails = !!complaintId;
  const showNotFound = showDetails && !isDetailLoading && !complaint;

  const handleBack = () => {
    setSearchId("");
    setSearchParams({}, { replace: true });
    navigate(-1);
  };

  const deptCode = complaint?.departmentCode || departmentCodeParam;
  const externalDept = deptCode ? getExternalDepartment(deptCode) : null;
  const ExternalViewComponent = externalDept?.viewComponent;

  return (
    <PortalLayout role={role}>
      <CenterLayout className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 no-print">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title={t("Back", "पीछे जाएं")}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                {statusFilter?.toUpperCase() === "RESOLVED"
                  ? t("Resolved Complaints", "हल की गई शिकायतें")
                  : statusFilter?.toUpperCase() === "IN_PROGRESS"
                    ? t("In-Progress Complaints", "प्रगति पर शिकायतें")
                    : statusFilter?.toUpperCase() === "CLOSED"
                      ? t("Closed Complaints", "बंद शिकायतें")
                      : statusFilter?.toUpperCase() === "REOPENED"
                        ? t("Reopened Complaints", "पुनः खोली गई शिकायतें")
                        : statusFilter?.toUpperCase() === "OPEN"
                          ? t("Open Complaints", "लंबित शिकायतें")
                          : statusFilter?.toUpperCase() === "ESCALATED"
                            ? t("Escalated Complaints", "गंभीर शिकायतें")
                            : t(
                                "Check Complaint Status",
                                "शिकायत की स्थिति देखें",
                              )}
              </h1>
            </div>
          </div>
        </div>

        {showDetails ? (
          <div className="space-y-4">
            <LoaderErrWrapper isLoading={isDetailLoading} error={detailError}>
              {complaint ? (
                isExternal && ExternalViewComponent ? (
                  <ExternalViewComponent
                    data={complaint}
                    onPrint={handlePrint}
                  />
                ) : (
                  <ComplaintDetailsView
                    complaint={complaint}
                    t={t}
                    onPrint={handlePrint}
                  />
                )
              ) : (
                showNotFound && (
                  <div className="bg-card rounded-xl border border-border p-12 text-center no-print mb-6">
                    <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      {t(
                        "No complaint found with number",
                        "इस संख्या के साथ कोई शिकायत नहीं मिली",
                      )}{" "}
                      "{complaintId}".
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {t(
                        "Try check your previous complaints table or check the complaint number again.",
                        "अपनी पिछली शिकायतों की तालिका देखें या संख्या दोबारा देखें।",
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
