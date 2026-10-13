import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import biharDevelopment from "@/assets/sahyog-variants/2/bihar-development.png";
import leaderCutout from "@/assets/sahyog-variants/2/leader-cutout.png";
import { FileIcon, PhoneIcon, HeadsetIcon } from "./Icons";

const HeroSection: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <section
      className="relative bg-[#092641] text-white border-b-5 border-[#f77b10] overflow-hidden"
      id="hero-banner"
    >
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[690px]">
        {/* Background Gallery: Landscape + Overlays + Leader */}
        <div className="absolute inset-0 bg-[#123e5d] overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src={biharDevelopment}
            alt={t(
              "Bihar development vision: infrastructure, green fields and civic buildings",
              "बिहार के विकास की संकल्पना: सड़कें, हरित खेत और नागरिक भवन",
            )}
            fetchPriority="high"
          />

          {/* Desktop gradient overlay */}
          <div
            className="hidden sm:block absolute inset-0 z-1 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(6,31,56,0.95) 0%, rgba(8,38,64,0.8) 34%, rgba(9,44,73,0.5) 56%, transparent 75%)",
            }}
          />

          {/* Mobile gradient overlay */}
          <div
            className="sm:hidden absolute inset-0 z-1 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,36,60,0.96) 0%, rgba(8,36,60,0.92) 43%, rgba(8,36,60,0.4) 70%, transparent 100%)",
            }}
          />

          {/* Leader Portrait */}
          <img
            className="absolute z-2 bottom-0 right-[-10%] sm:right-[-1%] w-full sm:w-[58%] lg:w-[53%] h-[390px] sm:h-[94%] lg:h-[99%] object-contain object-bottom filter drop-shadow-[-18px_5px_20px_rgba(9,38,65,0.35)] pointer-events-none"
            src={leaderCutout}
            alt={t("Leader greeting citizens", "नमस्ते करते नेता")}
            fetchPriority="high"
          />

          {/* Hero Signature Commitment Card */}
          <div className="absolute z-10 bottom-3.5 sm:bottom-6 right-4 sm:right-[3%] bg-[#103655]/90 backdrop-blur-xs border border-white/20 border-l-4 border-l-[#f77b10] rounded px-4 sm:px-6 py-3 sm:py-4 shadow-xl flex items-center justify-between gap-4 sm:gap-5 text-white min-w-[270px] sm:min-w-[310px]">
            <span className="text-xs sm:text-[13px] text-[#d5e4ee]">
              {t("PUBLIC SERVICE. OUR COMMITMENT.", "जनसेवा। हमारा संकल्प।")}
            </span>
            <strong className="flex items-center gap-3 font-bold text-2xl sm:text-[29px] leading-tight">
              24×7{" "}
              <small className="text-[11px] font-medium max-w-[72px] leading-tight text-[#d5e4ee]">
                {t("Citizen support", "नागरिक सहायता")}
              </small>
            </strong>
          </div>
        </div>

        {/* Hero Copy (Text, Actions) */}
        <div className="relative z-20 w-full sm:w-[63%] lg:w-[57%] max-w-[960px] px-6 sm:px-8 lg:px-12 py-10 sm:py-16 lg:py-20 lg:pl-[max(48px,calc((100vw-1400px)/2))]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-xs font-bold tracking-widest text-[#d9e8f4] uppercase mb-5 sm:mb-6">
            <span className="w-7 h-[3px] bg-[#f77b10] inline-block" />
            <span>{t("BIHAR SAHYOG HELPLINE", "बिहार सहयोग हेल्पलाइन")}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-extrabold leading-[1.3] sm:leading-[1.4] tracking-tight drop-shadow-sm mb-5 sm:mb-6">
            {lang === "hi" ? (
              <>
                हर नागरिक के लिए।
                <br />
                सिर्फ एक कॉल पर
                <br />
                <em className="text-[#ffbc61] not-italic whitespace-nowrap">
                  सहायता और सहयोग।
                </em>
              </>
            ) : (
              <>
                For every citizen.
                <br />
                A helping hand,
                <br />
                <em className="text-[#ffbc61] not-italic whitespace-nowrap">
                  just one call away.
                </em>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#e0eaf2] max-w-xl mb-7 sm:mb-8 leading-relaxed">
            {t(
              "Register your complaint. Know the status of its resolution.",
              "शिकायत दर्ज करें, समाधान की स्थिति जानें।",
            )}
          </p>

          {/* CTA Actions */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-7 mb-7 sm:mb-8">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2.5 bg-[#df6807] hover:bg-[#d96000] text-white px-5 sm:px-6 py-3.5 sm:py-4 rounded font-bold text-sm sm:text-base shadow-md transition-all hover:-translate-y-0.5"
            >
              <FileIcon className="w-5 h-5" />
              <span>{t("Register a complaint", "शिकायत दर्ज करें")}</span>
            </Link>
            <a href="tel:1100" className="flex items-center gap-2.5 group">
              <PhoneIcon className="w-7 h-7 text-[#ffbc61] group-hover:scale-110 transition-transform" />
              <span>
                <small className="block text-[10px] tracking-wider text-[#d5e4ee] uppercase">
                  {t("TOLL-FREE HELPLINE", "टोल-फ्री हेल्पलाइन")}
                </small>
                <b className="block text-2xl sm:text-3xl font-bold leading-tight text-white">
                  1100
                </b>
              </span>
            </a>
          </div>

          {/* Assurance Tagline */}
          <div className="flex items-center gap-2.5 text-xs text-[#e0eaf2]">
            <HeadsetIcon className="w-4 h-4 text-[#ffbc61]" />
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
