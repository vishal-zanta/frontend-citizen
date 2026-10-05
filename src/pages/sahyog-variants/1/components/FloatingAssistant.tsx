import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { HeadsetIcon, CloseIcon, PhoneIcon } from "./Icons";
import { content } from "./content";

const FloatingAssistant = () => {
  const { t } = useLanguage();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      closeBtnRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        ref={toggleBtnRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="assistant-panel"
        aria-label={t(content.assistant.toggleBtn.en, content.assistant.toggleBtn.hi)}
        className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-50 flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-[#204e83] hover:bg-[#10365e] text-white border border-white/50 shadow-[0_6px_25px_rgba(22,57,92,0.35)] transition-all duration-200 hover:scale-105 cursor-pointer text-xs sm:text-sm font-bold"
      >
        <HeadsetIcon className="w-5 h-5 text-[#ffb757]" />
        <span>{t(content.assistant.toggleBtn.en, content.assistant.toggleBtn.hi)}</span>
      </button>

      {/* Floating Assistant Modal Panel */}
      {isOpen && (
        <aside
          id="assistant-panel"
          aria-label={t(content.assistant.title.en, content.assistant.title.hi)}
          className="fixed right-4 sm:right-6 bottom-20 sm:bottom-22 w-[calc(100%-32px)] sm:w-[340px] bg-white border border-[#dce5ed] rounded-xl shadow-[0_12px_60px_rgba(9,41,75,0.25)] p-5 sm:p-6 z-50 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#dce5ed]">
            <strong className="text-base font-bold text-[#162f47]">
              {t(content.assistant.title.en, content.assistant.title.hi)}
            </strong>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => {
                setIsOpen(false);
                toggleBtnRef.current?.focus();
              }}
              aria-label={t("Close", "बंद करें")}
              className="text-[#647587] hover:text-[#162f47] p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#647587] my-3 leading-relaxed">
            {t(content.assistant.subtitle.en, content.assistant.subtitle.hi)}
          </p>

          {/* Service Links */}
          <div className="flex flex-col divide-y divide-[#dce5ed]/70">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="py-2.5 text-xs sm:text-sm font-semibold text-[#204e83] hover:text-[#f57b18] hover:translate-x-1 transition-all"
            >
              {t(content.assistant.register.en, content.assistant.register.hi)}
            </Link>
            <Link
              to="/complaint"
              onClick={() => setIsOpen(false)}
              className="py-2.5 text-xs sm:text-sm font-semibold text-[#204e83] hover:text-[#f57b18] hover:translate-x-1 transition-all"
            >
              {t(content.assistant.track.en, content.assistant.track.hi)}
            </Link>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="py-2.5 text-xs sm:text-sm font-semibold text-[#204e83] hover:text-[#f57b18] hover:translate-x-1 transition-all"
            >
              {t(content.assistant.aiPortal.en, content.assistant.aiPortal.hi)}
            </Link>
            <a
              href="tel:1100"
              onClick={() => setIsOpen(false)}
              className="py-2.5 text-xs sm:text-sm font-bold text-[#078374] hover:text-[#f57b18] flex items-center gap-2 hover:translate-x-1 transition-all"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-[#078374]" />
              <span>{t(content.assistant.callNow.en, content.assistant.callNow.hi)}</span>
            </a>
          </div>
        </aside>
      )}
    </>
  );
};

export default FloatingAssistant;
