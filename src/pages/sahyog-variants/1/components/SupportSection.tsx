import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { HeadsetIcon, PhoneIcon } from "./Icons";
import { content } from "./content";

const SupportSection = () => {
  const { t } = useLanguage();

  return (
    <section className="max-w-[1240px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 my-8 xs:my-10 sm:my-14">
      <div className="bg-[#204e83] text-white rounded-xl p-4.5 xs:p-6 sm:p-9 md:px-11 flex flex-wrap lg:flex-nowrap items-center gap-4.5 xs:gap-6 sm:gap-8 border-b-[5px] border-b-[#f57b18] shadow-lg relative overflow-hidden">
        {/* Symbol Icon */}
        <div className="w-13 h-13 xs:w-16 xs:h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border border-white/30 flex items-center justify-center shrink-0 ring-4 xs:ring-6 sm:ring-8 ring-white/5">
          <HeadsetIcon className="w-6.5 h-6.5 xs:w-8 xs:h-8 sm:w-12 sm:h-12 text-[#ffbc6b]" />
        </div>

        {/* Copy */}
        <div className="flex-1 min-w-0 xs:min-w-[220px]">
          <span className="text-xs font-bold tracking-widest text-[#bcd5ed] uppercase block mb-1">
            {t(content.support.kicker.en, content.support.kicker.hi)}
          </span>
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {t(content.support.heading.en, content.support.heading.hi)}
          </h2>
          <p className="text-xs sm:text-sm text-[#d1e2f3] mt-1 xs:mt-1.5 font-medium">
            {t(content.support.subtext.en, content.support.subtext.hi)}
          </p>
        </div>

        {/* Call CTA Block */}
        <a
          href={`tel:${content.support.number}`}
          className="w-full lg:w-auto lg:ml-auto flex flex-col xs:flex-row lg:flex-col items-stretch xs:items-center justify-between lg:justify-center border-t lg:border-t-0 lg:border-l border-white/20 pt-3.5 xs:pt-4 lg:pt-0 lg:pl-12 min-w-0 lg:min-w-[200px] group transition-transform duration-200 hover:scale-105 gap-2.5 xs:gap-4 lg:gap-0"
        >
          <div className="flex xs:block items-baseline justify-between xs:text-left lg:text-center">
            <span className="text-xs tracking-wider text-[#d0e2f2] font-semibold block uppercase">
              {t(content.support.tollFreeBadge.en, content.support.tollFreeBadge.hi)}
            </span>
            <b className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-[#ffbc6b] tracking-tight block leading-none my-0.5 sm:my-1">
              {content.support.number}
            </b>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-white bg-white/10 px-3.5 py-1.5 rounded-full group-hover:bg-[#ffb757] group-hover:text-[#10365e] transition-colors mt-1 xs:mt-0 lg:mt-2">
            <PhoneIcon className="w-3.5 h-3.5 text-[#ffbc6b] group-hover:text-[#10365e]" />
            <span>{t(content.support.callNow.en, content.support.callNow.hi)}</span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default SupportSection;
