import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import totalRegisteredIcon from "@/assets/sahyog-variants/2/icons/total-registered.png";
import totalResolvedIcon from "@/assets/sahyog-variants/2/icons/total-resolved.png";

const ImpactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      className="wrap impact"
      aria-label={t("Complaint statistics", "शिकायत के आंकड़े")}
    >
      <div className="impact-intro">
        <span className="kicker" data-en="Your Problem, Our Solution">
          {t("Your Problem, Our Solution", "आपकी समस्या, हमारा समाधान")}
        </span>
        <h2 data-en="Bihar Sahyog, With You at Every Step.">
          {t(
            "Bihar Sahyog, With You at Every Step.",
            "बिहार सहयोग, हर कदम पर आपके साथ।"
          )}
        </h2>
      </div>

      <div className="metric">
        <span className="metric-icon">
          <img src={totalRegisteredIcon} alt="" width="48" height="48" />
        </span>
        <div>
          <b>1,126</b>
          <span data-en="Total registered complaints">
            {t("Total registered complaints", "कुल पंजीकृत शिकायतें")}
          </span>
        </div>
      </div>

      <div className="metric resolved">
        <span className="metric-icon">
          <img src={totalResolvedIcon} alt="" width="48" height="48" />
        </span>
        <div>
          <b>516</b>
          <span data-en="Total resolved complaints">
            {t("Total resolved complaints", "कुल निराकृत शिकायतें")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
