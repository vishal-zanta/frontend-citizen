import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import golgharHeritage from "@/assets/sahyog-variants/2/variation-2/golghar-heritage.png";

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      className="relative max-w-[1280px] mx-auto min-h-[460px] lg:min-h-[470px] my-10 sm:my-16 p-6 sm:p-10 lg:p-14 rounded-[8px] bg-[#103650] border-b-[4px] border-[#f77b10] flex items-end sm:items-center justify-end overflow-hidden isolate shadow-lg"
      id="bihar-culture"
    >
      {/* Heritage Photo */}
      <img
        className="absolute inset-0 -z-2 w-full sm:w-[80%] lg:w-[72%] h-[260px] sm:h-full object-cover object-[center_52%] pointer-events-none"
        src={golgharHeritage}
        alt={t(
          "Golghar, Patna, Bihar — historic heritage amidst green park",
          "गोलघर, पटना, बिहार — हरे उद्यान के बीच ऐतिहासिक धरोहर",
        )}
        loading="lazy"
        width="1024"
        height="768"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, #000 66%, transparent 100%)",
          maskImage: "linear-gradient(90deg, #000 66%, transparent 100%)",
        }}
      />

      {/* Ambient gradient overlay */}
      <div
        className="absolute inset-0 -z-1 pointer-events-none hidden sm:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(9,40,63,0) 15%, rgba(9,40,63,0.3) 40%, rgba(9,40,63,0.92) 67%, rgba(9,40,63,0.98) 100%)",
        }}
      />
      <div
        className="absolute inset-0 -z-1 pointer-events-none block sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,40,63,0) 0%, rgba(9,40,63,0.2) 25%, rgba(9,40,63,0.7) 45%, rgba(9,40,63,0.96) 60%, #09283f 100%)",
        }}
      />

      {/* Copy block */}
      <div className="w-full sm:w-[56%] lg:w-[50%] pt-[200px] sm:pt-0 pl-4 sm:pl-7 lg:pl-8 border-l-2 sm:border-l-[3px] border-[#ffad4e] relative z-10">
        <span className="text-xs sm:text-sm font-black text-[#ffc577] tracking-[0.09em] uppercase mb-3 sm:mb-5 block">
          {t("CONNECTED TO EVERY CITIZEN", "हर नागरिक से जुड़ा सहयोग")}
        </span>
        <p className="text-base sm:text-xl lg:text-[23px] text-white font-medium leading-[1.8] sm:leading-[1.9] drop-shadow-sm">
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
