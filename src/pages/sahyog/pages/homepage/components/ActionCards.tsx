import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSahyogTranslation } from "../../../translations";

const PhoneIcon = () => (
  <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.28-.28.37-.68.25-1.02A11.36 11.36 0 019 4.31c0-.55-.45-1-1-1H4.5c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-.99-.93z" />
  </svg>
);

const ClipboardSearchIcon = () => (
  <svg
    className="w-8 h-8 text-white"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect
      x="8"
      y="2"
      width="8"
      height="4"
      rx="1"
      ry="1"
      fill="white"
      stroke="white"
      strokeWidth="1"
    />
    <circle cx="11" cy="13.5" r="3" strokeWidth="2.2" />
    <path d="M13.2 15.7L17 19.5" strokeWidth="2.4" />
  </svg>
);

const CalendarSearchIcon = () => (
  <svg
    className="w-8 h-8 text-white"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="3" strokeWidth="2.2" />
    <line x1="3" y1="9" x2="21" y2="9" strokeWidth="2.2" />
    <line x1="8" y1="2" x2="8" y2="5" strokeWidth="2.4" />
    <line x1="16" y1="2" x2="16" y2="5" strokeWidth="2.4" />
    <circle cx="11" cy="14.5" r="2.8" strokeWidth="2.2" />
    <line x1="13.2" y1="16.7" x2="16.5" y2="20" strokeWidth="2.4" />
  </svg>
);

const FeedbackUsersIcon = () => (
  <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 18c0-3.3 2.7-6 6-6s6 2.7 6 6H3z" />
    <circle cx="17.5" cy="8.5" r="2.2" />
    <path d="M15.5 18c0-1.8 1.2-3.3 2.8-3.8 1.4.3 2.7 1.5 2.7 3.8h-5.5z" />
  </svg>
);

export default function ActionCards() {
  const { t } = useSahyogTranslation();
  const navigate = useNavigate();

  const cards = [
    {
      id: "01",
      title: t.actionCards.card1Title,
      description: t.actionCards.card1Desc,
      actionText: t.actionCards.card1Btn,
      to: "/citizen/raise",
      icon: PhoneIcon,
    },
    {
      id: "02",
      title: t.actionCards.card2Title,
      description: t.actionCards.card2Desc,
      actionText: t.actionCards.card2Btn,
      to: "/citizen/track",
      icon: ClipboardSearchIcon,
    },
    {
      id: "03",
      title: t.actionCards.card3Title,
      description: t.actionCards.card3Desc,
      actionText: t.actionCards.card3Btn,
      to: "/citizen/track",
      icon: CalendarSearchIcon,
    },
    {
      id: "04",
      title: t.actionCards.card4Title,
      description: t.actionCards.card4Desc,
      actionText: t.actionCards.card4Btn,
      to: "/citizen/feedback",
      icon: FeedbackUsersIcon,
    },
  ];

  const handleCardClick = (toPath: string) => {
    navigate("/login", { state: { to: toPath } });
  };

  return (
    <section className="py-16 px-4 sm:px-8 bg-[#FFF6EF] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1C4D8D] bg-blue-100 px-3.5 py-1 rounded-full">
            {t.actionCards.portalBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C4D8D] mt-2">
            {t.actionCards.heading}
          </h2>
          <div className="w-16 h-1 bg-[#C35504] mx-auto mt-2 rounded-full"></div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.to)}
                className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 cursor-pointer group flex flex-col justify-between overflow-hidden hover:-translate-y-2"
              >
                {/* Background Large Number Watermark */}
                <span className="absolute top-2 right-4 text-7xl font-extrabold text-slate-100 select-none group-hover:scale-110 group-hover:text-blue-50 transition-all duration-300">
                  {card.id}
                </span>

                <div className="relative z-10">
                  {/* Icon Header Box matching original Sahyog icon-box */}
                  <div className="w-16 h-16 rounded-2xl bg-[#C35504] text-white flex items-center justify-center mb-6 shadow-md shadow-orange-700/20 group-hover:bg-[#1C4D8D] transition-colors">
                    <IconComponent />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-[#C35504] group-hover:text-[#1C4D8D] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mt-2 font-normal">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <div className="relative z-10 pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C35504] group-hover:text-[#1C4D8D] transition-colors flex items-center gap-1.5">
                    <span>{card.actionText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#C35504] group-hover:bg-[#1C4D8D] transition-colors"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
