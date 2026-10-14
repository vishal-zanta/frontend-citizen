import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import LangSelector from "@/components/LangSelector";
import { PhoneIcon } from "./Icons";
import { content } from "./content";

const UtilityBar = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#10365e] text-[#e4eef9] text-xs tracking-wider border-b border-[#ffffff14]">
      <div className="max-w-[1240px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 min-h-[34px] xs:min-h-[37px] flex items-center justify-between gap-2 xs:gap-4 py-1 xs:py-1.5">
        <span className="font-medium text-xs truncate max-w-[155px] xs:max-w-none">
          {t(content.utility.stateService.en, content.utility.stateService.hi)}
        </span>
        <div className="flex items-center gap-2.5 xs:gap-4 sm:gap-6 ml-auto shrink-0">
          <a
            href={`tel:${content.utility.helplineNumber}`}
            className="flex items-center gap-1 xs:gap-1.5 font-bold hover:text-[#ffb757] transition-colors text-xs"
            aria-label="Toll-free 1100"
          >
            <PhoneIcon className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-[#ffb757]" />
            <span>{content.utility.helplineNumber}</span>
          </a>
          <span className="hidden sm:inline-block text-[#bcd5ed] text-xs">
            {t(content.utility.hours.en, content.utility.hours.hi)}
          </span>
          <div className="scale-[0.82] xs:scale-90 origin-right">
            <LangSelector
              className="bg-transparent text-white"
              selectClassname="text-white"
              globeClassname="text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
