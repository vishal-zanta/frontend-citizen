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
      {/* ── MOBILE TOP VISUAL BANNER (Only below sm: 0->xs, xs->sm) ── */}
      <div className="relative w-full h-[250px] xs:h-[290px] sm:hidden bg-[#0c2e4a] overflow-hidden">
        {/* Background development landscape (shown on the right side) */}
        <img
          className="absolute inset-0 w-full h-full object-cover object-right"
          src={biharDevelopment}
          alt={t(
            "Bihar development vision: infrastructure, green fields and civic buildings",
            "बिहार के विकास की संकल्पना: सड़कें, हरित खेत और नागरिक भवन",
          )}
          fetchPriority="high"
        />

        {/* Ambient gradient fade to blend with background on left and bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(9,38,65,0.92) 0%, rgba(9,38,65,0.6) 35%, rgba(9,38,65,0.15) 70%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#092641] to-transparent pointer-events-none" />

        {/* CM Image (shown first on the banner, never overlapped by text) */}
        <img
          className="absolute z-10 bottom-0 left-2 xs:left-6 h-full max-h-[96%] w-auto object-contain object-bottom drop-shadow-[-10px_6px_18px_rgba(0,0,0,0.65)] pointer-events-none"
          src={leaderCutout}
          alt={t("Leader greeting citizens", "नमस्ते करते नेता")}
          fetchPriority="high"
        />

        {/* Mobile Commitment Badge */}
        <div className="absolute z-20 bottom-3 right-3 bg-[#103655]/95 backdrop-blur-xs border border-white/20 border-l-4 border-l-[#f77b10] rounded px-2.5 xs:px-3.5 py-1.5 xs:py-2 shadow-xl flex items-center justify-between gap-2.5 text-white max-w-[200px] xs:max-w-[260px]">
          <span className="text-xs text-[#d5e4ee] leading-tight font-medium">
            {t("PUBLIC SERVICE.", "जनसेवा।")}
            <br />
            {t("OUR COMMITMENT.", "हमारा संकल्प।")}
          </span>
          <strong className="flex items-center gap-1 font-bold text-base xs:text-xl leading-tight shrink-0 text-[#ffbc61]">
            24×7
          </strong>
        </div>
      </div>

      {/* ── TABLET & DESKTOP BACKGROUND GALLERY (sm+: Looks like large screen) ── */}
      <div className="hidden sm:block absolute inset-0 bg-[#123e5d] overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          src={biharDevelopment}
          alt={t(
            "Bihar development vision: infrastructure, green fields and civic buildings",
            "बिहार के विकास की संकल्पना: सड़कें, हरित खेत और नागरिक भवन",
          )}
          fetchPriority="high"
        />

        {/* Desktop / Tablet gradient overlay */}
        <div
          className="absolute inset-0 z-1 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(6,31,56,0.95) 0%, rgba(8,38,64,0.8) 34%, rgba(9,44,73,0.5) 56%, transparent 75%)",
          }}
        />

        {/* Leader Portrait on right */}
        <img
          className="absolute z-2 bottom-0 right-[-3%] md:right-[-2%] lg:right-[-1%] w-[56%] md:w-[54%] lg:w-[53%] h-[92%] sm:h-[95%] lg:h-[99%] object-contain object-bottom filter drop-shadow-[-18px_5px_20px_rgba(9,38,65,0.35)] pointer-events-none"
          src={leaderCutout}
          alt={t("Leader greeting citizens", "नमस्ते करते नेता")}
          fetchPriority="high"
        />

        {/* Hero Signature Commitment Card */}
        <div className="absolute z-10 bottom-4 md:bottom-5 lg:bottom-6 right-[2%] sm:right-[3%] bg-[#103655]/90 backdrop-blur-xs border border-white/20 border-l-4 border-l-[#f77b10] rounded px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 lg:py-4 shadow-xl flex items-center justify-between gap-3 sm:gap-5 text-white min-w-[270px] sm:min-w-[290px] lg:min-w-[310px]">
          <span className="text-xs sm:text-[13px] text-[#d5e4ee]">
            {t("PUBLIC SERVICE. OUR COMMITMENT.", "जनसेवा। हमारा संकल्प।")}
          </span>
          <strong className="flex items-center gap-2 sm:gap-3 font-bold text-xl sm:text-2xl lg:text-[29px] leading-tight shrink-0">
            24×7{" "}
            <small className="text-xs font-medium max-w-[72px] leading-tight text-[#d5e4ee]">
              {t("Citizen support", "नागरिक सहायता")}
            </small>
          </strong>
        </div>
      </div>

      {/* ── HERO COPY: Text shown in bottom on mobile (< sm), and on left on sm+ ── */}
      <div className="relative z-20 w-full sm:w-[62%] md:w-[60%] lg:w-[57%] max-w-[960px] px-4 xs:px-6 sm:px-8 lg:px-12 py-6 xs:py-8 sm:py-16 lg:py-20 sm:min-h-[640px] lg:min-h-[690px] flex flex-col justify-center lg:pl-[max(48px,calc((100vw-1400px)/2))]">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 xs:gap-3 text-xs font-bold tracking-wider xs:tracking-widest text-[#d9e8f4] uppercase mb-3 xs:mb-4 sm:mb-6">
          <span className="w-5 xs:w-7 h-[3px] bg-[#f77b10] inline-block" />
          <span>{t("BIHAR SAHYOG HELPLINE", "बिहार सहयोग हेल्पलाइन")}</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-extrabold leading-[1.25] xs:leading-[1.3] sm:leading-[1.4] tracking-tight drop-shadow-sm mb-3.5 xs:mb-4 sm:mb-6">
          {lang === "hi" ? (
            <>
              हर नागरिक के लिए।
              <br />
              सिर्फ एक कॉल पर
              <br />
              <em className="text-[#ffbc61] not-italic whitespace-normal xs:whitespace-nowrap">
                सहायता और सहयोग।
              </em>
            </>
          ) : (
            <>
              For every citizen.
              <br />
              A helping hand,
              <br />
              <em className="text-[#ffbc61] not-italic whitespace-normal xs:whitespace-nowrap">
                just one call away.
              </em>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-sm xs:text-base sm:text-lg text-[#e0eaf2] max-w-xl mb-5 xs:mb-6 sm:mb-8 leading-relaxed">
          {t(
            "Register your complaint. Know the status of its resolution.",
            "शिकायत दर्ज करें, समाधान की स्थिति जानें।",
          )}
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3.5 xs:gap-5 sm:gap-7 mb-5 xs:mb-6 sm:mb-8">
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 xs:gap-2.5 bg-[#df6807] hover:bg-[#d96000] text-white px-4 xs:px-5 sm:px-6 py-3 xs:py-3.5 sm:py-4 rounded font-bold text-sm sm:text-base shadow-md transition-all hover:-translate-y-0.5 text-center"
          >
            <FileIcon className="w-4 xs:w-5 h-4 xs:h-5 shrink-0" />
            <span>{t("Register a complaint", "शिकायत दर्ज करें")}</span>
          </Link>
          <a
            href="tel:1100"
            className="flex items-center justify-center xs:justify-start gap-2.5 group py-1 xs:py-0"
          >
            <PhoneIcon className="w-6 xs:w-7 h-6 xs:h-7 text-[#ffbc61] group-hover:scale-110 transition-transform shrink-0" />
            <span>
              <small className="block text-xs tracking-wider text-[#d5e4ee] uppercase">
                {t("TOLL-FREE HELPLINE", "टोल-फ्री हेल्पलाइन")}
              </small>
              <b className="block text-xl xs:text-2xl sm:text-3xl font-bold leading-tight text-white">
                1100
              </b>
            </span>
          </a>
        </div>

        {/* Assurance Tagline */}
        <div className="flex items-center gap-2 xs:gap-2.5 text-xs text-[#e0eaf2]">
          <HeadsetIcon className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-[#ffbc61] shrink-0" />
          <span>
            {t(
              "At your service. 24 hours, every day.",
              "आपकी सेवा में। 24 घंटे, हर दिन।",
            )}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
