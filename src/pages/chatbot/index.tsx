import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Bot,
  Send,
  X,
  RotateCcw,
  Sparkles,
  Search,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { ChatMessage, ChatStep } from "./types";
import { useTrackComplaintChat } from "./track-chatbot-complaint/useTrackComplaintChat";
// import { useRaiseComplaintChat } from "./raise-chatbot-complaint/useRaiseComplaintChat";
import ChatCaptchaPrompt from "./track-chatbot-complaint/ChatCaptchaPrompt";
import ChatComplaintCard from "./track-chatbot-complaint/ChatComplaintCard";
import ChatComplaintDetailsModal from "./track-chatbot-complaint/ChatComplaintDetailsModal";
// import ChatRaiseSummaryCard from "./raise-chatbot-complaint/ChatRaiseSummaryCard";
// import ChatRaiseSuccessCard from "./raise-chatbot-complaint/ChatRaiseSuccessCard";

export default function Chatbot() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [currentStep, setCurrentStep] = useState<ChatStep>("STEP_0_GREETING");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hook for Track Complaint Flow
  const {
    state: trackState,
    fetchNewCaptcha,
    recordPhoneOrId,
    executeTrackQuery,
    resetTrackState,
    openDetailsModal,
    closeDetailsModal,
  } = useTrackComplaintChat();

  /* 
  // ── Raise Complaint Flow (Commented out for now as requested) ──
  const {
    loginMobile,
    setLoginMobile,
    loginCaptchaSvg,
    isLoginCaptchaLoading,
    fetchLoginCaptcha,
    sendLoginOtp,
    verifyLoginOtp,
    departmentOptions,
    steps: raiseSteps,
    currentStep: currentRaiseStep,
    currentStepIndex: raiseStepIndex,
    raiseFormData,
    isSubmitting: isRaiseSubmitting,
    handleSelectDepartment,
    handleAnswerStep,
    submitComplaint,
    resetRaiseFlow,
  } = useRaiseComplaintChat();
  */

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when step changes or window opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, currentStep]);

  // Reset & Initialize greeting (Step 0) - Only Track Complaints
  const initGreeting = useCallback(() => {
    resetTrackState();
    setCurrentStep("STEP_0_GREETING");
    setInputText("");

    setMessages([
      {
        id: "msg-welcome",
        role: "bot",
        text: t(
          "Namaste! 🙏 Welcome to Bihar Sahyog Helpline AI Assistant.\n\nI can help you track your registered complaints. How can I assist you today?",
          "नमस्ते! 🙏 बिहार सहयोग हेल्पलाइन एआई सहायक में आपका स्वागत है।\n\nमैं आपकी शिकायत की स्थिति जांचने में सहायता कर सकता हूँ। आज मैं आपकी क्या सहायता करूँ?",
        ),
        type: "step0_actions",
        actions: [
          {
            label: "🔍 Track Complaint",
            labelHindi: "🔍 शिकायत की स्थिति देखें",
            action: "track_complaint",
            variant: "primary",
          },
          // Raise Complaint commented out for now
          /*
          {
            label: "📝 Raise Complaint",
            labelHindi: "📝 नई शिकायत दर्ज करें",
            action: "raise_complaint",
            variant: "outline",
          },
          */
        ],
        timestamp: new Date(),
      },
    ]);
  }, [resetTrackState, t]);

  useEffect(() => {
    initGreeting();
  }, [initGreeting]);

  // Add a bot response with typing delay simulation
  const addBotMessage = (
    msg: Omit<ChatMessage, "id" | "role" | "timestamp">,
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          ...msg,
          id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          role: "bot",
          timestamp: new Date(),
        },
      ]);
    }, 450);
  };

  // ── Track Complaint Flow Initiator ──────────────────────────────────────────
  const startTrackComplaintFlow = async () => {
    setCurrentStep("TRACK_AWAITING_PHONE");
    addBotMessage({
      text: t(
        "Please enter your complaint id",
        "कृपया अपना फ़ोन नंबर (या शिकायत संख्या) दर्ज करें:",
      ),
      type: "default",
    });
  };

  // ── Action Button Clicks ────────────────────────────────────────────────────
  const handleActionClick = (action: string) => {
    if (action === "track_complaint") {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          role: "user",
          text: t("Track Complaint", "शिकायत की स्थिति देखें"),
          timestamp: new Date(),
        },
      ]);
      startTrackComplaintFlow();
    }
    /*
    else if (action === "raise_complaint") {
      // Raise complaint flow commented out for now
    }
    */
    else if (action === "reset") {
      initGreeting();
    }
  };

  // ── Main Form Submit Handler (Track Complaint Flow) ─────────────────────────
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isTyping || trackState.isSearching) return;

    const text = inputText.trim();
    if (!text) return;

    // Add user message to chat stream
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        role: "user",
        text,
        timestamp: new Date(),
      },
    ]);
    setInputText("");

    // Step 1: User entered Complaint ID / Phone
    if (currentStep === "TRACK_AWAITING_PHONE") {
      recordPhoneOrId(text);
      setIsTyping(true);

      try {
        const captchaRes = await fetchNewCaptcha();
        setIsTyping(false);
        setCurrentStep("TRACK_AWAITING_CAPTCHA");
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-captcha`,
            role: "bot",
            text: t(
              "Please enter the security code shown below:",
              "कृपया नीचे दिखाया गया सुरक्षा कोड दर्ज करें:",
            ),
            type: "captcha_prompt",
            captchaData: {
              svg: captchaRes.svg,
              captchaId: captchaRes.captchaId,
            },
            timestamp: new Date(),
          },
        ]);
      } catch (err: any) {
        setIsTyping(false);
        addBotMessage({
          text:
            err?.message ||
            t(
              "Failed to load security code. Please try again.",
              "सुरक्षा कोड लोड करने में विफल। कृपया पुनः प्रयास करें।",
            ),
          type: "error",
        });
      }
    } else if (currentStep === "TRACK_AWAITING_CAPTCHA") {
      // Step 2: User entered Captcha
      setIsTyping(true);

      try {
        const complaint = await executeTrackQuery(text);
        setIsTyping(false);
        setCurrentStep("TRACK_SHOW_RESULT");
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-result`,
            role: "bot",
            text: t(
              "✅ We found your complaint details! Here is the summary:",
              "✅ हमें आपकी शिकायत का विवरण मिल गया है! यहाँ सारांश दिया गया है:",
            ),
            type: "complaint_summary",
            complaintData: complaint,
            timestamp: new Date(),
          },
        ]);
      } catch (err: any) {
        setIsTyping(false);
        const errMsg =
          err?.message ||
          t(
            "No complaint found or invalid security code. Please check and try again.",
            "कोई शिकायत नहीं मिली या अमान्य सुरक्षा कोड। कृपया जांचें और पुनः प्रयास करें।",
          );

        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-err`,
            role: "bot",
            text: `⚠️ ${errMsg}`,
            type: "error",
            actions: [
              {
                label: "🔄 Try Again",
                labelHindi: "🔄 पुनः प्रयास करें",
                action: "track_complaint",
                variant: "primary",
              },
              {
                label: "🏠 Main Menu",
                labelHindi: "🏠 मुख्य मेनू",
                action: "reset",
                variant: "outline",
              },
            ],
            timestamp: new Date(),
          },
        ]);
      }
    } else {
      // Free text / Step 0 fallback
      const lower = text.toLowerCase();
      if (
        lower.includes("track") ||
        lower.includes("status") ||
        lower.includes("स्थिति") ||
        lower.includes("complaint") ||
        lower.includes("शिकायत")
      ) {
        startTrackComplaintFlow();
      } else {
        addBotMessage({
          text: t(
            "I can help you track your complaint status. Please click below to track:",
            "मैं आपकी शिकायत की स्थिति जांचने में सहायता कर सकता हूँ। कृपया ट्रैक करने के लिए नीचे क्लिक करें:",
          ),
          type: "step0_actions",
          actions: [
            {
              label: "🔍 Track Complaint",
              labelHindi: "🔍 शिकायत की स्थिति देखें",
              action: "track_complaint",
              variant: "primary",
            },
          ],
        });
      }
    }
  };

  // Input placeholder depending on step
  const getInputPlaceholder = () => {
    if (trackState.isSearching) {
      return t("Searching complaint...", "शिकायत खोजी जा रही है...");
    }
    if (currentStep === "TRACK_AWAITING_PHONE") {
      return t("Enter Complaint ID...", "शिकायत संख्या दर्ज करें...");
    }
    if (currentStep === "TRACK_AWAITING_CAPTCHA") {
      return t(
        "Enter security code shown above...",
        "ऊपर दिखाया गया सुरक्षा कोड दर्ज करें...",
      );
    }
    return t(
      "Type a message or click Track Complaint...",
      "संदेश टाइप करें या शिकायत ट्रैक करें...",
    );
  };

  return (
    <>
      {/* Floating Launcher Button on Bottom Right */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 hover:from-blue-800 hover:to-indigo-950 text-white rounded-full shadow-2xl shadow-blue-900/40 border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title={t("Open Bihar Sahyog Assistant", "बिहार सहयोग सहायक खोलें")}
          aria-label={t(
            "Open AI Sahyog Helpline Assistant",
            "एआई सहयोग हेल्पलाइन सहायक खोलें",
          )}
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-sky-300 transition-transform group-hover:rotate-6" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-blue-900 animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-tight flex items-center gap-1">
              <span>{t("Sahyog AI Assistant", "सहयोग एआई सहायक")}</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>
            <div className="text-[10px] text-blue-200/80 leading-none">
              {t("Track Complaints", "शिकायत ट्रैक करें")}
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[95vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-card rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1C4D8D] to-[#0D2E5C] text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                <Bot className="w-5 h-5 text-sky-300" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-blue-950" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm tracking-tight truncate flex items-center gap-1.5">
                  <span>
                    {t("Bihar Sahyog Assistant", "बिहार सहयोग सहायक")}
                  </span>
                </h3>
                <span className="text-[10px] text-sky-200/90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                  {t("Online • Track Grievance", "ऑनलाइन • शिकायत ट्रैकर")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={initGreeting}
                title={t("Restart Conversation", "वार्तालाप पुनः आरंभ करें")}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title={t("Close Chat", "चैट बंद करें")}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-slate-950/40 text-foreground scrollbar-thin">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-br-xs"
                      : "bg-card text-foreground border border-border rounded-bl-xs"
                  }`}
                >
                  {m.text}

                  {/* Render Captcha Card if present */}
                  {m.type === "captcha_prompt" && m.captchaData && (
                    <ChatCaptchaPrompt
                      svgContent={trackState.captchaSvg || m.captchaData.svg}
                      onRefresh={fetchNewCaptcha}
                      isLoading={trackState.isCaptchaLoading}
                    />
                  )}

                  {/* Render Complaint Result Card if present */}
                  {m.type === "complaint_summary" && m.complaintData && (
                    <ChatComplaintCard
                      complaint={m.complaintData}
                      onViewFullDetails={openDetailsModal}
                      onTrackAnother={startTrackComplaintFlow}
                    />
                  )}

                  {/* Raise Complaint Cards (Commented out for now as requested) */}
                  {/*
                  {m.type === "raise_summary" && (
                    <ChatRaiseSummaryCard ... />
                  )}
                  {m.type === "raise_success" && (
                    <ChatRaiseSuccessCard ... />
                  )}
                  */}
                </div>

                {/* Action Buttons below message */}
                {m.actions && m.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.actions.map((act, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleActionClick(act.action)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1.5 ${
                          act.variant === "primary"
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-card hover:bg-muted border border-border text-foreground hover:border-primary/50"
                        }`}
                      >
                        <span>{t(act.label, act.labelHindi || act.label)}</span>
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-muted-foreground mt-1 px-1 select-none">
                  {m.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}

            {/* Typing / Searching indicator */}
            {(isTyping || trackState.isSearching) && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
                <div className="bg-card border border-border rounded-2xl px-3.5 py-2 shadow-xs flex items-center gap-1.5">
                  {trackState.isSearching ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                      <span>
                        {t(
                          "Verifying & fetching complaint...",
                          "सत्यापन एवं शिकायत विवरण लाया जा रहा है...",
                        )}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-2.5 sm:p-3 border-t border-border bg-card flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={getInputPlaceholder()}
              disabled={isTyping || trackState.isSearching}
              className="flex-1 bg-muted/40 border border-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 min-w-0"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping || trackState.isSearching}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              title={t("Send", "भेजें")}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Full Details Modal for Tracking (Contains only 2 sections: Header & Timeline) */}
      <ChatComplaintDetailsModal
        isOpen={trackState.isModalOpen}
        onClose={closeDetailsModal}
        complaint={trackState.complaintResult}
      />
    </>
  );
}
