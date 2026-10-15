import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FileIcon, CheckIcon } from "./Icons";

const ImpactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12"
      aria-label={t("Complaint statistics", "शिकायत के आंकड़े")}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] items-center gap-6 sm:gap-8">
        {/* Intro */}
        <div className="sm:col-span-2 lg:col-span-1">
          <span className="text-xs font-bold tracking-widest text-[#647684] uppercase block mb-1.5 sm:mb-2">
            {t("SAHYOG AT A GLANCE", "एक नज़र में सहयोग")}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#14344c] leading-tight">
            {t("Every voice matters.", "हर आवाज़ महत्वपूर्ण है।")}
          </h2>
        </div>

        {/* Registered Metric */}
        <div className="flex items-center gap-4 lg:border-l lg:border-[#d8dedf] lg:pl-7">
          <span className="w-11 h-11 rounded-full bg-[#e7edf2] text-[#255784] flex items-center justify-center shrink-0">
            <FileIcon className="w-5 h-5" />
          </span>
          <div>
            <b className="text-3xl sm:text-4xl lg:text-[43px] font-bold tracking-tight text-[#14344c] leading-tight block">
              1,126
            </b>
            <span className="block text-xs text-[#647684] mt-1 font-medium">
              {t("Total registered complaints", "कुल पंजीकृत शिकायतें")}
            </span>
          </div>
        </div>

        {/* Resolved Metric */}
        <div className="flex items-center gap-4 lg:border-l lg:border-[#d8dedf] lg:pl-7">
          <span className="w-11 h-11 rounded-full bg-[#e1ede8] text-[#008878] flex items-center justify-center shrink-0">
            <CheckIcon className="w-5 h-5" />
          </span>
          <div>
            <b className="text-3xl sm:text-4xl lg:text-[43px] font-bold tracking-tight text-[#008878] leading-tight block">
              516
            </b>
            <span className="block text-xs text-[#647684] mt-1 font-medium">
              {t("Total resolved complaints", "कुल निराकृत शिकायतें")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
