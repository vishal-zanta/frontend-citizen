import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PhoneIcon, MailIcon } from "./Icons";
import { content } from "./content";
import biharLogo from "@/assets/sahyog-variants/1/bihar-logo.png";

const Footer = () => {
  const { t } = useLanguage();

  const addressLines = t(
    content.footer.addressLines.en,
    content.footer.addressLines.hi
  ) as string[];

  return (
    <footer className="bg-[#09294b] text-[#d1dce8]">
      <div className="max-w-[1240px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-80px)]">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.35fr_1fr] gap-8 md:gap-12 py-12 md:py-14">
          {/* Column 1: Brand */}
          <div className="flex items-center gap-4">
            <img
              src={biharLogo}
              alt="Government of Bihar"
              className="w-[54px] h-[66px] object-contain bg-white p-1 rounded"
            />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {t(content.footer.brandTitleLine1.en, content.footer.brandTitleLine1.hi)}
                <br />
                {t(content.footer.brandTitleLine2.en, content.footer.brandTitleLine2.hi)}
              </h2>
              <span className="text-xs text-[#adc3d8] block mt-0.5 font-medium">
                {t(content.footer.brandSubtitle.en, content.footer.brandSubtitle.hi)}
              </span>
            </div>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-3 tracking-wide">
              {t(content.footer.contactTitle.en, content.footer.contactTitle.hi)}
            </h3>
            <div className="space-y-2">
              <a
                href="tel:1100"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-[#d1dce8] hover:text-[#ffb65a] transition-colors"
              >
                <PhoneIcon className="w-4 h-4 text-[#ffb65a]" />
                <span>{t(content.footer.tollFreeLabel.en, content.footer.tollFreeLabel.hi)}</span>
              </a>
              <a
                href={`mailto:${content.footer.email}`}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-[#d1dce8] hover:text-[#ffb65a] transition-colors break-all"
              >
                <MailIcon className="w-4 h-4 text-[#ffb65a]" />
                <span>{content.footer.email}</span>
              </a>
              <p className="text-xs sm:text-sm text-[#adc3d8] pt-1">
                {t(content.footer.workingHours.en, content.footer.workingHours.hi)}
              </p>
            </div>
          </div>

          {/* Column 3: Address */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-3 tracking-wide">
              {t(content.footer.addressTitle.en, content.footer.addressTitle.hi)}
            </h3>
            <p className="text-xs sm:text-sm text-[#adc3d8] leading-relaxed">
              {addressLines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < addressLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9fb4c9]">
          <span>{t(content.footer.copyright.en, content.footer.copyright.hi)}</span>
          <span>
            {t(content.footer.beltronCredit.en, content.footer.beltronCredit.hi)}{" "}
            <b className="text-white font-semibold">{content.footer.beltronOrg}</b>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
