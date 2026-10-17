import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const AssistantPanel: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const toggleAssistant = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setTimeout(() => closeButtonRef.current?.focus(), 0);
    } else {
      toggleRef.current?.focus();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        toggleAssistant(false);
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
        onClick={() => toggleAssistant(!isOpen)}
        aria-label={t("Sahyog assistant", "सहयोग सहायक")}
      >
        <svg>
          <use href="#headset" />
        </svg>
        <span data-en="Sahyog assistant">
          {t("Sahyog assistant", "सहयोग सहायक")}
        </span>
      </button>

      <aside
        id="assistant-panel"
        hidden={!isOpen}
        aria-label={t("Sahyog assistance", "सहयोग सहायता")}
      >
        <div className="assistant-heading">
          <strong data-en="Bihar Helpline Assistant">
            {t("Bihar Helpline Assistant", "बिहार हेल्पलाइन सहायक")}
          </strong>
          <button
            ref={closeButtonRef}
            className="close-assistant"
            type="button"
            aria-label={t("Close", "बंद करें")}
            onClick={() => toggleAssistant(false)}
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
          onClick={() => toggleAssistant(false)}
          data-en="Register Complaint"
        >
          {t("Register Complaint", "शिकायत दर्ज करें")}
        </Link>
        <Link
          to="/complaint"
          onClick={() => toggleAssistant(false)}
          data-en="Track complaint status"
        >
          {t("Track complaint status", "शिकायत की स्थिति देखें")}
        </Link>
        <Link
          to="/sahyog"
          onClick={() => toggleAssistant(false)}
          data-en="Open portal for the AI assistant"
        >
          {t(
            "Open portal for the AI assistant",
            "एआई सहायक के लिए पोर्टल खोलें"
          )}
        </Link>
        <a
          href="tel:1100"
          onClick={() => toggleAssistant(false)}
          data-en="Call 1100"
        >
          {t("Call 1100", "1100 पर कॉल करें")}
        </a>
      </aside>
    </>
  );
};

export default AssistantPanel;
