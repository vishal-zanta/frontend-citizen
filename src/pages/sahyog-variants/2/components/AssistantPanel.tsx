import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { HeadsetIcon } from "./Icons";

interface AssistantPanelProps {
  onOpenChatbot?: () => void;
}

const AssistantPanel: React.FC<AssistantPanelProps> = ({ onOpenChatbot }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

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
      <button
        ref={toggleRef}
        className="assistant-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="assistant-panel"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t("Sahyog assistant", "सहयोग सहायक")}
      >
        <HeadsetIcon />
        <span data-en="Sahyog assistant">
          {t("Sahyog assistant", "सहयोग सहायक")}
        </span>
      </button>

      {isOpen && (
        <aside
          ref={panelRef}
          id="assistant-panel"
          aria-label={t("Sahyog assistance", "सहयोग सहायता")}
        >
          <div className="assistant-heading">
            <strong data-en="Bihar Helpline Assistant">
              {t("Bihar Helpline Assistant", "बिहार हेल्पलाइन सहायक")}
            </strong>
            <button
              className="close-assistant"
              type="button"
              aria-label={t("Close", "बंद करें")}
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          <p data-en="Choose a service to continue on the original portal.">
            {t(
              "Choose a service to continue on the original portal.",
              "मूल पोर्टल पर आगे बढ़ने के लिए सेवा चुनें।"
            )}
          </p>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            data-en="Register Complaint"
          >
            {t("Register Complaint", "शिकायत दर्ज करें")}
          </Link>
          <Link
            to="/complaint"
            onClick={() => setIsOpen(false)}
            data-en="Track complaint status"
          >
            {t("Track complaint status", "शिकायत की स्थिति देखें")}
          </Link>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              if (onOpenChatbot) onOpenChatbot();
            }}
            data-en="Open portal for the AI assistant"
          >
            {t(
              "Open portal for the AI assistant",
              "एआई सहायक के लिए पोर्टल खोलें"
            )}
          </button>
          <a href="tel:1100" onClick={() => setIsOpen(false)} data-en="Call 1100">
            {t("Call 1100", "1100 पर कॉल करें")}
          </a>
        </aside>
      )}
    </>
  );
};

export default AssistantPanel;
