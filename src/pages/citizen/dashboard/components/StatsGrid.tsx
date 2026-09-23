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
  LucideIcon,
} from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  color?: string;
  bg?: string;
  filter: string;
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
    icon: Monitor,
  },
  ALL: {
    borderHover: "hover:border-[#6C4FC7]/40",
    bgIcon: "bg-[#F1EBFE] dark:bg-[#6C4FC7]/20",
    iconColor: "text-[#6C4FC7] dark:text-[#9d85ea]",
    icon: Monitor,
  },
  IN_PROGRESS: {
    borderHover: "hover:border-[#F16521]/40",
    bgIcon: "bg-[#FEF1EB] dark:bg-[#F16521]/20",
    iconColor: "text-[#F16521] dark:text-[#f79261]",
    icon: Clock,
  },
  in_progress: {
    borderHover: "hover:border-[#F16521]/40",
    bgIcon: "bg-[#FEF1EB] dark:bg-[#F16521]/20",
    iconColor: "text-[#F16521] dark:text-[#f79261]",
    icon: Clock,
  },
  RESOLVED: {
    borderHover: "hover:border-[#67B10D]/40",
    bgIcon: "bg-[#EAF7D8] dark:bg-[#67B10D]/20",
    iconColor: "text-[#67B10D] dark:text-[#88d927]",
    icon: ClipboardCheck,
  },
  resolved: {
    borderHover: "hover:border-[#67B10D]/40",
    bgIcon: "bg-[#EAF7D8] dark:bg-[#67B10D]/20",
    iconColor: "text-[#67B10D] dark:text-[#88d927]",
    icon: ClipboardCheck,
  },
  ESCALATED: {
    borderHover: "hover:border-[#DC2626]/40",
    bgIcon: "bg-[#FEE2E2] dark:bg-[#DC2626]/20",
    iconColor: "text-[#DC2626] dark:text-[#ef4444]",
    icon: ShieldAlert,
  },
  escalated: {
    borderHover: "hover:border-[#DC2626]/40",
    bgIcon: "bg-[#FEE2E2] dark:bg-[#DC2626]/20",
    iconColor: "text-[#DC2626] dark:text-[#ef4444]",
    icon: ShieldAlert,
  },
  REOPENED: {
    borderHover: "hover:border-yellow-500/40",
    bgIcon: "bg-yellow-50 dark:bg-yellow-950/40",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    icon: RotateCcw,
  },
  reopened: {
    borderHover: "hover:border-yellow-500/40",
    bgIcon: "bg-yellow-50 dark:bg-yellow-950/40",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    icon: RotateCcw,
  },
  CLOSED: {
    borderHover: "hover:border-slate-400/40",
    bgIcon: "bg-slate-100 dark:bg-slate-800",
    iconColor: "text-slate-600 dark:text-slate-400",
    icon: CheckCircle2,
  },
  closed: {
    borderHover: "hover:border-slate-400/40",
    bgIcon: "bg-slate-100 dark:bg-slate-800",
    iconColor: "text-slate-600 dark:text-slate-400",
    icon: CheckCircle2,
  },
  OPEN: {
    borderHover: "hover:border-[#1C4D8D]/40",
    bgIcon: "bg-[#EBF2FA] dark:bg-[#1C4D8D]/20",
    iconColor: "text-[#1C4D8D] dark:text-[#60a5fa]",
    icon: FileText,
  },
  open: {
    borderHover: "hover:border-[#1C4D8D]/40",
    bgIcon: "bg-[#EBF2FA] dark:bg-[#1C4D8D]/20",
    iconColor: "text-[#1C4D8D] dark:text-[#60a5fa]",
    icon: FileText,
  },
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
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
        const targetUrl =
          s.filter && s.filter.toLowerCase() !== "all"
            ? `/citizen/track?status=${s.filter}`
            : "/citizen/track";

        return (
          <Link
            key={i}
            to={targetUrl}
            className={`group bg-white dark:bg-card rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-border shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-4 sm:gap-5 hover:-translate-y-0.5 ${theme.borderHover}`}
          >
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${theme.bgIcon} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300`}
            >
              <Icon
                className={`w-7 h-7 sm:w-8 sm:h-8 ${theme.iconColor} stroke-[2.2]`}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-slate-600 dark:text-muted-foreground font-medium text-xs sm:text-[14px] leading-tight group-hover:text-foreground transition-colors">
                {s.label}
              </div>
              <div className="font-extrabold text-2xl sm:text-3xl text-slate-950 dark:text-foreground tracking-tight mt-1">
                {s.value}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

