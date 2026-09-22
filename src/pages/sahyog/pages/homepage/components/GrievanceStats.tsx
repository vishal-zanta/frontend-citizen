import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Monitor,
  ClipboardCheck,
  FilePenLine,
  LineChart,
  MessageSquareHeart,
  ArrowRight,
} from "lucide-react";
import { useSahyogTranslation } from "../../../translations";

export default function GrievanceStats() {
  const { t, lang } = useSahyogTranslation();
  const navigate = useNavigate();

  const countCards = [
    {
      id: "lodged",
      title:
        t.stats.totalLodged ||
        (lang === "hi"
          ? "कुल पंजीकृत शिकायतें"
          : "Total Registered complaint"),
      value: "1,126",
      icon: Monitor,
      iconColor: "text-[#6C4FC7]",
      bgIcon: "bg-[#F1EBFE]",
      borderHover: "hover:border-[#6C4FC7]/40",
    },
    {
      id: "resolved",
      title:
        t.stats.totalResolved ||
        (lang === "hi"
          ? "कुल निराकृत शिकायतें"
          : "Total complaints resolved"),
      value: "516",
      icon: ClipboardCheck,
      iconColor: "text-[#67B10D]",
      bgIcon: "bg-[#EAF7D8]",
      borderHover: "hover:border-[#67B10D]/40",
    },
  ];

  const actionCards = [
    {
      id: "register",
      title: lang === "hi" ? "शिकायत पंजीकरण" : "Register Complaint",
      subtitle:
        lang === "hi"
          ? "ऑनलाइन पोर्टल के माध्यम से अपनी नई शिकायत दर्ज करें"
          : "File your grievance online through our digital portal",
      actionText: lang === "hi" ? "शिकायत दर्ज करें" : "Register Complaint",
      icon: FilePenLine,
      bgIcon: "bg-[#F16521]",
      borderColor: "hover:border-[#F16521]/50",
      btnColor: "bg-[#F16521] hover:bg-[#d95516] text-white",
      onClick: () => navigate("/login", { state: { to: "/citizen/raise" } }),
    },
    {
      id: "status",
      title: lang === "hi" ? "शिकायत की स्थिति" : "Complaint Status",
      subtitle:
        lang === "hi"
          ? "अपनी शिकायत संख्या दर्ज कर वर्तमान स्थिति और रिपोर्ट देखें"
          : "Track real-time progress and action taken status",
      actionText: lang === "hi" ? "स्थिति देखें" : "Check Status",
      icon: LineChart,
      bgIcon: "bg-[#1C4D8D]",
      borderColor: "hover:border-[#1C4D8D]/50",
      btnColor: "bg-[#1C4D8D] hover:bg-[#153a6b] text-white",
      onClick: () => navigate("/complaint"),
    },
    {
      id: "feedback",
      title: lang === "hi" ? "नागरिक प्रतिक्रिया" : "Citizen Feedback",
      subtitle:
        lang === "hi"
          ? "शिकायत समाधान के संबंध में अपनी प्रतिक्रिया और रेटिंग दें"
          : "Share your satisfaction rating & feedback on resolution",
      actionText: lang === "hi" ? "प्रतिक्रिया दें" : "Give Feedback",
      icon: MessageSquareHeart,
      bgIcon: "bg-[#67B10D]",
      borderColor: "hover:border-[#67B10D]/50",
      btnColor: "bg-[#67B10D] hover:bg-[#57960b] text-white",
      onClick: () => navigate("/login", { state: { to: "/citizen/feedback" } }),
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-8 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 1. Count Cards Grid Above */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {countCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-4 sm:gap-5 ${card.borderHover}`}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${card.bgIcon} flex items-center justify-center shrink-0 shadow-xs`}
                >
                  <Icon
                    className={`w-7 h-7 sm:w-8 sm:h-8 ${card.iconColor} stroke-[2.2]`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-slate-600 font-medium text-xs sm:text-[14px] leading-tight">
                    {card.title}
                  </div>
                  <div className="font-extrabold text-2xl sm:text-3xl text-slate-950 tracking-tight mt-1">
                    {card.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. 3 Action Navigation Cards Below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {actionCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={card.onClick}
                className={`group bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 ${card.borderColor}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${card.bgIcon} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
                    </div>
                    <span className="text-slate-300 group-hover:text-slate-500 font-bold text-sm transition-colors">
                      →
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    className={`inline-flex items-center gap-2 font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-xs ${card.btnColor}`}
                  >
                    <span>{card.actionText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

