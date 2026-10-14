import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import biharLogo from "@/assets/sahyog-variants/2/bihar-logo.png";
import { PhoneIcon, MailIcon } from "./Icons";

const Footer: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-[#e8edf0] pt-8 xs:pt-10 sm:pt-14 border-t border-[#d7dfe4]">
      <div className="max-w-[1280px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-[1.05fr_1.2fr_1fr] gap-7 xs:gap-8 sm:gap-14 pb-8 sm:pb-10">
        {/* Brand */}
        <div className="flex gap-3 xs:gap-4 xs:col-span-2 lg:col-span-1 items-start">
          <img
            src={biharLogo}
            alt="Government of Bihar"
            className="w-10 xs:w-12 sm:w-14 h-auto object-contain shrink-0"
          />
          <div>
            <h2 className="text-lg xs:text-xl sm:text-[22px] font-bold text-[#14344c] leading-snug">
              {lang === "hi" ? (
                <>
                  बिहार सहयोग
                  <br />
                  हेल्पलाइन
                </>
              ) : (
                <>
                  Bihar Sahyog
                  <br />
                  Helpline
                </>
              )}
            </h2>
            <span className="text-xs text-[#647684] mt-0.5 xs:mt-1 block">
              {t("Government of Bihar", "बिहार सरकार")}
            </span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs xs:text-sm font-bold text-[#14344c] mb-3 xs:mb-4 uppercase tracking-wider">
            {t("Contact us", "संपर्क करें")}
          </h3>
          <a
            href="tel:1100"
            className="flex items-center gap-2 xs:gap-2.5 text-xs text-[#506779] hover:text-[#f77b10] mb-2 xs:mb-2.5 transition-colors py-0.5"
          >
            <PhoneIcon className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-[#c37029] shrink-0" />
            <span>{t("Toll-free: 1100", "टोल-फ्री: 1100")}</span>
          </a>
          <a
            href="mailto:sahyoghelpline@bihar.gov.in"
            className="flex items-center gap-2 xs:gap-2.5 text-xs text-[#506779] hover:text-[#f77b10] mb-2 xs:mb-2.5 transition-colors py-0.5 break-all xs:break-normal"
          >
            <MailIcon className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-[#c37029] shrink-0" />
            <span>sahyoghelpline@bihar.gov.in</span>
          </a>
          <p className="text-xs text-[#506779]">
            {t(
              "24×7 / 365 days State Call Centre",
              "24×7 / 365 दिन राज्य कॉल सेंटर",
            )}
          </p>
        </div>

        {/* Official Address */}
        <div>
          <h3 className="text-xs xs:text-sm font-bold text-[#14344c] mb-3 xs:mb-4 uppercase tracking-wider">
            {t("Official address", "आधिकारिक पता")}
          </h3>
          <p className="text-xs text-[#506779] leading-relaxed">
            {lang === "hi" ? (
              <>
                सहयोग हेल्पलाइन
                <br />
                11वीं मंजिल, बिस्कोमान टॉवर
                <br />
                पश्चिम गांधी मैदान
                <br />
                पटना, बिहार - 800001
              </>
            ) : (
              <>
                Sahyog Helpline
                <br />
                11th Floor, Biscomaun Tower
                <br />
                West Gandhi Maidan
                <br />
                Patna, Bihar – 800001
              </>
            )}
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#ccd7de] py-4 sm:py-5">
        <div className="max-w-[1280px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2 sm:gap-3 text-xs text-[#6b7c89] text-center sm:text-left">
          <span>
            {t(
              "© Government of Bihar | All rights reserved",
              "© बिहार सरकार | सर्वाधिकार सुरक्षित",
            )}
          </span>
          <span>
            {lang === "hi" ? (
              <>
                मूल पोर्टल द्वारा डिज़ाइन एवं विकसित <b>BSEDC (BELTRON)</b>
              </>
            ) : (
              <>
                Original portal designed & developed by{" "}
                <b>BSEDC (BELTRON)</b>
              </>
            )}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
