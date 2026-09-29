import { useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTrackComplaintChat } from "../../track-chatbot-complaint/useTrackComplaintChat";
import type { ChatEngineReturn } from "../../hooks/useChatEngine";
import ChatCaptchaPrompt from "../../track-chatbot-complaint/ChatCaptchaPrompt";
import ChatComplaintCard from "../../track-chatbot-complaint/ChatComplaintCard";
import React from "react";

type EngineSlice = Pick<
  ChatEngineReturn,
  "addBotMessage" | "addUserMessage" | "setActiveChatInput" | "resetToRoot" | "setIsTyping"
>;

/**
 * useTrackFlow — wraps the existing useTrackComplaintChat and
 * dispatches into the shared chat engine.
 */
export function useTrackFlow(engine: EngineSlice) {
  const { t } = useLanguage();
  const [step, setStep] = useState<"idle" | "awaiting_id" | "awaiting_captcha" | "done">("idle");

  const {
    state: trackState,
    fetchNewCaptcha,
    recordPhoneOrId,
    executeTrackQuery,
    resetTrackState,
    openDetailsModal,
    closeDetailsModal,
  } = useTrackComplaintChat();

  const start = useCallback(async () => {
    resetTrackState();
    setStep("awaiting_id");
    engine.addBotMessage({
      text: t(
        "Please enter your Complaint ID (e.g. BR-2026-000031):",
        "कृपया अपनी शिकायत संख्या दर्ज करें (उदा. BR-2026-000031):"
      ),
      type: "default",
    });
  }, [engine, resetTrackState, t]);

  const handleInput = useCallback(
    async (text: string) => {
      if (step === "awaiting_id") {
        recordPhoneOrId(text);
        engine.setIsTyping(true);
        try {
          const captchaRes = await fetchNewCaptcha();
          engine.setIsTyping(false);
          setStep("awaiting_captcha");
          // inject captcha component inside bot bubble
          engine.addBotMessage({
            text: t(
              "Please enter the security code shown below:",
              "कृपया नीचे दिखाया गया सुरक्षा कोड दर्ज करें:"
            ),
            type: "captcha_prompt",
            customComponent: React.createElement(ChatCaptchaPrompt, {
              svgContent: captchaRes.svg,
              onRefresh: fetchNewCaptcha,
              isLoading: false,
            }),
            payload: { captchaId: captchaRes.captchaId, svg: captchaRes.svg },
          }, 0);
        } catch (err: any) {
          engine.setIsTyping(false);
          engine.addBotMessage({
            text:
              err?.message ||
              t(
                "Failed to load security code. Please try again.",
                "सुरक्षा कोड लोड करने में विफल। कृपया पुनः प्रयास करें।"
              ),
            type: "error",
          });
        }
      } else if (step === "awaiting_captcha") {
        engine.setIsTyping(true);
        try {
          const complaint = await executeTrackQuery(text);
          engine.setIsTyping(false);
          setStep("done");
          engine.addBotMessage({
            text: t(
              "✅ We found your complaint details! Here is the summary:",
              "✅ हमें आपकी शिकायत का विवरण मिल गया है!"
            ),
            type: "complaint_summary",
            customComponent: React.createElement(ChatComplaintCard, {
              complaint,
              onViewFullDetails: openDetailsModal,
              onTrackAnother: start,
            }),
          }, 0);
        } catch (err: any) {
          engine.setIsTyping(false);
          const errMsg =
            err?.message ||
            t(
              "No complaint found or invalid security code. Please check and try again.",
              "कोई शिकायत नहीं मिली या अमान्य सुरक्षा कोड।"
            );
          engine.addBotMessage({
            text: `⚠️ ${errMsg}`,
            type: "error",
            actions: [
              { label: "🔄 Try Again", labelHindi: "🔄 पुनः प्रयास करें", action: "track_try_again", variant: "primary" },
              { label: "🏠 Main Menu", labelHindi: "🏠 मुख्य मेनू", action: "reset", variant: "outline" },
            ],
          });
        }
      }
    },
    [step, engine, recordPhoneOrId, fetchNewCaptcha, executeTrackQuery, openDetailsModal, start, t]
  );

  const reset = useCallback(() => {
    resetTrackState();
    setStep("idle");
  }, [resetTrackState]);

  return {
    step,
    trackState,
    start,
    handleInput,
    reset,
    openDetailsModal,
    closeDetailsModal,
    complaintResult: trackState.complaintResult,
    isModalOpen: trackState.isModalOpen,
  };
}
