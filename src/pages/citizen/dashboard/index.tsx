
import React, { useState, useMemo } from "react";
import PortalLayout from "@/components/PortalLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { getDashboardAnalytics } from "./api";
import LoaderErrWrapper from "@/components/LoaderErrWrapper";

import WelcomeBanner from "./components/WelcomeBanner";
import QuickActions from "./components/QuickActions";
import StatsGrid from "./components/StatsGrid";
import SearchComplaint from "../track-complaint/components/SearchComplaint";
import Filter from "@/components/Filter";
import PreviousComplaintsTable from "../track-complaint/components/PreviousComplaintsTable";
import { useGetComplaints, useGetDepartments } from "@/hooks/useGetQuery";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";

export default function CitizenDashboard() {
  const { t, lang, toggle } = useLanguage();
  const [searchId, setSearchId] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<string | undefined>();

  const statusFilter = filters.status;
  const departmentFilter = filters.department;

  const { data: res, isLoading, error } = useQuery({
    queryKey: ["citizen-dashboard-analytics"],
    queryFn: getDashboardAnalytics,
  });

  const { data: deptRes } = useGetDepartments();
  const departmentsList = deptRes?.data?.data?.docs || deptRes?.data?.data || [];

  const filterOptions = useMemo(() => {
    return [
      {
        filterKey: "department",
        label: "Department",
        labelHindi: "विभाग",
        isMultiple: true,
        options: (Array.isArray(departmentsList) ? departmentsList : []).map(
          (d: any) => ({
            label: t(
              d.title || d.name_en || d.name || "",
              d.titleHindi || d.name_local || d.title || d.name || ""
            ),
            value: d._id || d.id,
          })
        ),
      },
      {
        filterKey: "status",
        label: "Status",
        labelHindi: "स्थिति",
        isMultiple: true,
        options: [
          { label: t("Pending", "लंबित"), value: "PENDING" },
          { label: t("In Progress", "प्रगति पर"), value: "IN_PROGRESS" },
          { label: t("Resolved", "समाधान की गई"), value: "RESOLVED" },
          { label: t("Closed", "बंद"), value: "CLOSED" },
          { label: t("Reopened", "पुनः खोली गई"), value: "REOPENED" },
          { label: t("Escalated", "हस्तांतरित"), value: "ESCALATED" },
        ],
      },
    ];
  }, [departmentsList, t]);

  const { page, limit, ...pageProps } = usePagination();
  const {
    data: listData,
    isLoading: isComplaintsLoading,
    error: complaintsError,
  } = useGetComplaints(
    [
      page,
      limit,
      searchId,
      statusFilter,
      departmentFilter,
      sortBy,
      sortOrder,
    ],
    {
      page,
      limit,
      search: searchId || undefined,
      status: statusFilter || undefined,
      department: departmentFilter || undefined,
      sortBy: sortBy || undefined,
      sortOrder: sortOrder || undefined,
    }
  );

  const analytics = res?.data?.data;
  const filteredComplaints = listData?.data?.data?.docs || [];
  const totalPages = listData?.data?.data?.pagination?.totalPages || 1;

  const totalCount = analytics?.totalComplaints ?? 0;
  const inProgressCount = analytics?.inProgress ?? 0;
  const resolvedCount = analytics?.resolved ?? 0;
  const escalatedCount = analytics?.escalated ?? 0;

  const stats = [
    {
      label: t("Total Raised", "कुल दर्ज"),
      value: totalCount,
      color: "text-primary",
      bg: "bg-blue-50",
      filter: "all",
    },
    {
      label: t("In Progress", "प्रगति पर"),
      value: inProgressCount,
      color: "text-amber-600",
      bg: "bg-amber-50",
      filter: "IN_PROGRESS",
    },
    {
      label: t("Resolved", "समाधान की गई"),
      value: resolvedCount,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      filter: "RESOLVED",
    },
    {
      label: t("Escalated", "हस्तांतरित किया गया"),
      value: escalatedCount,
      color: "text-red-600",
      bg: "bg-red-50",
      filter: "ESCALATED",
    },
  ];

  return (
    <PortalLayout role="citizen">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Quick actions */}
        <QuickActions t={t} />

        {/* Clickable stat boxes */}
        <LoaderErrWrapper isLoading={isLoading} error={error}>
          <StatsGrid stats={stats} />
        </LoaderErrWrapper>

        {/* Search & Filter Bar */}
        <SearchComplaint
          searchId={searchId}
          setSearchId={setSearchId}
          t={t}
          filterNode={
            <Filter
              filters={filters}
              setFilters={setFilters}
              filterOptions={filterOptions}
            />
          }
        />

        {/* Previous Complaints */}
        <PreviousComplaintsTable
          filteredComplaints={filteredComplaints}
          t={t}
          isLoading={isComplaintsLoading}
          error={complaintsError}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={(newSortBy, newSortOrder) => {
            setSortBy(newSortBy);
            setSortOrder(newSortOrder);
          }}
          Pagination={
            <Pagination
              page={page}
              limit={limit}
              {...pageProps}
              totalPage={totalPages}
            />
          }
        />
      </div>
    </PortalLayout>
  );
}
