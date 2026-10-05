import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import biharLogo from "@/assets/sahyog-variants/1/bihar-logo.png";
import { content } from "./content";

const Header = () => {
  const { t } = useLanguage();

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-white border-b border-[#dce5ed]/70 sticky top-0 z-40 shadow-xs">
      <div className="max-w-[1240px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-80px)] py-3 sm:py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <img
            src={biharLogo}
            alt="Government of Bihar"
            className="w-[46px] h-[58px] sm:w-[52px] sm:h-[65px] object-contain transition-transform group-hover:scale-105"
          />
          <div>
            <strong className="block text-xl sm:text-2xl font-extrabold text-[#204e83] leading-tight tracking-tight">
              {t(content.header.brandTitle.en, content.header.brandTitle.hi)}
            </strong>
            <span className="block text-xs sm:text-[13px] font-semibold text-[#b85815] tracking-wide">
              {t(content.header.brandSubtitle.en, content.header.brandSubtitle.hi)}
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav
          aria-label={t("Main navigation", "मुख्य नेविगेशन")}
          className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold"
        >
          <a
            href="#services"
            onClick={scrollToServices}
            className="text-[#162f47] hover:text-[#f57b18] transition-colors py-1 cursor-pointer"
          >
            {t(content.header.nav.services.en, content.header.nav.services.hi)}
          </a>
          <a
            href="https://portal.lumirex.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#162f47] hover:text-[#f57b18] transition-colors py-1"
          >
            {t(content.header.nav.deptLogin.en, content.header.nav.deptLogin.hi)}
          </a>
          <a
            href="https://portal.lumirex.tech/?role=cce"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#162f47] hover:text-[#f57b18] transition-colors py-1"
          >
            {t(content.header.nav.officeLogin.en, content.header.nav.officeLogin.hi)}
          </a>
          <Link
            to="/login"
            className="border border-[#204e83] hover:bg-[#204e83] hover:text-white text-[#204e83] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded font-bold transition-all duration-200"
          >
            {t(content.header.nav.citizenLogin.en, content.header.nav.citizenLogin.hi)}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
