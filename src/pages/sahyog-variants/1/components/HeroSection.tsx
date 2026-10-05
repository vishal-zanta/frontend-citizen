import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { FileIcon, PhoneIcon, HeadsetIcon } from "./Icons";
import { content } from "./content";
import sahyogHeroV4 from "@/assets/sahyog-variants/1/sahyog-hero-v4.png";
import heroSecondV7 from "@/assets/sahyog-variants/1/hero-second-v7.png";

const HeroSection = () => {
  const { t } = useLanguage();

  const [activeVisual, setActiveVisual] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveVisual((prev) => (prev === 0 ? 1 : 0));
    }, 4500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  return (
    <section
      id="hero-banner"
      className="relative overflow-hidden bg-[#10365e] text-white border-b-4 border-[#f57b18] min-h-[540px] md:min-h-[580px] lg:min-h-[620px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-label="Bihar Sahyog Helpline Hero"
    >
      {/* Background Visual Layer 1 */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out pointer-events-none overflow-hidden ${
          activeVisual === 0 ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={activeVisual !== 0}
      >
        <img
          src={sahyogHeroV4}
          alt={t(
            "Bihar leadership greeting citizens",
            "बिहार के स्मारकों की पृष्ठभूमि में नमस्ते करते नेता"
          )}
          className="w-full h-full object-cover object-[65%_center] sm:object-[60%_center]"
        />
        {/* Shading gradient for readable typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#051d3e]/95 via-[#07244b]/80 md:via-[#0a2b4e]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041b39]/70 via-transparent to-transparent md:hidden" />
      </div>

      {/* Background Visual Layer 2 */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out pointer-events-none overflow-hidden bg-gradient-to-br from-[#74357c] to-[#b77791] ${
          activeVisual === 1 ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={activeVisual !== 1}
      >
        <img
          src={heroSecondV7}
          alt={t(
            "Bihar public address",
            "बिहार की पृष्ठभूमि के साथ जनसभा को संबोधित करते नेता"
          )}
          className="w-full h-full object-cover object-right"
        />
        {/* Shading gradient for Visual 2 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#091d3a]/95 via-[#0d2140]/85 md:via-[#142340]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b386c]/70 via-transparent to-transparent md:hidden" />
      </div>

      {/* Main Hero Copy Content */}
      <div className="relative z-10 max-w-[1240px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-80px)] py-12 md:py-16">
        <div className="max-w-[620px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-widest text-[#d0e0ef] uppercase mb-4 sm:mb-5">
            <span className="w-8 h-[2px] bg-[#ffb35b] inline-block" />
            <span>{t(content.hero.eyebrow.en, content.hero.eyebrow.hi)}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.25] tracking-tight drop-shadow-md">
            <span>{t(content.hero.titleLine1.en, content.hero.titleLine1.hi)}</span>
            <br />
            <span>{t(content.hero.titleLine2.en, content.hero.titleLine2.hi)}</span>
            <br />
            <em className="not-italic text-[#ffc06a]">
              {t(content.hero.titleLine3Highlight.en, content.hero.titleLine3Highlight.hi)}
            </em>
          </h1>

          {/* Paragraph */}
          <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-[#eef4fc] leading-relaxed max-w-[520px]">
            {t(content.hero.description.en, content.hero.description.hi)}
          </p>

          {/* Actions */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-5 sm:gap-7">
            {/* Register Complaint CTA */}
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-6 py-3 rounded-md font-bold text-base bg-[#f57b18] hover:bg-[#e06d12] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              <FileIcon className="w-5 h-5 text-white" />
              <span>{t(content.hero.registerBtn.en, content.hero.registerBtn.hi)}</span>
            </Link>

            {/* Helpline Call Button */}
            <a
              href={`tel:${content.hero.helplineNumber}`}
              className="flex items-center gap-3 group"
              aria-label="Toll-free 1100"
            >
              <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#ffb757]/20 group-hover:border-[#ffb757] transition-all">
                <PhoneIcon className="w-6 h-6 text-[#ffb757]" />
              </div>
              <div>
                <small className="block text-[11px] sm:text-xs font-semibold tracking-wider text-[#cfdeec] uppercase">
                  {t(content.hero.tollFreeLabel.en, content.hero.tollFreeLabel.hi)}
                </small>
                <b className="block text-2xl sm:text-3xl font-extrabold text-white leading-none tracking-wide group-hover:text-[#ffb757] transition-colors">
                  {content.hero.helplineNumber}
                </b>
              </div>
            </a>
          </div>

          {/* Hero Assurance */}
          <div className="mt-6 flex items-center gap-2.5 text-xs sm:text-sm text-[#dce9f5]">
            <HeadsetIcon className="w-4 h-4 text-[#ffb757]" />
            <span>{t(content.hero.assurance.en, content.hero.assurance.hi)}</span>
          </div>
        </div>
      </div>

      {/* Signature Badge (Bottom Right) */}
      <div className="absolute right-4 sm:right-8 bottom-4 md:bottom-6 z-20 hidden sm:flex items-center gap-4 bg-[#09294b]/85 backdrop-blur-md px-4 py-2.5 rounded-md border border-white/20 shadow-lg text-white">
        <span className="text-xs tracking-wider border-r border-white/30 pr-4 font-medium text-[#e4eef9]">
          {t(content.hero.commitment.en, content.hero.commitment.hi)}
        </span>
        <div className="flex items-center gap-2">
          <strong className="text-xl font-black text-[#ffc06a] leading-none">
            24×7
          </strong>
          <small className="text-[11px] font-medium text-white/90 leading-tight block">
            {t(content.hero.supportBadge.en, content.hero.supportBadge.hi)}
          </small>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
