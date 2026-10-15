import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { HeadsetIcon, PhoneIcon } from "./Icons";

interface AssistantPanelProps {
  onOpenChatbot?: () => void;
}

const AssistantPanel: React.FC<AssistantPanelProps> = ({ onOpenChatbot }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="assistant-panel"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 sm:px-5 py-3 sm:py-3.5 bg-[#113859] hover:bg-[#255784] border border-white/50 rounded-full text-white shadow-xl text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <HeadsetIcon className="w-4.5 h-4.5 text-[#ffba67]" />
        <span>{t("Sahyog assistant", "सहयोग सहायक")}</span>
      </button>

      {/* Assistant Modal / Popup Panel */}
      {isOpen && (
        <aside
          ref={panelRef}
          id="assistant-panel"
          aria-label={t("Sahyog assistance", "सहयोग सहायता")}
          className="fixed right-4 sm:right-6 bottom-20 sm:bottom-24 z-50 w-[330px] max-w-[calc(100vw-32px)] p-5 sm:p-6 bg-white border border-[#d8dedf] rounded-[10px] shadow-[0_15px_60px_rgba(20,52,76,0.22)] animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between font-bold text-sm text-[#14344c] mb-2">
            <span>
              {t("Bihar Helpline Assistant", "बिहार हेल्पलाइन सहायक")}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t("Close", "बंद करें")}
              className="w-7 h-7 rounded-full bg-[#edf2f5] hover:bg-[#d8e2e8] text-[#113859] flex items-center justify-center text-lg leading-none transition-colors cursor-pointer"
            >
              ×
            </button>
          </div>

          <p className="text-xs text-[#647684] my-3 leading-relaxed">
            {t(
              "Choose a service to continue on the original portal.",
              "मूल पोर्टल पर आगे बढ़ने के लिए सेवा चुनें।",
            )}
          </p>

          {/* Quick Actions List */}
          <div className="flex flex-col text-xs sm:text-[13px] font-semibold text-[#14344c]">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="py-2.5 border-t border-[#edf0f2] hover:text-[#f77b10] transition-colors"
            >
              {t("Register a complaint", "शिकायत दर्ज करें")}
            </Link>
            <Link
              to="/complaint"
              onClick={() => setIsOpen(false)}
              className="py-2.5 border-t border-[#edf0f2] hover:text-[#f77b10] transition-colors"
            >
              {t("Track complaint status", "शिकायत की स्थिति देखें")}
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                if (onOpenChatbot) {
                  onOpenChatbot();
                }
              }}
              className="py-2.5 border-t border-[#edf0f2] hover:text-[#f77b10] text-left transition-colors cursor-pointer font-semibold"
            >
              {t(
                "Open portal for the AI assistant",
                "एआई सहायक के लिए पोर्टल खोलें",
              )}
            </button>
            <a
              href="tel:1100"
              className="py-2.5 border-t border-[#edf0f2] hover:text-[#f77b10] flex items-center gap-1.5 transition-colors"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-[#f77b10]" />
              <span>{t("Call 1100", "1100 पर कॉल करें")}</span>
            </a>
          </div>
        </aside>
      )}
    </>
  );
};

export default AssistantPanel;
