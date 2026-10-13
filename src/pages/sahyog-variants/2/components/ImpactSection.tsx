import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FileIcon, CheckIcon } from "./Icons";

const ImpactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-9 sm:py-12"
      aria-label={t("Complaint statistics", "शिकायत के आंकड़े")}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_0.8fr] items-center gap-6 sm:gap-8">
        {/* Intro */}
        <div>
          <span className="text-[10px] font-bold tracking-widest text-[#647684] uppercase block mb-1.5">
            {t("SAHYOG AT A GLANCE", "एक नज़र में सहयोग")}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#14344c]">
            {t("Every voice matters.", "हर आवाज़ महत्वपूर्ण है।")}
          </h2>
        </div>

        {/* Registered */}
        <div className="flex items-center gap-4 lg:border-l lg:border-[#d8dedf] lg:pl-7">
          <span className="w-11 h-11 rounded-full bg-[#e7edf2] text-[#255784] flex items-center justify-center shrink-0">
            <FileIcon className="w-5 h-5" />
          </span>
          <div>
            <b className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14344c] leading-tight block">
              1,126
            </b>
            <span className="block text-xs text-[#647684] mt-1">
              {t("Total registered complaints", "कुल पंजीकृत शिकायतें")}
            </span>
          </div>
        </div>

        {/* Resolved */}
        <div className="flex items-center gap-4 lg:border-l lg:border-[#d8dedf] lg:pl-7">
          <span className="w-11 h-11 rounded-full bg-[#e1ede8] text-[#008878] flex items-center justify-center shrink-0">
            <CheckIcon className="w-5 h-5" />
          </span>
          <div>
            <b className="text-3xl sm:text-4xl font-bold tracking-tight text-[#008878] leading-tight block">
              516
            </b>
            <span className="block text-xs text-[#647684] mt-1">
              {t("Total resolved complaints", "कुल निराकृत शिकायतें")}
            </span>
          </div>
        </div>

        {/* Mini Chart */}
        <div className="flex items-center gap-3">
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
          <span className="text-[11px] text-[#647684] leading-relaxed max-w-[120px]">
            {t("Figures from the reference page", "संदर्भ पृष्ठ के अनुसार आंकड़े")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
