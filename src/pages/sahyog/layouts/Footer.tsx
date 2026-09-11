import React from "react";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { useSahyogTranslation } from "../translations";

export default function Footer() {
  const { t } = useSahyogTranslation();

  return (
    <>
      <footer className="bg-[#0b1329] text-slate-300 pt-16 pb-8 border-t border-slate-800 text-xs" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Main 5-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
            {/* Column 1: Sahyog Portal Description */}
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-base text-white tracking-tight">
                  {t.header.title}
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed font-normal">
                {t.footer.portalDesc}
              </p>
            </div>

            {/* Column 2: Key Links */}
            <div>
              <h4 className="font-bold text-white text-sm mb-4 tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>{t.footer.keyLinks}</span>
              </h4>
              <ul className="space-y-2.5 text-slate-400">
                <li>
                  <a href="https://lokshikayat.bihar.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    Lok Shikayat
                  </a>
                </li>
                <li>
                  <a href="https://loksamvad.bihar.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    Loksamvad
                  </a>
                </li>
                <li>
                  <a href="https://bpsm.bihar.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    BPSM Portal
                  </a>
                </li>
                <li>
                  <a href="https://jaankari.bihar.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    JAANKARI Facilitation
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Important Links */}
            <div>
              <h4 className="font-bold text-white text-sm mb-4 tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>{t.footer.importantLinks}</span>
              </h4>
              <ul className="space-y-2.5 text-slate-400">
                <li>
                  <a href="https://state.bihar.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    State Bihar Portal
                  </a>
                </li>
                <li>
                  <a href="https://cm.bihar.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    CM Bihar
                  </a>
                </li>
                <li>
                  <a href="https://cmsecretariat.bihar.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    CM Secretariat
                  </a>
                </li>
                <li>
                  <a href="https://cmrelieffund.bihar.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    CM Relief Fund
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div>
              <h4 className="font-bold text-white text-sm mb-4 tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{t.footer.contactUs}</span>
              </h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-white">{t.footer.tollFree}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-[11px] italic text-slate-400">{t.topBar.emailPlaceholder}</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{t.footer.stateCallCenter}</span>
                </li>
              </ul>

              {/* Social Media Links */}
              <div className="flex items-center gap-3 mt-4 pt-2">
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#twitter"
                  aria-label="Twitter / X"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 5: Official Secretariat Address */}
            <div>
              <h4 className="font-bold text-white text-sm mb-4 tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>{t.footer.addressTitle}</span>
              </h4>
              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-white font-medium">{t.footer.addressText[0]}</strong><br />
                  {t.footer.addressText[1]}<br />
                  {t.footer.addressText[2]}<br />
                  {t.footer.addressText[3]}<br />
                  {t.footer.addressText[4]}
                </p>
              </div>
            </div>
          </div>

          {/* Copyright Sub-footer */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-center sm:text-left text-[11px]">
            <div>
              {t.footer.copyright}
            </div>
            <div className="flex items-center gap-2">
              <span>Designed & Developed by</span>
              <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {t.footer.developedBy}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mandatory Red Disclaimer Bar */}
      <div className="bg-red-600 text-white py-2.5 px-4 text-center text-xs font-semibold tracking-wide border-t border-red-700">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span>{t.footer.disclaimer}</span>
        </div>
      </div>
    </>
  );
}
