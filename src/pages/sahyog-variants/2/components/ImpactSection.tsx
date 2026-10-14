import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FileIcon, CheckIcon } from "./Icons";

const ImpactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      className="max-w-[1280px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 py-6 xs:py-7 sm:py-9 lg:py-12"
      aria-label={t("Complaint statistics", "शिकायत के आंकड़े")}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-6 lg:gap-8">
        {/* Intro */}
        <div>
          <span className="text-xs font-bold tracking-widest text-[#647684] uppercase block mb-1 xs:mb-1.5">
            {t("Your Problem, Our Solution", "आपकी समस्या, हमारा समाधान")}
          </span>
          <h2 className="text-lg xs:text-xl sm:text-2xl font-extrabold text-[#14344c] leading-tight">
            {t("Bihar Sahyog, With You at Every Step.", "बिहार सहयोग, हर कदम आपके साथ।")}
          </h2>
        </div>

        {/* Registered & Resolved Statistics */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex items-center gap-3.5 xs:gap-5 sm:gap-8 pt-3 xs:pt-4 lg:pt-0 border-t border-[#d8dedf]/60 lg:border-t-0 shrink-0">
          {/* Registered */}
          <div className="flex items-center gap-3.5 xs:gap-4 p-3 xs:p-2.5 sm:p-0 bg-white/70 xs:bg-transparent rounded-md xs:rounded-none border border-[#e2e7e9] xs:border-none lg:border-l lg:border-[#d8dedf] lg:pl-7">
            <span className="w-10 h-10 xs:w-11 xs:h-11 rounded-full bg-[#e7edf2] text-[#255784] flex items-center justify-center shrink-0">
              <FileIcon className="w-4.5 xs:w-5 h-4.5 xs:h-5" />
            </span>
            <div>
              <b className="text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#14344c] leading-tight block">
                1,126
              </b>
              <span className="block text-xs text-[#647684] mt-0.5 xs:mt-1">
                {t("Total registered complaints", "कुल पंजीकृत शिकायतें")}
              </span>
            </div>
          </div>

          {/* Resolved */}
          <div className="flex items-center gap-3.5 xs:gap-4 p-3 xs:p-2.5 sm:p-0 bg-white/70 xs:bg-transparent rounded-md xs:rounded-none border border-[#e2e7e9] xs:border-none lg:border-l lg:border-[#d8dedf] lg:pl-7">
            <span className="w-10 h-10 xs:w-11 xs:h-11 rounded-full bg-[#e1ede8] text-[#008878] flex items-center justify-center shrink-0">
              <CheckIcon className="w-4.5 xs:w-5 h-4.5 xs:h-5" />
            </span>
            <div>
              <b className="text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#008878] leading-tight block">
                516
              </b>
              <span className="block text-xs text-[#647684] mt-0.5 xs:mt-1">
                {t("Total resolved complaints", "कुल निराकृत शिकायतें")}
              </span>
            </div>
          </div>
        </div>

        {/* Mini Chart */}
        {/* <div className="flex items-center gap-3">
          <div
            className="relative shrink-0 w-14 h-14 sm:w-[67px] sm:h-[67px] rounded-full flex items-center justify-center"
            style={{
              background: "conic-gradient(#008878 0% 45.83%, #dee6e4 45.83%)",
            }}
          >
            <div className="absolute inset-2 bg-[#faf7ee] rounded-full flex items-center justify-center">
              <CheckIcon className="w-5 h-5 text-[#008878]" />
            </div>
          </div>
          <span className="text-xs text-[#647684] leading-relaxed max-w-[120px]">
            {t("Figures from the reference page", "संदर्भ पृष्ठ के अनुसार आंकड़े")}
          </span>
        </div> */}
      </div>
    </section>
  );
};

export default ImpactSection;
