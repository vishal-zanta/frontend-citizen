import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import biharLogo from "@/assets/sahyog-variants/2/bihar-logo.png";
import { PhoneIcon, MailIcon } from "./Icons";

const Footer: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <footer>
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <img src={biharLogo} alt={t("Government of Bihar", "बिहार सरकार")} />
          <h2 data-en="Bihar Sahyog<br>Helpline">
            {lang === "en" ? (
              <>
                Bihar Sahyog
                <br />
                Helpline
              </>
            ) : (
              <>
                बिहार सहयोग
                <br />
                हेल्पलाइन
              </>
            )}
          </h2>
          <span data-en="Government of Bihar">
            {t("Government of Bihar", "बिहार सरकार")}
          </span>
        </div>

        <div>
          <h3 data-en="Contact us">{t("Contact us", "संपर्क करें")}</h3>
          <a className="footer-phone" href="tel:1100">
            <PhoneIcon />
            <span data-en="Toll-free: 1100">
              {t("Toll-free: 1100", "टोल-फ्री: 1100")}
            </span>
          </a>
          <a className="footer-mail" href="mailto:sahyoghelpline@bihar.gov.in">
            <MailIcon />
            <span>sahyoghelpline@bihar.gov.in</span>
          </a>
          <p data-en="24×7 / 365 days State Call Centre">
            {t(
              "24×7 / 365 days State Call Centre",
              "24×7 / 365 दिन राज्य कॉल सेंटर"
            )}
          </p>
        </div>

        <div>
          <h3 data-en="Official address">
            {t("Official address", "आधिकारिक पता")}
          </h3>
          <p data-en="Sahyog Helpline<br>11th Floor, Biscomaun Tower<br>West Gandhi Maidan<br>Patna, Bihar – 800001">
            {lang === "en" ? (
              <>
                Sahyog Helpline
                <br />
                11th Floor, Biscomaun Tower
                <br />
                West Gandhi Maidan
                <br />
                Patna, Bihar – 800001
              </>
            ) : (
              <>
                सहयोग हेल्पलाइन
                <br />
                11वीं मंजिल, बिस्कोमान टॉवर
                <br />
                पश्चिम गांधी मैदान
                <br />
                पटना, बिहार - 800001
              </>
            )}
          </p>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span data-en="© Government of Bihar | All rights reserved">
          {t(
            "© Government of Bihar | All rights reserved",
            "© बिहार सरकार | सर्वाधिकार सुरक्षित"
          )}
        </span>
        <span data-en="Original portal designed & developed by BSEDC (BELTRON)">
          {lang === "en" ? (
            <>
              Original portal designed & developed by <b>BSEDC (BELTRON)</b>
            </>
          ) : (
            <>
              मूल पोर्टल द्वारा डिज़ाइन एवं विकसित <b>BSEDC (BELTRON)</b>
            </>
          )}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
