
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
import {
  departmentsList as externalDepartmentsList,
  isExternalDepartment,
} from "@/utils/departments";
import { STATUS_ACTIONS } from "@/utils/constants";
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

  const isExternal = Boolean(
    departmentFilter && isExternalDepartment(departmentFilter));

  const { data: res, isLoading, error } = useQuery({
    queryKey: ["citizen-dashboard-analytics"],
    queryFn: getDashboardAnalytics,
  });

  const { data: deptRes } = useGetDepartments();
  const apiDepartmentsList = deptRes?.data?.data?.docs || deptRes?.data?.data || [];

  const filterOptions = useMemo(() => {
    const internalOptions = (Array.isArray(apiDepartmentsList) ? apiDepartmentsList : []).map(
      (d: any) => ({
        label: t(
          d.title || d.name_en || d.name || "",
          d.titleHindi || d.name_local || d.title || d.name || ""
        ),
        value: d._id || d.id,
      })
    );

    const externalOptions = externalDepartmentsList
      .filter((dept) => !dept.isHide)
      .map((dept) => ({
        label: t(dept.name, dept.nameHindi || dept.name),
        value: dept.key,
      }));

    return [
      {
        filterKey: "department",
        label: "Department",
        labelHindi: "विभाग",
        isMultiple: false,
        options: [...internalOptions, ...externalOptions],
      },
      {
        filterKey: "status",
        label: "Status",
        labelHindi: "स्थिति",
        isMultiple: true,
        options: STATUS_ACTIONS.map((action) => ({
          label: t(
            action.badgeLabel || action.label,
            action.badgeLabelHindi || action.labelHindi || action.badgeLabel || action.label,
          ),
          value: action.value,
        })),
      },
    ];
  }, [apiDepartmentsList, t]);

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
      department: !isExternal && departmentFilter ? departmentFilter : undefined,
      departmentCode: isExternal && departmentFilter ? departmentFilter : undefined,
      sortBy: sortBy || undefined,
      sortOrder: sortOrder || undefined,
    }
  );

  const analytics = res?.data?.data;
  const filteredComplaints = listData?.data?.data?.docs || [];
  const totalPages = listData?.data?.data?.pagination?.totalPages || 1;

  const totalCount = analytics?.totalComplaints ?? 0;
  const openCount = analytics?.OPEN ?? analytics?.open ?? 0;
  const pendingCount = analytics?.PENDING ?? analytics?.pending ?? 0;
  const inProgressCount = analytics?.IN_PROGRESS ?? analytics?.inProgress ?? 0;
  const resolvedCount = analytics?.RESOLVED ?? analytics?.resolved ?? 0;
  const closedCount = analytics?.CLOSED ?? analytics?.closed ?? 0;
  const reopenedCount = analytics?.REOPENED ?? analytics?.reopened ?? 0;
  const escalatedCount = analytics?.ESCALATED ?? analytics?.escalated ?? 0;
  const rejectedCount = analytics?.REJECTED ?? analytics?.rejected ?? 0;
  const externalStatusCount = useMemo(() => {
    if (!analytics || typeof analytics !== "object") return 0;
    const presentKeys = new Set([
      "totalcomplaints",
      "total",
      "open",
      "pending",
      "inprogress",
      "in_progress",
      "resolved",
      "closed",
      "reopened",
      "escalated",
      "rejected",
    ]);

    return Object.entries(analytics).reduce((sum, [key, val]) => {
      const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!presentKeys.has(normalizedKey) && !presentKeys.has(key.toLowerCase())) {
        const count = typeof val === "number" ? val : Number(val);
        if (!isNaN(count)) {
          return sum + count;
        }
      }
      return sum;
    }, 0);
  }, [analytics]);

  const stats = [
    {
      label: t("Total Raised", "कुल दर्ज"),
      value: totalCount,
      filter: "all",
    },
    {
      label: t("Pending", "लंबित"),
      value: openCount,
      filter: "OPEN",
    },
    {
      label: t("Approval Pending", "स्वीकृति लंबित"),
      value: pendingCount,
      filter: "PENDING",
    },
    {
      label: t("In Progress", "प्रगति पर"),
      value: inProgressCount,
      filter: "IN_PROGRESS",
    },
    {
      label: t("Resolved", "समाधान की गई"),
      value: resolvedCount,
      filter: "RESOLVED",
    },
    {
      label: t("Closed", "बंद"),
      value: closedCount,
      filter: "CLOSED",
    },
    {
      label: t("Reopened", "पुनः खोली गई"),
      value: reopenedCount,
      filter: "REOPENED",
    },
    {
      label: t("Escalated", "हस्तांतरित"),
      value: escalatedCount,
      filter: "ESCALATED",
    },
    {
      label: t("External Status", "बाहरी स्थिति"),
      value: externalStatusCount,
      filter: "EXTERNAL_STATUS",
      navigate: false,
      // navigateTo : `/citizen/track?filter.department=${externalDepartmentsList.filter((dept)=> !dept.isHide).map((dept) => dept.key).join(",")}`
    },
    // {
    //   label: t("Rejected", "अस्वीकृत"),
    //   value: rejectedCount,
    //   filter: "REJECTED",
    // },
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
