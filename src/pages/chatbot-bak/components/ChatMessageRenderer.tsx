import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { RootMessage, ChatAction } from "../types";

interface ChatMessageRendererProps {
  msg: RootMessage;
  onActionClick: (action: string) => void;
}

/**
 * ChatMessageRenderer — renders a single RootMessage from the unified history.
 *
 * Layout per message:
 *   ┌─ bubble ───────────────────────────────────┐
 *   │ text                                        │
 *   │ [customComponent if present]                │
 *   └─────────────────────────────────────────────┘
 *   [action pills if present]
 *   timestamp
 *
 * `customInput` is NOT rendered here — it is lifted to the shell input bar.
 */
export function ChatMessageRenderer({
  msg,
  onActionClick,
}: ChatMessageRendererProps) {
  const { t } = useLanguage();

  const isUser = msg.role === "user";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      {/* Bubble */}
      <div
        className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-blue-600 text-white rounded-br-xs"
            : "bg-card text-foreground border border-border rounded-bl-xs"
        }`}
      >
        {msg.text}

        {/* customComponent — rendered inside the bubble below text */}
        {msg.customComponent && (
          <div className="mt-1">{msg.customComponent}</div>
        )}
      </div>

      {/* Action Pills */}
      {msg.actions && msg.actions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {msg.actions.map((act: ChatAction, i: number) => (
            <button
              key={`${act.action}-${i}`}
              type="button"
              onClick={() => onActionClick(act.action)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1.5 ${
                act.variant === "primary"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-card hover:bg-muted border border-border text-foreground hover:border-primary/50"
              }`}
            >
              {t(act.label, act.labelHindi || act.label)}
            </button>
          ))}
        </div>
      )}

      {/* Timestamp */}
      <span className="text-[9px] text-muted-foreground mt-1 px-1 select-none">
        {msg.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
}

export default ChatMessageRenderer;
