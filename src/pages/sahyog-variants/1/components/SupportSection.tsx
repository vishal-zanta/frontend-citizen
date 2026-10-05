import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { HeadsetIcon, PhoneIcon } from "./Icons";
import { content } from "./content";

const SupportSection = () => {
  const { t } = useLanguage();

  return (
    <section className="max-w-[1240px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-80px)] my-10 sm:my-14">
      <div className="bg-[#204e83] text-white rounded-xl p-7 sm:p-9 md:px-11 flex flex-wrap lg:flex-nowrap items-center gap-6 sm:gap-8 border-b-[5px] border-b-[#f57b18] shadow-lg relative overflow-hidden">
        {/* Symbol Icon */}
        <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border border-white/30 flex items-center justify-center shrink-0 ring-8 ring-white/5">
          <HeadsetIcon className="w-8 h-8 sm:w-12 sm:h-12 text-[#ffbc6b]" />
        </div>

        {/* Copy */}
        <div className="flex-1 min-w-[240px]">
          <span className="text-xs font-bold tracking-widest text-[#bcd5ed] uppercase block mb-1">
            {t(content.support.kicker.en, content.support.kicker.hi)}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {t(content.support.heading.en, content.support.heading.hi)}
          </h2>
          <p className="text-xs sm:text-sm text-[#d1e2f3] mt-1.5 font-medium">
            {t(content.support.subtext.en, content.support.subtext.hi)}
          </p>
        </div>

        {/* Call CTA Block */}
        <a
          href={`tel:${content.support.number}`}
          className="w-full lg:w-auto lg:ml-auto flex flex-row lg:flex-col items-center justify-between lg:justify-center border-t lg:border-t-0 lg:border-l border-white/20 pt-4 lg:pt-0 lg:pl-12 min-w-[200px] group transition-transform duration-200 hover:scale-105"
        >
          <div className="text-left lg:text-center">
            <span className="text-xs tracking-wider text-[#d0e2f2] font-semibold block uppercase">
              {t(content.support.tollFreeBadge.en, content.support.tollFreeBadge.hi)}
            </span>
            <b className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#ffbc6b] tracking-tight block leading-none my-1">
              {content.support.number}
            </b>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-full group-hover:bg-[#ffb757] group-hover:text-[#10365e] transition-colors">
            <PhoneIcon className="w-3.5 h-3.5 text-[#ffbc6b] group-hover:text-[#10365e]" />
            <span>{t(content.support.callNow.en, content.support.callNow.hi)}</span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default SupportSection;
