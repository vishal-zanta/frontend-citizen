
import PortalLayout from "@/components/PortalLayout";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { getDashboardAnalytics } from "./api";
import LoaderErrWrapper from "@/components/LoaderErrWrapper";

import WelcomeBanner from "./components/WelcomeBanner";
import QuickActions from "./components/QuickActions";
import StatsGrid from "./components/StatsGrid";
import TrackShortcut from "./components/TrackShortcut";

export default function CitizenDashboard() {
  const { t, lang, toggle } = useLanguage();

  const { data: res, isLoading, error } = useQuery({
    queryKey: ["citizen-dashboard-analytics"],
    queryFn: getDashboardAnalytics,
  });

  const analytics = res?.data?.data;

 

  const totalCount = analytics?.totalComplaints ?? 0 ; 
  const inProgressCount = analytics?.inProgress ?? 0 ; 
  const resolvedCount = analytics?.resolved ?? 0 ; 
  const escalatedCount = analytics?.escalated ?? 0 ; 

  const stats = [
    {
      label: t("Total Filed", "कुल दर्ज"),
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
      filter: "in_progress",
    },
    {
      label: t("Resolved", "हल"),
      value: resolvedCount,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      filter: "resolved",
    },
    {
      label: t("Escalated", "स्थानांतरित"),
      value: escalatedCount,
      color: "text-red-600",
      bg: "bg-red-50",
      filter: "escalated",
    },
  ];

  return (
    <PortalLayout role="citizen">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Welcome */}
        <WelcomeBanner t={t} lang={lang} toggle={toggle} />

        {/* Quick actions */}
        <QuickActions t={t} />

        {/* Clickable stat boxes */}
        <LoaderErrWrapper isLoading={isLoading} error={error}>
          <StatsGrid stats={stats} />
        </LoaderErrWrapper>

        {/* Quick track shortcut */}
        <TrackShortcut t={t} />
      </div>
    </PortalLayout>
  );
}
