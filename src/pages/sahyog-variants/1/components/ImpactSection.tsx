import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FileIcon, CheckIcon } from "./Icons";
import { content } from "./content";

const ImpactSection = () => {
  const { t } = useLanguage();

  return (
    <section
      aria-label={t("Complaint statistics", "शिकायत के आंकड़े")}
      className="max-w-[1240px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-80px)] py-8 sm:py-9"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] items-center gap-6 sm:gap-8">
        {/* Intro */}
        <div>
          <span className="text-xs font-bold tracking-widest text-[#204e83] uppercase block mb-1.5">
            {t(content.impact.kicker.en, content.impact.kicker.hi)}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-[#162f47] leading-tight">
            {t(content.impact.heading.en, content.impact.heading.hi)}
          </h2>
        </div>

        {/* Total Registered Complaints */}
        <div className="flex items-center gap-4 sm:border-l border-[#dce5ed] sm:pl-6">
          <div className="w-12 h-12 rounded-full bg-[#edf3fb] text-[#204e83] flex items-center justify-center shrink-0">
            <FileIcon className="w-6 h-6" />
          </div>
          <div>
            <b className="text-2xl sm:text-3xl font-extrabold text-[#162f47] block tracking-tight leading-none mb-1">
              {content.impact.registeredCount}
            </b>
            <span className="text-xs sm:text-[13px] text-[#647587] font-medium block">
              {t(content.impact.registeredLabel.en, content.impact.registeredLabel.hi)}
            </span>
          </div>
        </div>

        {/* Total Resolved Complaints */}
        <div className="flex items-center gap-4 sm:border-l border-[#dce5ed] sm:pl-6">
          <div className="w-12 h-12 rounded-full bg-[#e8f6f0] text-[#078374] flex items-center justify-center shrink-0">
            <CheckIcon className="w-6 h-6" />
          </div>
          <div>
            <b className="text-2xl sm:text-3xl font-extrabold text-[#078374] block tracking-tight leading-none mb-1">
              {content.impact.resolvedCount}
            </b>
            <span className="text-xs sm:text-[13px] text-[#647587] font-medium block">
              {t(content.impact.resolvedLabel.en, content.impact.resolvedLabel.hi)}
            </span>
          </div>
        </div>

        {/* Mini Chart */}
        {/* <div className="hidden lg:block sm:border-l border-[#dce5ed] sm:pl-6">
          <div className="w-full h-2.5 bg-[#e0eaf3] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#078374] rounded-full transition-all duration-700"
              style={{ width: "45.83%" }}
            />
          </div>
          <span className="text-xs text-[#647587] block mt-2 font-medium">
            {t(content.impact.chartNote.en, content.impact.chartNote.hi)}
          </span>
        </div> */}
      </div>
    </section>
  );
};

export default ImpactSection;
