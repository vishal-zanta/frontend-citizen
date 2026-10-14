import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import biharLogo from "@/assets/sahyog-variants/1/bihar-logo.png";
import { content } from "./content";

const Header = () => {
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
    <header className="bg-white border-b border-[#dce5ed]/70 sticky top-0 z-40 shadow-xs">
      <div className="max-w-[1240px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 min-h-[66px] xs:min-h-[76px] sm:min-h-[85px] lg:min-h-[96px] flex items-center justify-between gap-3 sm:gap-4 py-2 sm:py-3 lg:py-0">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 xs:gap-3.5 group shrink-0">
          <img
            src={biharLogo}
            alt="Government of Bihar"
            className="w-[32px] h-[40px] xs:w-[40px] xs:h-[50px] sm:w-[46px] sm:h-[58px] lg:w-[52px] lg:h-[65px] object-contain transition-transform group-hover:scale-105 shrink-0"
          />
          <div>
            <strong className="block text-sm xs:text-base sm:text-xl lg:text-2xl font-extrabold text-[#204e83] leading-tight tracking-tight">
              {t(content.header.brandTitle.en, content.header.brandTitle.hi)}
            </strong>
            <span className="block text-xs lg:text-[13px] font-semibold text-[#b85815] tracking-wide mt-0.5">
              {t(content.header.brandSubtitle.en, content.header.brandSubtitle.hi)}
            </span>
          </div>
        </Link>

        {/* Desktop & Tablet Navigation (md+) */}
        <nav
          aria-label={t("Main navigation", "मुख्य नेविगेशन")}
          className="hidden md:flex items-center gap-3.5 sm:gap-6 text-xs sm:text-sm font-semibold ml-auto shrink-0"
        >
          <a
            href="#services"
            onClick={scrollToServices}
            className="text-[#162f47] hover:text-[#f57b18] transition-colors py-1 cursor-pointer whitespace-nowrap"
          >
            {t(content.header.nav.services.en, content.header.nav.services.hi)}
          </a>
          <a
            href="https://portal.lumirex.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#162f47] hover:text-[#f57b18] transition-colors py-1 whitespace-nowrap"
          >
            {t(content.header.nav.deptLogin.en, content.header.nav.deptLogin.hi)}
          </a>
          <a
            href="https://portal.lumirex.tech/?role=cce"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#162f47] hover:text-[#f57b18] transition-colors py-1 whitespace-nowrap"
          >
            {t(content.header.nav.officeLogin.en, content.header.nav.officeLogin.hi)}
          </a>
          <Link
            to="/login"
            className="border border-[#204e83] hover:bg-[#204e83] hover:text-white text-[#204e83] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded font-bold transition-all duration-200 whitespace-nowrap text-xs sm:text-sm"
          >
            {t(content.header.nav.citizenLogin.en, content.header.nav.citizenLogin.hi)}
          </Link>
        </nav>

        {/* Mobile controls (< md: 0->xs, xs->sm, sm->md) */}
        <div className="flex md:hidden items-center gap-1.5 xs:gap-2.5 shrink-0">
          <Link
            to="/login"
            className="px-2 xs:px-3 py-1.5 border border-[#204e83] text-[#204e83] hover:bg-[#204e83] hover:text-white rounded text-xs font-bold transition-colors whitespace-nowrap shadow-xs"
          >
            {t(content.header.nav.citizenLogin.en, content.header.nav.citizenLogin.hi)}
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t("Close menu", "मेनू बंद करें") : t("Open menu", "मेनू खोलें")}
            className="p-1 xs:p-1.5 text-[#204e83] hover:bg-[#f0f5fa] rounded border border-[#dce5ed] transition-colors"
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
        <div className="md:hidden bg-white border-t border-[#dce5ed] px-4 py-3.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2.5 text-sm font-semibold text-[#162f47]">
            <a
              href="#services"
              onClick={scrollToServices}
              className="py-2 px-2 hover:bg-[#f0f5fa] hover:text-[#f57b18] rounded transition-colors"
            >
              {t(content.header.nav.services.en, content.header.nav.services.hi)}
            </a>
            <a
              href="https://portal.lumirex.tech/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-[#f0f5fa] hover:text-[#f57b18] rounded transition-colors"
            >
              {t(content.header.nav.deptLogin.en, content.header.nav.deptLogin.hi)}
            </a>
            <a
              href="https://portal.lumirex.tech/?role=cce"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-2 hover:bg-[#f0f5fa] hover:text-[#f57b18] rounded transition-colors"
            >
              {t(content.header.nav.officeLogin.en, content.header.nav.officeLogin.hi)}
            </a>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 text-center py-2.5 px-4 bg-[#204e83] hover:bg-[#16395e] text-white rounded font-bold transition-colors"
            >
              {t(content.header.nav.citizenLogin.en, content.header.nav.citizenLogin.hi)}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
