import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import LangSelector from "@/components/LangSelector";
import { PhoneIcon } from "./Icons";
import { content } from "./content";

const UtilityBar = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#10365e] text-[#e4eef9] text-xs tracking-wider border-b border-[#ffffff14]">
      <div className="max-w-[1240px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-80px)] py-1.5 flex flex-wrap items-center justify-between gap-3">
        <span className="font-medium text-[11px] sm:text-xs">
          {t(content.utility.stateService.en, content.utility.stateService.hi)}
        </span>
        <div className="flex items-center gap-3 sm:gap-6 ml-auto">
          <a
            href={`tel:${content.utility.helplineNumber}`}
            className="flex items-center gap-1.5 font-bold hover:text-[#ffb757] transition-colors"
            aria-label="Toll-free 1100"
          >
            <PhoneIcon className="w-3.5 h-3.5 text-[#ffb757]" />
            <span>{content.utility.helplineNumber}</span>
          </a>
          <span className="hidden sm:inline-block text-[#bcd5ed] text-[11px]">
            {t(content.utility.hours.en, content.utility.hours.hi)}
          </span>
          <div className="scale-90 origin-right">
            <LangSelector className="bg-transparent text-white" selectClassname="text-white" globeClassname="text-white"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
