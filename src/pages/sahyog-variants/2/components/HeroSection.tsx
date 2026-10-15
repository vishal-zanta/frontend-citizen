import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import biharDevelopment from "@/assets/sahyog-variants/2/variation-2/bihar-development.png";
import leaderCutout from "@/assets/sahyog-variants/2/leader-cutout.png";
import { FileIcon, PhoneIcon, HeadsetIcon } from "./Icons";

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      className="relative bg-[#092641] text-white border-b-[5px] border-[#f77b10] overflow-hidden"
      id="hero-banner"
    >
      {/* ── Background Gallery Layer (Scene + Gradients + Cutout + Signature) ── */}
      <div className="absolute inset-0 bg-[#123e5d] overflow-hidden">
        {/* Bihar Scene background */}
        <img
          className="w-full h-full object-cover object-center md:object-[25%_center]"
          src={biharDevelopment}
          alt={t(
            "Bihar development vision: infrastructure, green fields and civic buildings",
            "बिहार के विकास की संकल्पना: सड़कें, हरित खेत और नागरिक भवन",
          )}
          fetchPriority="high"
        />

        {/* Ambient Gradient overlay - desktop/tablet (horizontal) and mobile (vertical) */}
        <div
          className="absolute inset-0 z-1 pointer-events-none hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(6,31,56,0.95) 0%, rgba(8,38,64,0.85) 34%, rgba(9,44,73,0.45) 58%, transparent 75%)",
          }}
        />
        <div
          className="absolute inset-0 z-1 pointer-events-none block md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,36,60,0.97) 0%, rgba(8,36,60,0.92) 42%, rgba(8,36,60,0.3) 70%, transparent 100%)",
          }}
        />

        {/* Leader Portrait Cutout */}
        <img
          className="absolute z-2 bottom-0 right-0 sm:right-[1%] md:right-[-1%] w-[85%] sm:w-[65%] md:w-[54%] lg:w-[53%] h-[370px] sm:h-[450px] md:h-[94%] lg:h-[99%] object-contain object-bottom pointer-events-none drop-shadow-[-18px_5px_20px_rgba(9,38,65,0.35)]"
          src={leaderCutout}
          alt={t("Leader greeting citizens", "नमस्ते करते नेता")}
          fetchPriority="high"
        />

        {/* Hero Signature Commitment Card */}
        <div className="absolute z-10 bottom-4 sm:bottom-6 right-3 sm:right-6 lg:right-[3%] bg-[#103655]/95 backdrop-blur-xs border border-white/20 border-l-[3px] border-l-[#f77b10] rounded-[3px] px-4 sm:px-6 py-3 sm:py-4 shadow-2xl flex items-center justify-between gap-3 sm:gap-5 text-white max-w-[calc(100%-24px)] min-w-[270px] sm:min-w-[310px]">
          <span className="text-xs text-[#d5e4ee] font-medium leading-tight">
            {t("PUBLIC SERVICE. OUR COMMITMENT.", "जनसेवा। हमारा संकल्प।")}
          </span>
          <strong className="flex items-center gap-2 sm:gap-3 font-bold text-xl sm:text-2xl lg:text-[29px] leading-tight shrink-0 text-white">
            24×7
            <small className="text-xs font-medium max-w-[80px] leading-tight text-[#d5e4ee] block">
              {t("Citizen support", "नागरिक सहायता")}
            </small>
          </strong>
        </div>
      </div>

      {/* ── Hero Copy Content (Left Side) ── */}
      <div className="relative z-10 max-w-[1600px] mx-auto min-h-[640px] lg:min-h-[690px] xl:min-h-[740px] flex flex-col justify-center pb-[360px] sm:pb-[420px] md:pb-16 lg:pb-20">
        <div className="w-full md:w-[62%] lg:w-[57%] max-w-[960px] px-4 sm:px-8 lg:px-12 py-10 sm:py-16 lg:py-20">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="w-7 h-[3px] bg-[#f77b10] shrink-0" />
            <span className="text-xs font-bold tracking-[0.13em] text-[#d9e8f4] uppercase">
              {t("BIHAR SAHYOG HELPLINE", "बिहार सहयोग हेल्पलाइन")}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] font-extrabold leading-[1.3] sm:leading-[1.36] lg:leading-[1.42] tracking-tight drop-shadow-sm text-white">
            {t(
              "For every citizen.",
              "हर नागरिक के लिए।",
            )}
            <br />
            {t(
              "A helping hand,",
              "सिर्फ एक कॉल पर",
            )}
            <br />
            <em className="text-[#ffbc61] not-italic whitespace-normal sm:whitespace-nowrap">
              {t(
                "just one call away.",
                "सहायता और सहयोग।",
              )}
            </em>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base lg:text-[17px] text-[#e0eaf2] mt-4 sm:mt-6 font-normal max-w-xl leading-relaxed">
            {t(
              "Register your complaint. Know the status of its resolution.",
              "शिकायत दर्ज करें, समाधान की स्थिति जानें।",
            )}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2.5 bg-[#df6807] hover:bg-[#c65b04] text-white px-5 sm:px-6 py-3 sm:py-3.5 min-h-[48px] sm:min-h-[54px] rounded-[3px] font-bold text-xs sm:text-sm shadow-md transition-all hover:-translate-y-0.5"
            >
              <FileIcon className="w-5 h-5" />
              <span>{t("Register a complaint", "शिकायत दर्ज करें")}</span>
            </Link>

            <a
              href="tel:1100"
              className="flex items-center gap-2.5 sm:gap-3 text-white group cursor-pointer"
            >
              <PhoneIcon className="w-6 sm:w-7 h-6 sm:h-7 text-[#ffbc61] shrink-0 group-hover:scale-110 transition-transform" />
              <span>
                <small className="block text-xs font-semibold uppercase tracking-wider text-[#d5e4ee]">
                  {t("TOLL-FREE HELPLINE", "टोल-फ्री हेल्पलाइन")}
                </small>
                <b className="block text-2xl sm:text-3xl lg:text-[34px] font-bold leading-none text-white tracking-tight">
                  1100
                </b>
              </span>
            </a>
          </div>

          {/* Hero Assurance */}
          <div className="flex items-center gap-2.5 text-xs text-[#e0eaf2] mt-6 sm:mt-7 font-medium">
            <HeadsetIcon className="w-4.5 h-4.5 text-[#ffbc61] shrink-0" />
            <span>
              {t(
                "At your service. 24 hours, every day.",
                "आपकी सेवा में। 24 घंटे, हर दिन।",
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
