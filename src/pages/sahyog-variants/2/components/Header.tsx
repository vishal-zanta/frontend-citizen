import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import biharLogo from "@/assets/sahyog-variants/2/bihar-logo.png";

const Header: React.FC = () => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-[#faf7ee] border-b border-[#ded7c8]/60 sticky top-0 z-40">
      <div className="max-w-[1280px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 min-h-[66px] xs:min-h-[76px] sm:min-h-[85px] lg:min-h-[105px] flex items-center justify-between gap-3 sm:gap-6 py-2 sm:py-3 lg:py-0">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 xs:gap-3.5 sm:gap-4 shrink-0 group">
          <img
            src={biharLogo}
            alt="Government of Bihar"
            className="w-[32px] h-[40px] xs:w-[40px] xs:h-[50px] sm:w-[46px] sm:h-[58px] lg:w-[54px] lg:h-[67px] object-contain transition-transform group-hover:scale-105 shrink-0"
          />
          <div>
            <strong className="block text-sm xs:text-base sm:text-xl lg:text-[23px] font-extrabold text-[#113859] leading-tight">
              {t("Bihar Sahyog Helpline", "बिहार सहयोग हेल्पलाइन")}
            </strong>
            <span className="block text-xs text-[#647684] mt-0.5 sm:mt-1">
              {t("Government of Bihar", "बिहार सरकार")}
            </span>
          </div>
        </Link>

        {/* Desktop & Tablet Navigation (md+) */}
        <nav
          aria-label={t("Main navigation", "मुख्य नेविगेशन")}
          className="hidden md:flex items-center md:gap-4 lg:gap-7 md:text-xs lg:text-[13px] font-semibold text-[#14344c] ml-auto shrink-0"
        >
          <a
            href="#services"
            onClick={scrollToServices}
            className="hover:text-[#f77b10] transition-colors py-1 cursor-pointer whitespace-nowrap"
          >
            {t("Citizen services", "नागरिक सेवाएं")}
          </a>
          <a
            href="https://portal.lumirex.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f77b10] transition-colors py-1 whitespace-nowrap"
          >
            {t("Department login", "विभागीय लॉगिन")}
          </a>
          <a
            href="https://portal.lumirex.tech/?role=cce"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f77b10] transition-colors py-1 whitespace-nowrap"
          >
            {t("Office login", "कार्यालय लॉगिन")}
          </a>
          <Link
            to="/login"
            className="px-3.5 py-2 lg:px-5 lg:py-2.5 bg-[#113859] hover:bg-[#255784] text-white rounded font-bold transition-colors whitespace-nowrap text-xs lg:text-sm"
          >
            {t("Citizen login", "नागरिक लॉगिन")}
          </Link>
        </nav>

        {/* Mobile controls (< md: 0->xs, xs->sm, sm->md) */}
        <div className="flex md:hidden items-center gap-1.5 xs:gap-2.5 shrink-0">
          <Link
            to="/login"
            className="px-2 xs:px-3 py-1.5 bg-[#113859] hover:bg-[#255784] text-white rounded text-xs font-bold transition-colors whitespace-nowrap shadow-xs"
          >
            {t("Citizen login", "नागरिक लॉगिन")}
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t("Close menu", "मेनू बंद करें") : t("Open menu", "मेनू खोलें")}
            className="p-1 xs:p-1.5 text-[#113859] hover:bg-[#efe8d9] rounded border border-[#ded7c8] transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (< md) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf7ee] border-t border-[#ded7c8] px-4 py-3.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2.5 text-sm font-semibold text-[#14344c]">
            <a
              href="#services"
              onClick={scrollToServices}
              className="py-2 px-2 hover:bg-[#efe8d9] hover:text-[#f77b10] rounded transition-colors"
            >
              {t("Citizen services", "नागरिक सेवाएं")}
            </a>
            <a
              href="https://portal.lumirex.tech/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-[#efe8d9] hover:text-[#f77b10] rounded transition-colors"
            >
              {t("Department login", "विभागीय लॉगिन")}
            </a>
            <a
              href="https://portal.lumirex.tech/?role=cce"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-[#efe8d9] hover:text-[#f77b10] rounded transition-colors"
            >
              {t("Office login", "कार्यालय लॉगिन")}
            </a>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 text-center py-2.5 px-4 bg-[#113859] hover:bg-[#255784] text-white rounded font-bold transition-colors"
            >
              {t("Citizen login", "नागरिक लॉगिन")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
