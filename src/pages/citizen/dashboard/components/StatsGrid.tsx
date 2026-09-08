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
  in_progress: {
    border: "border-amber-100 dark:border-slate-800 hover:border-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/50",
    text: "text-amber-600 dark:text-amber-400",
  },
  resolved: {
    border: "border-emerald-100 dark:border-slate-800 hover:border-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/50",
    text: "text-emerald-600 dark:text-emerald-400",
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
        const theme = COLOR_THEMES[s.filter] || {
          border: "border-border hover:border-primary",
          bg: "bg-muted",
          text: s.color || "text-foreground",
        };

        return (
          <Link
            key={i}
            to={`/citizen/track?status=${s.filter}`}
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

