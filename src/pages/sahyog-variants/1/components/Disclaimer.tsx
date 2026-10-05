import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "./content";

const Disclaimer = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#f8fafc] border-t border-[#dce5ed]/60">
      <div className="max-w-[1240px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-80px)] py-5 pb-20 sm:pb-8 text-xs text-[#687789] leading-relaxed">
        <b className="font-bold text-[#162f47] mr-1.5">
          {t(content.disclaimer.title.en, content.disclaimer.title.hi)}
        </b>
        <span>{t(content.disclaimer.text.en, content.disclaimer.text.hi)}</span>
      </div>
    </div>
  );
};

export default Disclaimer;
