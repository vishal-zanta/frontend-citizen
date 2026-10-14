import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import LangSelector from "@/components/LangSelector";
import { PhoneIcon } from "./Icons";

const UtilityBar: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#113859] text-[#eef4fa] text-xs tracking-wider border-b border-white/10">
      <div className="max-w-[1280px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 min-h-[34px] xs:min-h-[37px] flex items-center justify-between gap-2 xs:gap-4 py-1 xs:py-0">
        <span className="font-medium text-xs truncate max-w-[155px] xs:max-w-none">
          {t(
            "Government of Bihar · Citizen services",
            "बिहार सरकार · नागरिक सेवाएं",
          )}
        </span>
        <div className="flex items-center gap-2.5 xs:gap-4 sm:gap-6 ml-auto shrink-0">
          <a
            href="tel:1100"
            className="flex items-center gap-1 xs:gap-1.5 font-bold hover:text-[#ffb561] transition-colors text-xs"
          >
            <PhoneIcon className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-[#ffb561]" />
            <span>1100</span>
          </a>
          <span className="hidden sm:inline-block text-[#c7d7e5] text-xs">
            {t("24×7 / 365 days available", "24×7 / 365 दिन उपलब्ध")}
          </span>
          <div className="scale-[0.82] xs:scale-90 origin-right">
            <LangSelector
              className="bg-transparent text-white border-white/20 hover:bg-white/10"
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
