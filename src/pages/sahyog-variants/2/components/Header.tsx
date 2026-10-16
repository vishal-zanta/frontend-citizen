import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import biharLogo from "@/assets/sahyog-variants/2/bihar-logo.png";
import LangSelector from "@/components/LangSelector";

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
    <header className="wrap header">
      <Link to="/" className="brand" onClick={() => setMobileMenuOpen(false)}>
        <img src={biharLogo} alt={t("Government of Bihar", "बिहार सरकार")} />
        <div>
          <strong data-en="Bihar Sahyog Helpline">
            {t("Bihar Sahyog Helpline", "बिहार सहयोग हेल्पलाइन")}
          </strong>
          <span data-en="Government of Bihar">
            {t("Government of Bihar", "बिहार सरकार")}
          </span>
        </div>
      </Link>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={mobileMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label={
          mobileMenuOpen
            ? t("Close menu", "मेनू बंद करें")
            : t("Open menu", "मेनू खोलें")
        }
      >
        <span aria-hidden="true">☰</span>
        <span data-en="Menu">{t("Menu", "मेन्यू")}</span>
      </button>

      <nav
        id="primary-navigation"
        className={mobileMenuOpen ? "is-open" : ""}
        aria-label={t("Main navigation", "मुख्य नेविगेशन")}
      >
        <a
          href="#services"
          onClick={scrollToServices}
          data-en="Citizen services"
        >
          {t("Citizen services", "नागरिक सेवाएं")}
        </a>
        <a
          href="https://portal.lumirex.tech/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileMenuOpen(false)}
          data-en="Department login"
        >
          {t("Department login", "विभागीय लॉगिन")}
        </a>
        <a
          href="https://portal.lumirex.tech/?role=cce"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileMenuOpen(false)}
          data-en="Office login"
        >
          {t("Office login", "कार्यालय लॉगिन")}
        </a>
        <Link
          to="/login"
          className="login"
          onClick={() => setMobileMenuOpen(false)}
          data-en="Citizen login"
        >
          {t("Citizen login", "नागरिक लॉगिन")}
        </Link>
        <div className="language nav-language">
          <span className="sr-only">{t("Select Language", "भाषा चुनें")}</span>
          <LangSelector
            className="border-0 shadow-none bg-transparent hover:bg-black/5 dark:hover:bg-white/5 py-1 px-1.5"
            selectClassname="font-semibold text-xs text-[#113859]"
            globeClassname="text-[#113859] w-3.5 h-3.5"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
