import React from "react";
import { Link } from "react-router-dom";

interface StatItem {
  label: string;
  value: number;
  color: string;
  bg: string;
  filter: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

const COLOR_THEMES: Record<string, { border: string; bg: string; text: string }> = {
  all: {
    border: "border-blue-100 dark:border-slate-800 hover:border-primary",
    bg: "bg-blue-50 dark:bg-blue-950/50",
    text: "text-primary",
  },
  ALL: {
    border: "border-blue-100 dark:border-slate-800 hover:border-primary",
    bg: "bg-blue-50 dark:bg-blue-950/50",
    text: "text-primary",
  },
  RESOLVED: {
    border: "border-emerald-100 dark:border-slate-800 hover:border-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/50",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  resolved: {
    border: "border-emerald-100 dark:border-slate-800 hover:border-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/50",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  CLOSED: {
    border: "border-slate-200 dark:border-slate-800 hover:border-slate-400",
    bg: "bg-slate-100 dark:bg-slate-900",
    text: "text-slate-600 dark:text-slate-400",
  },
  closed: {
    border: "border-slate-200 dark:border-slate-800 hover:border-slate-400",
    bg: "bg-slate-100 dark:bg-slate-900",
    text: "text-slate-600 dark:text-slate-400",
  },
  IN_PROGRESS: {
    border: "border-amber-100 dark:border-slate-800 hover:border-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/50",
    text: "text-amber-600 dark:text-amber-400",
  },
  in_progress: {
    border: "border-amber-100 dark:border-slate-800 hover:border-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/50",
    text: "text-amber-600 dark:text-amber-400",
  },
  REOPENED: {
    border: "border-yellow-100 dark:border-slate-800 hover:border-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/50",
    text: "text-yellow-600 dark:text-yellow-400",
  },
  reopened: {
    border: "border-yellow-100 dark:border-slate-800 hover:border-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/50",
    text: "text-yellow-600 dark:text-yellow-400",
  },
  OPEN: {
    border: "border-blue-100 dark:border-slate-800 hover:border-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/50",
    text: "text-blue-600 dark:text-blue-400",
  },
  open: {
    border: "border-blue-100 dark:border-slate-800 hover:border-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/50",
    text: "text-blue-600 dark:text-blue-400",
  },
  ESCALATED: {
    border: "border-red-100 dark:border-slate-800 hover:border-red-400",
    bg: "bg-red-50 dark:bg-red-950/50",
    text: "text-red-600 dark:text-red-400",
  },
  escalated: {
    border: "border-red-100 dark:border-slate-800 hover:border-red-400",
    bg: "bg-red-50 dark:bg-red-950/50",
    text: "text-red-600 dark:text-red-400",
  },
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => {
        const theme =
          COLOR_THEMES[s.filter] ||
          COLOR_THEMES[s.filter?.toUpperCase()] ||
          COLOR_THEMES[s.filter?.toLowerCase()] || {
            border: "border-border hover:border-primary",
            bg: s.bg || "bg-muted",
            text: s.color || "text-foreground",
          };

        const targetUrl =
          s.filter && s.filter.toLowerCase() !== "all"
            ? `/citizen/track?status=${s.filter}`
            : "/citizen/track";

        return (
          <Link
            key={i}
            to={targetUrl}
            className={`group bg-card rounded-xl border-2 ${theme.border} p-4 sm:p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}
          >
            <div
              className={`w-12 h-12 rounded-xl ${theme.bg} ${theme.text} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform font-bold text-lg sm:text-xl`}
            >
              {s.value}
            </div>
            <h3 className="font-bold text-foreground">
              {s.label}
            </h3>
          </Link>
        );
      })}
    </div>
  );
}

