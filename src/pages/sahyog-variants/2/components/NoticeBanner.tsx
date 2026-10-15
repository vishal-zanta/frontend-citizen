import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const NoticeBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#efe8d9] border-t border-b border-[#ded7c8]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-3.5 flex items-start sm:items-center gap-3 sm:gap-6 text-xs text-[#60717a]">
        <b className="font-bold tracking-widest text-[#a95316] pr-3 sm:pr-6 border-r border-[#c8bda9] whitespace-nowrap text-xs shrink-0 mt-0.5 sm:mt-0">
          {t("NOTICE", "सूचना")}
        </b>
        <p className="leading-relaxed text-xs text-[#60717a]">
          {t(
            "Bihar Sahyog Portal and toll-free helpline 1100 are available 24×7. Register your complaint online or track its status.",
            "बिहार सहयोग पोर्टल एवं हेल्पलाइन 1100 (टोल-फ्री) नागरिकों की सेवा में 24×7 उपलब्ध है। अपनी शिकायत ऑनलाइन दर्ज करें अथवा स्थिति ट्रैक करें।",
          )}
        </p>
      </div>
    </div>
  );
};

export default NoticeBanner;
