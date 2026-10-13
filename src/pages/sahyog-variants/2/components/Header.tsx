import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import biharLogo from "@/assets/sahyog-variants/2/bihar-logo.png";

const Header: React.FC = () => {
  const { t } = useLanguage();

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-[#faf7ee] border-b border-[#ded7c8]/60 sticky top-0 z-40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 min-h-[85px] sm:min-h-[105px] flex items-center justify-between gap-6 flex-wrap sm:flex-nowrap py-3 sm:py-0">
        <Link to="/" className="flex items-center gap-4 shrink-0 group">
          <img
            src={biharLogo}
            alt="Government of Bihar"
            className="w-[46px] h-[58px] sm:w-[54px] sm:h-[67px] object-contain transition-transform group-hover:scale-105"
          />
          <div>
            <strong className="block text-xl sm:text-[23px] font-extrabold text-[#113859] leading-tight">
              {t("Bihar Sahyog Helpline", "बिहार सहयोग हेल्पलाइन")}
            </strong>
            <span className="block text-xs text-[#647684] mt-1">
              {t("Government of Bihar", "बिहार सरकार")}
            </span>
          </div>
        </Link>
        <nav
          aria-label={t("Main navigation", "मुख्य नेविगेशन")}
          className="flex items-center gap-4 sm:gap-7 text-xs sm:text-[13px] font-semibold text-[#14344c] ml-auto"
        >
          <a
            href="#services"
            onClick={scrollToServices}
            className="hover:text-[#f77b10] transition-colors py-1 cursor-pointer"
          >
            {t("Citizen services", "नागरिक सेवाएं")}
          </a>
          <a
            href="https://portal.lumirex.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f77b10] transition-colors py-1"
          >
            {t("Department login", "विभागीय लॉगिन")}
          </a>
          <a
            href="https://portal.lumirex.tech/?role=cce"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f77b10] transition-colors py-1"
          >
            {t("Office login", "कार्यालय लॉगिन")}
          </a>
          <Link
            to="/login"
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#113859] hover:bg-[#255784] text-white rounded font-bold transition-colors"
          >
            {t("Citizen login", "नागरिक लॉगिन")}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
