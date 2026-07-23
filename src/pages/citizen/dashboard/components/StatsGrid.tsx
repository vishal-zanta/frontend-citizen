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

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <Link
          key={i}
          to={`/citizen/track?status=${s.filter}`}
          className="bg-card rounded-xl border border-border p-3 sm:p-4 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
        >
          <div className={`text-xl sm:text-2xl font-bold ${s.color}`}>{s.value}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">{s.label}</div>
        </Link>
      ))}
    </div>
  );
}
