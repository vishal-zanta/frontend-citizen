import React, { useRef, useEffect, useCallback } from "react";
import {
  Bot,
  Send,
  X,
  RotateCcw,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useChatEngine } from "./hooks/useChatEngine";
import { useTrackFlow } from "./flows/track/useTrackFlow";
import { useRaiseFlow } from "./flows/raise/useRaiseFlow";
import { useFeedbackFlow } from "./flows/feedback/useFeedbackFlow";
import { ChatMessageRenderer } from "./components/ChatMessageRenderer";
import ChatComplaintDetailsModal from "./track-chatbot-complaint/ChatComplaintDetailsModal";

export default function Chatbot() {
  const { t } = useLanguage();

  // ── Core engine ────────────────────────────────────────────────────────────
  const engine = useChatEngine();
  const {
    rootMessages,
    activeFlow,
    activeChatInput,
    isTyping,
    addUserMessage,
    resetToRoot,
    startFlow,
  } = engine;

  // ── Per-flow hooks ─────────────────────────────────────────────────────────
  const trackFlow = useTrackFlow(engine);
  const raiseFlow = useRaiseFlow(engine);
  const feedbackFlow = useFeedbackFlow(engine);

  // ── Dialog open state ──────────────────────────────────────────────────────
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputText, setInputText] = React.useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Init greeting on mount ─────────────────────────────────────────────────
  useEffect(() => {
    resetToRoot();
  }, [resetToRoot]);

  // ── Auto-scroll ────────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [rootMessages, isTyping]);

  // ── Focus input on open ────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, activeFlow]);

  // ── Handle pill / action button clicks ────────────────────────────────────
  const handleActionClick = useCallback(
    async (action: string) => {
      if (action === "reset") {
        // Inject visual user message then reset all flows
        trackFlow.reset();
        raiseFlow.reset();
        feedbackFlow.reset();
        resetToRoot();
        return;
      }

      if (action === "track_complaint" || action === "track_try_again") {
        addUserMessage(t("🔍 Track Complaint", "🔍 शिकायत ट्रैक करें"));
        startFlow("track");
        await trackFlow.start();
        return;
      }

      if (action === "raise_complaint") {
        addUserMessage(t("📝 Raise Complaint", "📝 शिकायत दर्ज करें"));
        startFlow("raise");
        await raiseFlow.start();
        return;
      }

      if (action === "feedback") {
        addUserMessage(t("💬 Feedback", "💬 प्रतिक्रिया"));
        startFlow("feedback");
        feedbackFlow.start();
        return;
      }

      // Delegate to active flow (e.g. dept:xxx, step_opt:xxx)
      if (activeFlow === "raise") {
        await raiseFlow.handleAction(action);
        return;
      }
    },
    [
      activeFlow,
      addUserMessage,
      startFlow,
      trackFlow,
      raiseFlow,
      feedbackFlow,
      resetToRoot,
      t,
    ]
  );

  // ── Handle text input submission ───────────────────────────────────────────
  const handleSendMessage = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (isTyping) return;

      const text = inputText.trim();
      if (!text) return;

      addUserMessage(text);
      setInputText("");

      if (activeFlow === "track") {
        await trackFlow.handleInput(text);
        return;
      }

      if (activeFlow === "raise") {
        await raiseFlow.handleInput(text);
        return;
      }

      if (activeFlow === "feedback") {
        feedbackFlow.handleInput(text);
        return;
      }

      // Root level free-text fallback
      const lower = text.toLowerCase();
      if (
        lower.includes("track") ||
        lower.includes("status") ||
        lower.includes("शिकायत") ||
        lower.includes("complaint")
      ) {
        startFlow("track");
        await trackFlow.start();
      } else if (
        lower.includes("raise") ||
        lower.includes("new") ||
        lower.includes("दर्ज")
      ) {
        startFlow("raise");
        await raiseFlow.start();
      } else if (
        lower.includes("feedback") ||
        lower.includes("rate") ||
        lower.includes("प्रतिक्रिया")
      ) {
        startFlow("feedback");
        feedbackFlow.start();
      } else {
        engine.addBotMessage({
          text: t(
            "I can help you track a complaint, raise a new complaint, or collect feedback. Please use the options below:",
            "मैं शिकायत ट्रैक करने, नई शिकायत दर्ज करने या प्रतिक्रिया देने में सहायता कर सकता हूँ।"
          ),
          actions: [
            { label: "🔍 Track Complaint", labelHindi: "🔍 शिकायत ट्रैक करें", action: "track_complaint", variant: "primary" },
            { label: "📝 Raise Complaint", labelHindi: "📝 शिकायत दर्ज करें", action: "raise_complaint", variant: "outline" },
            { label: "💬 Feedback", labelHindi: "💬 प्रतिक्रिया", action: "feedback", variant: "outline" },
          ],
        });
      }
    },
    [
      isTyping,
      inputText,
      activeFlow,
      addUserMessage,
      startFlow,
      trackFlow,
      raiseFlow,
      feedbackFlow,
      engine,
      t,
    ]
  );

  // ── Full reset (header button) ─────────────────────────────────────────────
  const handleFullReset = useCallback(() => {
    trackFlow.reset();
    raiseFlow.reset();
    feedbackFlow.reset();
    resetToRoot();
    setInputText("");
  }, [trackFlow, raiseFlow, feedbackFlow, resetToRoot]);

  // ── Input placeholder ──────────────────────────────────────────────────────
  const getPlaceholder = () => {
    if (activeFlow === "track") {
      if (trackFlow.step === "awaiting_id")
        return t("Enter Complaint ID...", "शिकायत संख्या दर्ज करें...");
      if (trackFlow.step === "awaiting_captcha")
        return t("Enter security code shown above...", "ऊपर दिखाया गया सुरक्षा कोड दर्ज करें...");
    }
    if (activeFlow === "raise") {
      return t("Type your answer...", "अपना जवाब दर्ज करें...");
    }
    if (activeFlow === "feedback") {
      return t("Type your comment or 'skip'...", "टिप्पणी दर्ज करें या 'skip' लिखें...");
    }
    return t("Type a message...", "संदेश टाइप करें...");
  };

  const isSearching = trackFlow.trackState.isSearching;
  const showDefaultInput = !activeChatInput; // show default input bar unless a flow has overridden it

  return (
    <>
      {/* ── Floating Launcher Button ────────────────────────────────────────── */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 hover:from-blue-800 hover:to-indigo-950 text-white rounded-full shadow-2xl shadow-blue-900/40 border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title={t("Open Bihar Sahyog Assistant", "बिहार सहयोग सहायक खोलें")}
          aria-label={t("Open AI Sahyog Helpline Assistant", "एआई सहयोग हेल्पलाइन सहायक खोलें")}
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
              {t("Track • Raise • Feedback", "ट्रैक • दर्ज • प्रतिक्रिया")}
            </div>
          </div>
        </button>
      )}

      {/* ── Chat Window ─────────────────────────────────────────────────────── */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[95vw] sm:w-[410px] h-[600px] max-h-[88vh] bg-card rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">

          {/* Header */}
          <div className="bg-gradient-to-r from-[#1C4D8D] to-[#0D2E5C] text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                <Bot className="w-5 h-5 text-sky-300" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-blue-950" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm tracking-tight truncate flex items-center gap-1.5">
                  <span>{t("Bihar Sahyog Assistant", "बिहार सहयोग सहायक")}</span>
                </h3>
                <span className="text-[10px] text-sky-200/90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                  {t("Online • Track • Raise • Feedback", "ऑनलाइन • ट्रैक • दर्ज • प्रतिक्रिया")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleFullReset}
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
            {rootMessages.map((msg) => (
              <ChatMessageRenderer
                key={msg.id}
                msg={msg}
                onActionClick={handleActionClick}
              />
            ))}

            {/* Typing / Searching indicator */}
            {(isTyping || isSearching) && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
                <div className="bg-card border border-border rounded-2xl px-3.5 py-2 shadow-xs flex items-center gap-1.5">
                  {isSearching ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                      <span>
                        {t(
                          "Verifying & fetching complaint...",
                          "सत्यापन एवं शिकायत विवरण लाया जा रहा है..."
                        )}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar — activeChatInput overrides the default text bar */}
          {activeChatInput ? (
            <>{activeChatInput}</>
          ) : (
            <form
              onSubmit={handleSendMessage}
              className="p-2.5 sm:p-3 border-t border-border bg-card flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={getPlaceholder()}
                disabled={isTyping || isSearching}
                className="flex-1 bg-muted/40 border border-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 min-w-0"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping || isSearching}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
                title={t("Send", "भेजें")}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}

      {/* Track Complaint Details Modal */}
      <ChatComplaintDetailsModal
        isOpen={trackFlow.isModalOpen}
        onClose={trackFlow.closeDetailsModal}
        complaint={trackFlow.complaintResult}
      />
    </>
  );
}
