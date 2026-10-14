import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { HeadsetIcon, PhoneIcon } from "./Icons";

const SupportSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="max-w-[1280px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 mb-8 xs:mb-10 sm:mb-16">
      <div className="relative grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-5 xs:gap-6 sm:gap-8 items-center p-4.5 xs:p-6 sm:p-10 md:p-12 lg:p-14 bg-[#113859] text-white rounded-md overflow-hidden border-b-4 xs:border-b-5 border-[#f77b10] shadow-md">
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
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white mb-1 xs:mb-1.5 leading-tight">
            {t("One call. A helping hand.", "सिर्फ एक कॉल पर सहायता।")}
          </h2>
          <p className="text-xs sm:text-[13px] text-[#c7d7e5]">
            {t(
              "24×7 / 365 days · State Call Centre",
              "24×7 / 365 दिन · राज्य कॉल सेंटर",
            )}
          </p>
        </div>

        {/* Helpline Dial Action */}
        <a
          href="tel:1100"
          className="relative z-10 flex flex-col xs:flex-row md:flex-col items-stretch xs:items-center justify-between md:justify-center md:pl-8 lg:pl-10 md:border-l md:border-white/20 pt-4 md:pt-0 border-t md:border-t-0 border-white/15 group gap-2 xs:gap-4 md:gap-0"
        >
          <div className="flex xs:flex-col items-center justify-between xs:justify-start">
            <span className="text-xs text-[#d5e4ee] uppercase tracking-wider">
              {t("TOLL-FREE", "टोल-फ्री")}
            </span>
            <b className="text-3xl xs:text-4xl sm:text-5xl lg:text-[75px] font-bold text-[#ffb561] leading-none tracking-tight group-hover:scale-105 transition-transform my-0.5 sm:my-1">
              1100
            </b>
          </div>
          <span className="inline-flex items-center justify-center gap-2 px-3 py-1.5 xs:px-0 xs:py-0 bg-[#ffb561] xs:bg-transparent text-[#113859] xs:text-white rounded xs:rounded-none font-bold xs:font-normal text-xs mt-1 transition-colors">
            <PhoneIcon className="w-3.5 h-3.5 text-[#113859] xs:text-[#ffb561]" />
            <span>{t("Call now", "अभी कॉल करें")}</span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default SupportSection;
