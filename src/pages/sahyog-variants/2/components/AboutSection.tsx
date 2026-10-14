import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import biharLandscape from "@/assets/sahyog-variants/2/bihar-landscape.png";

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="max-w-[1280px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 py-8 xs:py-10 sm:py-16 grid grid-cols-1 md:grid-cols-[30%_70%] items-center gap-6 sm:gap-8 lg:gap-12">
      {/* Arch-shaped illustration banner */}
      <div
        className="h-28 xs:h-36 sm:h-48 max-w-[260px] xs:max-w-xs md:max-w-none w-full mx-auto md:mx-0 rounded-t-full rounded-b-md bg-cover overflow-hidden shadow-xs"
        style={{
          backgroundImage: `url(${biharLandscape})`,
          backgroundPosition: "0 63%",
        }}
        aria-hidden="true"
      />

      {/* Copy */}
      <div className="md:pr-10 text-center md:text-left">
        <span className="text-xs font-bold tracking-widest text-[#255784] uppercase block mb-2 xs:mb-3">
          {t("CONNECTED TO EVERY CITIZEN", "हर नागरिक से जुड़ा सहयोग")}
        </span>
        <p className="text-xs xs:text-sm sm:text-base lg:text-[17px] text-[#647684] leading-relaxed sm:leading-loose">
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
