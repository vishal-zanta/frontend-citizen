import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import LangSelector from "@/components/LangSelector";
import { PhoneIcon } from "./Icons";

const UtilityBar: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#113859] text-[#eef4fa] text-xs tracking-wider border-b border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 min-h-[37px] flex items-center justify-between gap-3 sm:gap-6 py-1 sm:py-0">
        <span className="font-medium text-xs truncate">
          {t(
            "Government of Bihar · Citizen services",
            "बिहार सरकार · नागरिक सेवाएं",
          )}
        </span>
        <div className="flex items-center gap-3 sm:gap-6 shrink-0 ml-auto">
          <a
            href="tel:1100"
            className="flex items-center gap-1.5 font-bold hover:text-[#f77b10] transition-colors text-xs text-[#eef4fa]"
          >
            <PhoneIcon className="w-3.5 h-3.5 text-[#ffb561]" />
            <span>1100</span>
          </a>
          <span className="hidden sm:inline-block text-[#c7d7e5] text-xs">
            {t("24×7 / 365 days available", "24×7 / 365 दिन उपलब्ध")}
          </span>
          <div className="border-l border-white/20 pl-3 sm:pl-5">
            <LangSelector
              className="bg-transparent border-white/20 text-white hover:bg-white/10 text-xs py-1"
              selectClassname="text-white text-xs"
              globeClassname="text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
