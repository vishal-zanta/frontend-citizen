import React from "react";
import { Link } from "react-router-dom";
import {
  Monitor,
  Clock,
  ClipboardCheck,
  ShieldAlert,
  RotateCcw,
  CheckCircle2,
  FileText,
  Hourglass,
  XCircle,
  Activity,
  Layers,
  LucideIcon,
  ExternalLink,
} from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  color?: string;
  bg?: string;
  filter: string;
  navigate?: boolean;
  navigateTo?:string;

}

interface StatsGridProps {
  stats: StatItem[];
}

interface ThemeConfig {
  borderHover: string;
  bgIcon: string;
  iconColor: string;
  icon: LucideIcon;
}

const COLOR_THEMES: Record<string, ThemeConfig> = {
  all: {
    borderHover: "hover:border-[#6C4FC7]/40",
    bgIcon: "bg-[#F1EBFE] dark:bg-[#6C4FC7]/20",
    iconColor: "text-[#6C4FC7] dark:text-[#9d85ea]",
    icon: Layers,
  },
  ALL: {
    borderHover: "hover:border-[#6C4FC7]/40",
    bgIcon: "bg-[#F1EBFE] dark:bg-[#6C4FC7]/20",
    iconColor: "text-[#6C4FC7] dark:text-[#9d85ea]",
    icon: Layers,
  },
  OPEN: {
    borderHover: "hover:border-[#2563EB]/40",
    bgIcon: "bg-[#EFF6FF] dark:bg-[#2563EB]/20",
    iconColor: "text-[#2563EB] dark:text-[#60a5fa]",
    icon: FileText,
  },
  open: {
    borderHover: "hover:border-[#2563EB]/40",
    bgIcon: "bg-[#EFF6FF] dark:bg-[#2563EB]/20",
    iconColor: "text-[#2563EB] dark:text-[#60a5fa]",
    icon: FileText,
  },
  PENDING: {
    borderHover: "hover:border-[#D97706]/40",
    bgIcon: "bg-[#FEF3C7] dark:bg-[#D97706]/20",
    iconColor: "text-[#D97706] dark:text-[#fbbf24]",
    icon: Hourglass,
  },
  pending: {
    borderHover: "hover:border-[#D97706]/40",
    bgIcon: "bg-[#FEF3C7] dark:bg-[#D97706]/20",
    iconColor: "text-[#D97706] dark:text-[#fbbf24]",
    icon: Hourglass,
  },
  IN_PROGRESS: {
    borderHover: "hover:border-[#EA580C]/40",
    bgIcon: "bg-[#FFF7ED] dark:bg-[#EA580C]/20",
    iconColor: "text-[#EA580C] dark:text-[#fb923c]",
    icon: Activity,
  },
  in_progress: {
    borderHover: "hover:border-[#EA580C]/40",
    bgIcon: "bg-[#FFF7ED] dark:bg-[#EA580C]/20",
    iconColor: "text-[#EA580C] dark:text-[#fb923c]",
    icon: Activity,
  },
  RESOLVED: {
    borderHover: "hover:border-[#16A34A]/40",
    bgIcon: "bg-[#F0FDF4] dark:bg-[#16A34A]/20",
    iconColor: "text-[#16A34A] dark:text-[#4ade80]",
    icon: ClipboardCheck,
  },
  resolved: {
    borderHover: "hover:border-[#16A34A]/40",
    bgIcon: "bg-[#F0FDF4] dark:bg-[#16A34A]/20",
    iconColor: "text-[#16A34A] dark:text-[#4ade80]",
    icon: ClipboardCheck,
  },
  CLOSED: {
    borderHover: "hover:border-[#64748B]/40",
    bgIcon: "bg-[#F1F5F9] dark:bg-[#64748B]/20",
    iconColor: "text-[#64748B] dark:text-[#94a3b8]",
    icon: CheckCircle2,
  },
  closed: {
    borderHover: "hover:border-[#64748B]/40",
    bgIcon: "bg-[#F1F5F9] dark:bg-[#64748B]/20",
    iconColor: "text-[#64748B] dark:text-[#94a3b8]",
    icon: CheckCircle2,
  },
  REOPENED: {
    borderHover: "hover:border-[#7C3AED]/40",
    bgIcon: "bg-[#F5F3FF] dark:bg-[#7C3AED]/20",
    iconColor: "text-[#7C3AED] dark:text-[#a78bfa]",
    icon: RotateCcw,
  },
  reopened: {
    borderHover: "hover:border-[#7C3AED]/40",
    bgIcon: "bg-[#F5F3FF] dark:bg-[#7C3AED]/20",
    iconColor: "text-[#7C3AED] dark:text-[#a78bfa]",
    icon: RotateCcw,
  },
  ESCALATED: {
    borderHover: "hover:border-[#DC2626]/40",
    bgIcon: "bg-[#FEF2F2] dark:bg-[#DC2626]/20",
    iconColor: "text-[#DC2626] dark:text-[#f87171]",
    icon: ShieldAlert,
  },
  escalated: {
    borderHover: "hover:border-[#DC2626]/40",
    bgIcon: "bg-[#FEF2F2] dark:bg-[#DC2626]/20",
    iconColor: "text-[#DC2626] dark:text-[#f87171]",
    icon: ShieldAlert,
  },
  EXTERNAL_STATUS: {
    borderHover: "hover:border-[#0284C7]/40",
    bgIcon: "bg-[#E0F2FE] dark:bg-[#0284C7]/20",
    iconColor: "text-[#0284C7] dark:text-[#38bdf8]",
    icon: ExternalLink,
  },
  external_status: {
    borderHover: "hover:border-[#0284C7]/40",
    bgIcon: "bg-[#E0F2FE] dark:bg-[#0284C7]/20",
    iconColor: "text-[#0284C7] dark:text-[#38bdf8]",
    icon: ExternalLink,
  },
  // REJECTED: {
  //   borderHover: "hover:border-[#991B1B]/40",
  //   bgIcon: "bg-[#FEE2E2] dark:bg-[#991B1B]/20",
  //   iconColor: "text-[#991B1B] dark:text-[#fca5a5]",
  //   icon: XCircle,
  // },
  // rejected: {
  //   borderHover: "hover:border-[#991B1B]/40",
  //   bgIcon: "bg-[#FEE2E2] dark:bg-[#991B1B]/20",
  //   iconColor: "text-[#991B1B] dark:text-[#fca5a5]",
  //   icon: XCircle,
  // },
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3.5 sm:gap-4">
      {stats.map((s, i) => {
        const theme =
          COLOR_THEMES[s.filter] ||
          COLOR_THEMES[s.filter?.toUpperCase()] ||
          COLOR_THEMES[s.filter?.toLowerCase()] || {
            borderHover: "hover:border-primary/40",
            bgIcon: "bg-muted",
            iconColor: "text-primary",
            icon: Monitor,
          };

        const Icon = theme.icon;
        const targetUrl = s.navigate === false ? null : (
          s.navigateTo? s.navigateTo:
          s.filter && s.filter.toLowerCase() !== "all"
          ? `/citizen/track?status=${s.filter}`
          : "/citizen/track"
        );

        return (
          <Link
            key={i}
            to={targetUrl}
            className={`group bg-white dark:bg-card rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-border shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-3.5 sm:gap-4 hover:-translate-y-0.5 ${theme.borderHover}`}
          >
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${theme.bgIcon} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300`}
            >
              <Icon
                className={`w-6 h-6 sm:w-7 sm:h-7 ${theme.iconColor} stroke-[2.2]`}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-slate-600 dark:text-muted-foreground font-medium text-xs sm:text-sm leading-tight group-hover:text-foreground transition-colors truncate">
                {s.label}
              </div>
              <div className="font-extrabold text-xl sm:text-2xl text-slate-950 dark:text-foreground tracking-tight mt-1">
                {s.value}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}


