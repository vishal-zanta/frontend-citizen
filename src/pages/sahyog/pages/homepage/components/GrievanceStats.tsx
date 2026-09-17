import React from "react";
import { useNavigate } from "react-router-dom";
import { Monitor, ClipboardCheck, LineChart, FilePenLine } from "lucide-react";
import { useSahyogTranslation } from "../../../translations";

export default function GrievanceStats() {
  const { t } = useSahyogTranslation();
  const navigate = useNavigate();

  const handleAction = (action?: string) => {
    if (action === "track") {
      navigate("/complaint");
    } else if (action === "register") {
      navigate("/login", { state: { to: "/citizen/raise" } });
    }
  };

  const cards = [
    {
      id: "lodged",
      title: t.stats.totalLodged,
      value: "1126",
      icon: Monitor,
      iconColor: "text-[#6C4FC7]",
      bgIcon: "bg-[#F1EBFE]",
      isAction: false,
    },
    {
      id: "resolved",
      title: t.stats.totalResolved,
      value: "516",
      icon: ClipboardCheck,
      iconColor: "text-[#67B10D]",
      bgIcon: "bg-[#EAF7D8]",
      isAction: false,
    },
    {
      id: "status",
      title: t.stats.grievanceStatus,
      value: null,
      icon: LineChart,
      iconColor: "text-white",
      bgIcon: "bg-[#D32F2F]",
      isAction: true,
      actionType: "track",
    },
    {
      id: "register",
      title: t.stats.registerGrievance,
      value: null,
      icon: FilePenLine,
      iconColor: "text-white",
      bgIcon: "bg-[#F16521]",
      isAction: true,
      actionType: "register",
    },
  ];

  return (
    <section className="py-8 px-4 sm:px-8 bg-slate-50/50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={
                  card.isAction
                    ? () => handleAction(card.actionType)
                    : undefined
                }
                className={`bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[210px] ${
                  card.isAction
                    ? "cursor-pointer hover:-translate-y-1 group"
                    : ""
                }`}
              >
                {/* Top Icon Container */}
                <div
                  className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl ${card.bgIcon} flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 ${
                    card.isAction ? "group-hover:scale-105" : ""
                  }`}
                >
                  <Icon
                    className={`w-9 h-9 sm:w-10 sm:h-10 ${card.iconColor} stroke-[2]`}
                  />
                </div>

                {/* Middle Title */}
                <div className="my-auto py-2">
                  <span className="text-slate-800 font-medium text-sm sm:text-[15px] leading-snug capitalize">
                    {card.title}
                  </span>
                </div>

                {/* Bottom Value / Spacer */}
                <div className="min-h-[2rem] flex items-center justify-center">
                  {card.value ? (
                    <span className="font-extrabold text-xl sm:text-2xl text-slate-950 tracking-tight">
                      {card.value}
                    </span>
                  ) : (
                    <div className="h-6" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
