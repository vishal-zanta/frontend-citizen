import { useState, useCallback } from "react";
import type React from "react";
import type { RootMessage, ActiveFlow, ChatAction } from "../types";
import { rootQuestions } from "../config/rootQuestions";
import { useLanguage } from "@/context/LanguageContext";

/** Partial message accepted by addBotMessage / addUserMessage */
type PartialMsg = Omit<RootMessage, "id" | "role" | "timestamp">;

export interface ChatEngineReturn {
  rootMessages: RootMessage[];
  activeFlow: ActiveFlow;
  activeChatInput: React.ReactNode | null;
  isTyping: boolean;
  addUserMessage: (text: string, extra?: Partial<RootMessage>) => void;
  addBotMessage: (msg: PartialMsg, delayMs?: number) => void;
  setActiveChatInput: (node: React.ReactNode | null) => void;
  resetToRoot: () => void;
  startFlow: (flow: ActiveFlow) => void;
  setIsTyping: (v: boolean) => void;
}

/**
 * useChatEngine — single root state for the chatbot shell.
 * All flow-specific hooks interact only via the returned dispatch helpers.
 */
export function useChatEngine(): ChatEngineReturn {
  const { t } = useLanguage();

  const [rootMessages, setRootMessages] = useState<RootMessage[]>([]);
  const [activeFlow, setActiveFlow] = useState<ActiveFlow>("none");
  const [activeChatInput, setActiveChatInput] =
    useState<React.ReactNode | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const makeId = () =>
    `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  const addUserMessage = useCallback(
    (text: string, extra?: Partial<RootMessage>) => {
      setRootMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "user",
          text,
          timestamp: new Date(),
          ...extra,
        },
      ]);
    },
    []
  );

  const addBotMessage = useCallback(
    (msg: PartialMsg, delayMs = 450) => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setRootMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: "bot",
            timestamp: new Date(),
            ...msg,
          },
        ]);
      }, delayMs);
    },
    []
  );

  // ── Reset to root greeting ───────────────────────────────────────────────────

  const resetToRoot = useCallback(() => {
    setActiveFlow("none");
    setActiveChatInput(null);
    setIsTyping(false);

    const q = rootQuestions[0];
    const greetingText = t(q.questionText, q.questionTextHindi || q.questionText);
    const greetingActions: ChatAction[] = (q.actions || []).map((a) => ({
      ...a,
      labelHindi: a.labelHindi || a.label,
    }));

    setRootMessages([
      {
        id: "msg-greeting",
        role: "bot",
        text: greetingText,
        actions: greetingActions,
        customComponent: q.customComponent ?? null,
        timestamp: new Date(),
      },
    ]);
  }, [t]);

  // ── Start a flow (called when a pill is clicked) ─────────────────────────────

  const startFlow = useCallback((flow: ActiveFlow) => {
    setActiveFlow(flow);
    setActiveChatInput(null); // sub-flow sets this if needed
  }, []);

  return {
    rootMessages,
    activeFlow,
    activeChatInput,
    isTyping,
    addUserMessage,
    addBotMessage,
    setActiveChatInput,
    resetToRoot,
    startFlow,
    setIsTyping,
  };
}
