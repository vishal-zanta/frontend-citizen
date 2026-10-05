import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "./content";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section className="max-w-[1240px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-80px)] py-10 sm:py-12 border-t border-[#dce5ed]/70">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2.7fr] gap-4 sm:gap-9 items-start">
        <span className="text-xs font-bold tracking-widest text-[#204e83] uppercase block md:mt-1">
          {t(content.about.kicker.en, content.about.kicker.hi)}
        </span>
        <p className="text-sm sm:text-base text-[#647587] leading-[1.85] font-normal m-0">
          {t(content.about.text.en, content.about.text.hi)}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
