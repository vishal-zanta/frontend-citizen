import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { HeadsetIcon, PhoneIcon } from "./Icons";

const SupportSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="support">
      <div className="support-symbol">
        <HeadsetIcon />
      </div>
      <div className="support-copy">
        <span className="kicker" data-en="BIHAR SAHYOG HELPLINE">
          {t("BIHAR SAHYOG HELPLINE", "बिहार सहयोग हेल्पलाइन")}
        </span>
        <h2 data-en="One call. A helping hand.">
          {t("One call. A helping hand.", "सिर्फ एक कॉल पर सहायता।")}
        </h2>
        <p data-en="24×7 / 365 days · State Call Centre">
          {t(
            "24×7 / 365 days · State Call Centre",
            "24×7 / 365 दिन · राज्य कॉल सेंटर"
          )}
        </p>
      </div>
      <a className="support-number" href="tel:1100">
        <span data-en="TOLL-FREE">{t("TOLL-FREE", "टोल-फ्री")}</span>
        <b>1100</b>
        <span className="dial-label">
          <PhoneIcon />
          <span data-en="Call now">{t("Call now", "अभी कॉल करें")}</span>
        </span>
      </a>
    </section>
  );
};

export default SupportSection;
