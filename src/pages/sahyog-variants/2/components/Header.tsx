import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import biharLogo from "@/assets/sahyog-variants/2/bihar-logo.png";

const Header: React.FC = () => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="bg-[#faf7ee] border-b border-[#ded7c8]/60 sticky top-0 z-40"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-0 min-h-[70px] sm:min-h-[85px] lg:min-h-[105px] flex flex-col justify-center">
        {/* Main Bar */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 w-full">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-4 shrink-0 group">
            <img
              src={biharLogo}
              alt="Government of Bihar"
              className="w-[38px] h-[49px] sm:w-[46px] sm:h-[58px] lg:w-[54px] lg:h-[67px] object-contain transition-transform group-hover:scale-105 shrink-0"
            />
            <div>
              <strong className="block text-base sm:text-xl lg:text-[23px] font-extrabold text-[#113859] leading-tight">
                {t("Bihar Sahyog Helpline", "बिहार सहयोग हेल्पलाइन")}
              </strong>
              <span className="block text-xs text-[#647684] mt-0.5 sm:mt-1">
                {t("Government of Bihar", "बिहार सरकार")}
              </span>
            </div>
          </Link>

          {/* Desktop & Tablet Navigation (md+) */}
          <nav
            id="primary-navigation"
            aria-label={t("Main navigation", "मुख्य नेविगेशन")}
            className="hidden md:flex items-center md:gap-5 lg:gap-7 md:text-xs lg:text-[13px] font-semibold text-[#14344c] ml-auto shrink-0"
          >
            <a
              href="#services"
              onClick={scrollToServices}
              className="hover:text-[#f77b10] transition-colors py-1 cursor-pointer whitespace-nowrap text-xs lg:text-[13px]"
            >
              {t("Citizen services", "नागरिक सेवाएं")}
            </a>
            <a
              href="https://portal.lumirex.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f77b10] transition-colors py-1 whitespace-nowrap text-xs lg:text-[13px]"
            >
              {t("Department login", "विभागीय लॉगिन")}
            </a>
            <a
              href="https://portal.lumirex.tech/?role=cce"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f77b10] transition-colors py-1 whitespace-nowrap text-xs lg:text-[13px]"
            >
              {t("Office login", "कार्यालय लॉगिन")}
            </a>
            <Link
              to="/login"
              className="px-4 py-2 lg:px-5 lg:py-2.5 bg-[#113859] hover:bg-[#255784] text-white rounded-[3px] font-bold transition-colors whitespace-nowrap text-xs lg:text-sm"
            >
              {t("Citizen login", "नागरिक लॉगिन")}
            </Link>
          </nav>

          {/* Mobile Menu Button (< md) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-primary-navigation"
            aria-label={mobileMenuOpen ? t("Close menu", "मेनू बंद करें") : t("Open menu", "मेनू खोलें")}
            className="flex md:hidden items-center justify-center gap-2 min-h-[44px] px-3.5 py-2 border border-[#c2ced5] rounded-[6px] bg-transparent text-[#113859] hover:bg-[#efe8d9]/60 transition-colors shrink-0 cursor-pointer"
          >
            <span aria-hidden="true" className="text-xl font-bold leading-none">
              ☰
            </span>
            <span className="text-xs sm:text-sm font-semibold">
              {t("Menu", "मेन्यू")}
            </span>
          </button>
        </div>

        {/* Mobile 2x2 Navigation Grid (< md) */}
        {mobileMenuOpen && (
          <nav
            id="mobile-primary-navigation"
            aria-label={t("Mobile navigation", "मोबाइल नेविगेशन")}
            className="grid md:hidden grid-cols-2 gap-2.5 w-full pt-3 pb-1 animate-in fade-in duration-200"
          >
            <a
              href="#services"
              onClick={scrollToServices}
              className="flex items-center justify-center text-center min-h-[46px] p-2.5 rounded-[4px] bg-[#edf1f2] hover:bg-[#dfe6e9] text-[#14344c] font-semibold text-xs sm:text-[13px] transition-colors shadow-2xs"
            >
              {t("Citizen services", "नागरिक सेवाएं")}
            </a>
            <a
              href="https://portal.lumirex.tech/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center text-center min-h-[46px] p-2.5 rounded-[4px] bg-[#edf1f2] hover:bg-[#dfe6e9] text-[#14344c] font-semibold text-xs sm:text-[13px] transition-colors shadow-2xs"
            >
              {t("Department login", "विभागीय लॉगिन")}
            </a>
            <a
              href="https://portal.lumirex.tech/?role=cce"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center text-center min-h-[46px] p-2.5 rounded-[4px] bg-[#edf1f2] hover:bg-[#dfe6e9] text-[#14344c] font-semibold text-xs sm:text-[13px] transition-colors shadow-2xs"
            >
              {t("Office login", "कार्यालय लॉगिन")}
            </a>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center text-center min-h-[46px] p-2.5 rounded-[4px] bg-[#113859] hover:bg-[#255784] text-white font-bold text-xs sm:text-[13px] transition-colors shadow-2xs"
            >
              {t("Citizen login", "नागरिक लॉगिन")}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
