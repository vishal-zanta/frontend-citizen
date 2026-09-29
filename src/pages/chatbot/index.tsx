import React, { useEffect, useRef, useState } from "react";
import { Bot, X, Sparkles, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import FlowSelector from "./components/FlowSelector";
import ChatMessageInput from "./components/ChatMessageInput";
import moment, { Moment } from "moment";
import useTrackQuestions from "./flows/track/useTrackQuestions";
import useRaiseQuestion from "./flows/raise/useRaiseQuestion";

interface StaticMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  textHindi?: string;
  timestamp: Moment;
  Component?: React.JSX.Element | null;
  InputProps?: any;
  InputComponent?: React.ComponentType<any> | null;
}

export default function Chatbot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [flow, setFlow] = useState("");
  const quickActions = [
    {
      label: "Track Complaint",
      labelHindi: "शिकायत ट्रैक करें",
      key: "track",
    },
    {
      label: "Raise Complaint",
      labelHindi: "शिकायत दर्ज करें",
      key: "raise",
    },
    // { label: "Feedback", labelHindi: "प्रतिक्रिया", key: "feedback" },
  ];

  const handleFlowSelect = (key: string) => {
    setFlow(key);
    handleSendMessage(quickActions.find((q) => q.key === key)?.label);
  };

  const [messages, setMessages] = useState<StaticMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Namaste! Welcome to Bihar Sahyog Assistant. How can I help you today?",
      textHindi:
        "नमस्ते! बिहार सहयोग सहायक में आपका स्वागत है। आज मैं आपकी क्या सहायता कर सकता हूँ?",
      timestamp: moment(),
      Component: (
        <FlowSelector quickActions={quickActions} onClick={handleFlowSelect} />
      ),
      InputComponent: ChatMessageInput,
      InputProps: {
        value: inputText,
        onChange: (e: any) => setInputText(e.target.value),
        onSend: handleSendMessage,
        placeholder: t("Type a message...", "संदेश टाइप करें..."),
        hide: true,
        required : true
      },
    },
    // {
    //   id: "2",
    //   sender: "user",
    //   text: "Hello, I want to inquire about government services and grievance status.",
    //   textHindi: "नमस्ते, मैं सरकारी सेवाओं और शिकायत स्थिति के बारे में जानकारी चाहता हूँ।",
    //   timestamp: "10:01 AM",
    // },
    // {
    //   id: "3",
    //   sender: "bot",
    //   text: "Sure! Our portal allows you to easily track existing complaints, submit new grievances, or share feedback.",
    //   textHindi: "बिल्कुल! हमारा पोर्टल आपको शिकायतों को ट्रैक करने, नई शिकायत दर्ज करने या प्रतिक्रिया साझा करने की सुविधा देता है।",
    //   timestamp: "10:01 AM",
    // },
  ]);

  const messagesLengthRef = useRef(messages.length);
  const timerRef = useRef(null);

  function handleSendMessage(text?: string) {
    const trimmed = (text ?? inputText).trim();
    if (!trimmed) return;

    const userMsg: StaticMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: trimmed,
      timestamp: moment(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
  }
  function appendBotMessage(obj: StaticMessage) {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.id === "loader") {
        return [...prev.slice(0, -1), obj];
      }
      return [...prev, obj];
    });
  }

  function handleReset () {
    setInputText("");
    setFlow("");
    setMessages([
      {
        id: "1",
        sender: "bot",
        text: "Namaste! Welcome to Bihar Sahyog Assistant. How can I help you today?",
        textHindi:
          "नमस्ते! बिहार सहयोग सहायक में आपका स्वागत है। आज मैं आपकी क्या सहायता कर सकता हूँ?",
        timestamp: moment(),
        Component: (
          <FlowSelector
            quickActions={quickActions}
            onClick={handleFlowSelect}
          />
        ),
        InputComponent: ChatMessageInput,
        InputProps: {
          value: inputText,
          onChange: (e: any) => setInputText(e.target.value),
          onSend: handleSendMessage,
          placeholder: t("Type a message...", "संदेश टाइप करें..."),
          hide: true,
          required: true
        },
      },
    ]);
  };

  const track = useTrackQuestions(
    { handleSendMessage, appendBotMessage },
    flow === "track",
  );

  const raise = useRaiseQuestion(
    { handleSendMessage, appendBotMessage },
    flow === "raise",
  );

  const lastMessage = messages.findLast((message) => message?.sender === "bot");
  const InputComponent =
    flow === "track" && track?.InputComponent !== undefined
      ? track.InputComponent
      : flow === "raise" && raise?.InputComponent !== undefined
      ? raise.InputComponent
      : lastMessage?.InputComponent;
  const inputProps =
    flow === "track" && track?.inputProps !== undefined
      ? track.inputProps
      : flow === "raise" && raise?.inputProps !== undefined
      ? raise.inputProps
      : lastMessage?.InputProps;

  useEffect(() => {
    if (messagesLengthRef.current !== messages.length) {
      messagesLengthRef.current = messages.length;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if(timerRef.current){
            clearTimeout(timerRef.current);
          }
        timerRef.current =   setTimeout(() => {
            const el = document.querySelector(
              "#chat-bot-message-container",
            ) as HTMLDivElement;
            if (el) {
              el.scrollTo({ behavior: "smooth", top: el.scrollHeight });
            }
          }, 100);
        });
      });
    }
  }, [messages.length]);

  return (
    <>
      {/* ── Floating Launcher Button ────────────────────────────────────────── */}
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
              {t("Bihar Helpline Assistant", "बिहार हेल्पलाइन सहायक")}
            </div>
          </div>
        </button>
      )}

      {/* ── Chat UI Box ─────────────────────────────────────────────────────── */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[95vw] sm:w-[410px] h-[580px] max-h-[88vh] bg-card rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
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
                  {t("Online • Sahyog Helpline", "ऑनलाइन • सहयोग हेल्पलाइन")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleReset()}
                title={t("Reset Chat", "चैट रीसेट करें")}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {setIsOpen(false) ;
                  handleReset()}}
                title={t("Close Chat", "चैट बंद करें")}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Message Container */}
          <div
            id="chat-bot-message-container"
            className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-slate-950/40 text-foreground overscroll-contain scrollbar-thin"
          >
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? "bg-blue-600 text-white rounded-br-xs"
                        : "bg-card text-foreground border border-border rounded-bl-xs"
                    }`}
                  >
                    {msg.text ? t(msg.text, msg.textHindi || msg.text) : null}
                    {msg?.Component && (
                      <div className={msg.text ? "pt-2" : ""}>
                        {msg.Component}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-muted-foreground mt-1 px-1 select-none">
                    {msg.timestamp.format("h:mm A")}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Static Message Input */}
          {InputComponent === undefined ? (
            <ChatMessageInput
              value={inputText}
              onChange={(e: any) => setInputText(e.target.value)}
              onSend={handleSendMessage}
              placeholder={t("Type a message...", "संदेश टाइप करें...")}
              hide={false}
            />
          ) : InputComponent ? (
            <InputComponent {...inputProps} />
          ) : null}
        </div>
      )}

      {/* Track Complaint Details Modal */}
      {track?.ModalComponent}
    </>
  );
}
