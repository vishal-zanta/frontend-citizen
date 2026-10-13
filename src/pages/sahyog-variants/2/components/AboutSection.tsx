import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import biharLandscape from "@/assets/sahyog-variants/2/bihar-landscape.png";

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16 grid grid-cols-1 md:grid-cols-[30%_70%] items-center gap-8 lg:gap-12">
      {/* Arch-shaped illustration banner */}
      <div
        className="h-44 sm:h-48 rounded-t-full rounded-b-md bg-cover overflow-hidden shadow-xs"
        style={{
          backgroundImage: `url(${biharLandscape})`,
          backgroundPosition: "0 63%",
        }}
        aria-hidden="true"
      />

      {/* Copy */}
      <div className="md:pr-10">
        <span className="text-xs font-bold tracking-widest text-[#255784] uppercase block mb-3">
          {t("CONNECTED TO EVERY CITIZEN", "हर नागरिक से जुड़ा सहयोग")}
        </span>
        <p className="text-base sm:text-[17px] text-[#647684] leading-loose">
          {t(
            "Bihar Sahyog Helpline is a transparent and time-bound digital medium of the Government of Bihar, connecting citizens directly with the relevant departments to resolve their problems.",
            "बिहार सहयोग हेल्पलाइन बिहार सरकार का एक पारदर्शी एवं समयबद्ध डिजिटल माध्यम है, जो नागरिकों को उनकी समस्याओं के समाधान हेतु सीधे संबंधित विभागों से जोड़ता है।",
          )}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
