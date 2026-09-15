import React from "react";
import { Inbox, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { useSahyogTranslation } from "../../../translations";

export default function GrievanceStats() {
  const { t } = useSahyogTranslation();

  const stats = [
    {
      value: "187",
      title: t.stats.receivedToday,
      icon: Inbox,
      numberColor: "text-blue-700",
      iconColor: "text-blue-600 bg-blue-50",
      borderColor: "border-blue-500/20",
    },
    {
      value: "143",
      title: t.stats.resolvedToday,
      icon: CheckCircle2,
      numberColor: "text-emerald-600",
      iconColor: "text-emerald-600 bg-emerald-50",
      borderColor: "border-emerald-500/20",
    },
    {
      value: "22",
      title: t.stats.underInvestigation,
      icon: Clock,
      numberColor: "text-amber-600",
      iconColor: "text-amber-600 bg-amber-50",
      borderColor: "border-amber-500/20",
    },
  ];

  return (
    <section className="py-6 px-4 sm:px-8 bg-slate-50/80 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-5 border ${stat.borderColor} shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-4`}
              >
                <div className={`w-12 h-12 rounded-xl ${stat.iconColor} flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <div className={`text-2xl sm:text-3xl font-black ${stat.numberColor} tracking-tight`}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
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
