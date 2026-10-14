import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FileIcon, CheckIcon } from "./Icons";
import { content } from "./content";

const ImpactSection = () => {
  const { t } = useLanguage();

  return (
    <section
      aria-label={t("Complaint statistics", "शिकायत के आंकड़े")}
      className="max-w-[1240px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 py-6 xs:py-7 sm:py-9 lg:py-12"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-6 lg:gap-8">
        {/* Intro */}
        <div className="max-w-xl">
          <span className="text-xs font-bold tracking-widest text-[#204e83] uppercase block mb-1 xs:mb-1.5">
            {t(content.impact.kicker.en, content.impact.kicker.hi)}
          </span>
          <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-[#162f47] leading-tight">
            {t(content.impact.heading.en, content.impact.heading.hi)}
          </h2>
        </div>

        {/* Registered & Resolved Statistics */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex items-center gap-3.5 xs:gap-5 sm:gap-8 pt-3 xs:pt-4 lg:pt-0 border-t border-[#dce5ed]/60 lg:border-t-0 shrink-0">
          {/* Total Registered Complaints */}
          <div className="flex items-center gap-3.5 xs:gap-4 p-3 xs:p-2.5 sm:p-0 bg-[#f7fafc] xs:bg-transparent rounded-md xs:rounded-none border border-[#e2e7e9] xs:border-none sm:border-l sm:border-[#dce5ed] sm:pl-6 lg:pl-7">
            <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-full bg-[#edf3fb] text-[#204e83] flex items-center justify-center shrink-0">
              <FileIcon className="w-5 xs:w-6 h-5 xs:h-6" />
            </div>
            <div>
              <b className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#162f47] block tracking-tight leading-none mb-1">
                {content.impact.registeredCount}
              </b>
              <span className="text-xs sm:text-[13px] text-[#647587] font-medium block">
                {t(content.impact.registeredLabel.en, content.impact.registeredLabel.hi)}
              </span>
            </div>
          </div>

          {/* Total Resolved Complaints */}
          <div className="flex items-center gap-3.5 xs:gap-4 p-3 xs:p-2.5 sm:p-0 bg-[#f7fafc] xs:bg-transparent rounded-md xs:rounded-none border border-[#e2e7e9] xs:border-none sm:border-l sm:border-[#dce5ed] sm:pl-6 lg:pl-7">
            <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-full bg-[#e8f6f0] text-[#078374] flex items-center justify-center shrink-0">
              <CheckIcon className="w-5 xs:w-6 h-5 xs:h-6" />
            </div>
            <div>
              <b className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#078374] block tracking-tight leading-none mb-1">
                {content.impact.resolvedCount}
              </b>
              <span className="text-xs sm:text-[13px] text-[#647587] font-medium block">
                {t(content.impact.resolvedLabel.en, content.impact.resolvedLabel.hi)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
