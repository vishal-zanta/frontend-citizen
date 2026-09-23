import React from "react";
import { Link } from "react-router-dom";
import {
  FilePenLine,
  LineChart,
  MessageSquareHeart,
  ArrowRight,
} from "lucide-react";

interface QuickActionsProps {
  t: (en: string, hi: string) => string;
}

export default function QuickActions({ t }: QuickActionsProps) {
  const actionCards = [
    {
      id: "register",
      to: "/citizen/raise",
      title: t("Register Complaint", "शिकायत पंजीकरण"),
      subtitle: t(
        "File your grievance online through our digital portal",
        "ऑनलाइन पोर्टल के माध्यम से अपनी नई शिकायत दर्ज करें"
      ),
      actionText: t("Register Complaint", "शिकायत दर्ज करें"),
      icon: FilePenLine,
      bgIcon: "bg-[#F16521]",
      borderColor: "hover:border-[#F16521]/50",
      btnColor: "bg-[#F16521] hover:bg-[#d95516] text-white",
    },
    {
      id: "status",
      to: "/citizen/track",
      title: t("Complaint Status", "शिकायत की स्थिति"),
      subtitle: t(
        "Track real-time progress and action taken status",
        "अपनी शिकायत संख्या दर्ज कर वर्तमान स्थिति और रिपोर्ट देखें"
      ),
      actionText: t("Check Status", "स्थिति देखें"),
      icon: LineChart,
      bgIcon: "bg-[#1C4D8D]",
      borderColor: "hover:border-[#1C4D8D]/50",
      btnColor: "bg-[#1C4D8D] hover:bg-[#153a6b] text-white",
    },
    {
      id: "feedback",
      to: "/citizen/feedback",
      title: t("Citizen Feedback", "नागरिक प्रतिक्रिया"),
      subtitle: t(
        "Share your satisfaction rating & feedback on resolution",
        "शिकायत समाधान के संबंध में अपनी प्रतिक्रिया और रेटिंग दें"
      ),
      actionText: t("Give Feedback", "प्रतिक्रिया दें"),
      icon: MessageSquareHeart,
      bgIcon: "bg-[#67B10D]",
      borderColor: "hover:border-[#67B10D]/50",
      btnColor: "bg-[#67B10D] hover:bg-[#57960b] text-white",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {actionCards.map((card) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.id}
            to={card.to}
            className={`group bg-white dark:bg-card rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-border shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 ${card.borderColor}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${card.bgIcon} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                </div>
                <span className="text-slate-300 dark:text-muted-foreground/40 group-hover:text-slate-500 font-bold text-sm transition-colors">
                  →
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-foreground group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-slate-600 dark:text-muted-foreground text-xs sm:text-sm mt-1.5 leading-relaxed">
                {card.subtitle}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-border/60 flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-2 font-semibold text-xs sm:text-sm px-3.5 py-1.5 rounded-xl transition-all shadow-xs ${card.btnColor}`}
              >
                <span>{card.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
