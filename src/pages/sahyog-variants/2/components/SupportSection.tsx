import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { HeadsetIcon, PhoneIcon } from "./Icons";

const SupportSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 mb-12 sm:mb-16">
      <div className="relative grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-6 sm:gap-8 items-center p-6 sm:p-10 lg:p-12 bg-[#113859] text-white rounded-[6px] overflow-hidden border-b-[5px] border-[#f77b10] shadow-md">
        {/* Decorative circle aura in the corner */}
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 w-[340px] h-[340px] rounded-full border border-white/10 pointer-events-none"
          style={{
            boxShadow:
              "0 0 0 25px rgba(255,255,255,0.03), 0 0 0 50px rgba(255,255,255,0.02), 0 0 0 75px rgba(255,255,255,0.015)",
          }}
        />

        {/* Headset Symbol (md+) */}
        <div className="hidden md:flex w-20 h-20 rounded-full border border-white/25 items-center justify-center text-[#ffba67] shrink-0">
          <HeadsetIcon className="w-10 h-10" />
        </div>

        {/* Copy */}
        <div className="relative z-10">
          <span className="text-xs font-bold tracking-widest text-[#bdcfdf] uppercase block mb-1">
            {t("BIHAR SAHYOG HELPLINE", "बिहार सहयोग हेल्पलाइन")}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-[34px] font-extrabold text-white mb-1.5 leading-tight">
            {t("One call. A helping hand.", "सिर्फ एक कॉल पर सहायता।")}
          </h2>
          <p className="text-xs sm:text-[13px] text-[#c7d7e5] font-normal">
            {t(
              "24×7 / 365 days · State Call Centre",
              "24×7 / 365 दिन · राज्य कॉल सेंटर",
            )}
          </p>
        </div>

        {/* Helpline Dial Action */}
        <a
          href="tel:1100"
          className="relative z-10 flex flex-col xs:flex-row md:flex-col items-start xs:items-center md:items-center justify-between md:justify-center md:pl-10 md:border-l md:border-white/20 pt-4 md:pt-0 border-t md:border-t-0 border-white/20 group gap-3 xs:gap-6 md:gap-1"
        >
          <span className="text-xs text-[#d5e4ee] uppercase tracking-wider font-medium">
            {t("TOLL-FREE", "टोल-फ्री")}
          </span>
          <b className="text-4xl sm:text-6xl lg:text-[83px] font-bold text-[#ffb561] leading-none tracking-tight group-hover:scale-105 transition-transform my-0.5 sm:my-1">
            1100
          </b>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-white transition-colors">
            <PhoneIcon className="w-3.5 h-3.5 text-[#ffb561]" />
            <span>{t("Call now", "अभी कॉल करें")}</span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default SupportSection;
