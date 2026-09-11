import React from "react";
import { Inbox, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { useSahyogTranslation } from "../../../translations";

export default function GrievanceStats() {
  const { t } = useSahyogTranslation();

  const stats = [
    {
      value: "187",
      title: t.stats.receivedToday,
      subtext: t.stats.promptlyRegistered,
      icon: Inbox,
      numberColor: "text-blue-700",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      iconColor: "text-blue-600 bg-blue-50",
      borderColor: "border-blue-500/20",
    },
    {
      value: "143",
      title: t.stats.resolvedToday,
      subtext: t.stats.actionCompleted,
      icon: CheckCircle2,
      numberColor: "text-emerald-600",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      iconColor: "text-emerald-600 bg-emerald-50",
      borderColor: "border-emerald-500/20",
    },
    {
      value: "22",
      title: t.stats.underInvestigation,
      subtext: t.stats.officerAssigned,
      icon: Clock,
      numberColor: "text-amber-600",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      iconColor: "text-amber-600 bg-amber-50",
      borderColor: "border-amber-500/20",
    },
    {
      value: "0",
      title: t.stats.overdueIssues,
      subtext: t.stats.withinDeadline,
      icon: ShieldCheck,
      numberColor: "text-purple-600",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      iconColor: "text-purple-600 bg-purple-50",
      borderColor: "border-purple-500/20",
    },
  ];

  return (
    <section className="py-6 px-4 sm:px-8 bg-slate-50/80 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-5 border ${stat.borderColor} shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${stat.iconColor} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${stat.badgeColor}`}
                  >
                    {stat.subtext}
                  </span>
                </div>

                <div>
                  <div
                    className={`text-3xl sm:text-4xl font-black ${stat.numberColor} tracking-tight`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                    {stat.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
