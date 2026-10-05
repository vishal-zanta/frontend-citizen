import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "./content";

const NoticeBanner = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#fdf3e5] border-b border-[#f0e4d2]">
      <div className="max-w-[1240px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-80px)] py-3 sm:py-3.5 flex items-center gap-4">
        <span className="text-[#ad4d0b] font-bold text-xs sm:text-[13px] border-r border-[#e9c999] pr-4 shrink-0 tracking-wider">
          {t(content.notice.label.en, content.notice.label.hi)}
        </span>
        <p className="text-[#5e554a] text-xs sm:text-[13px] leading-relaxed m-0 font-medium">
          {t(content.notice.text.en, content.notice.text.hi)}
        </p>
      </div>
    </div>
  );
};

export default NoticeBanner;
