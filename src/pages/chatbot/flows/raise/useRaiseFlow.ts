import { useState, useCallback, createElement } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useRaiseComplaintChat } from "../../raise-chatbot-complaint/useRaiseComplaintChat";
import type { ChatEngineReturn } from "../../hooks/useChatEngine";
import ChatCaptchaPrompt from "../../track-chatbot-complaint/ChatCaptchaPrompt";
import ChatRaiseSummaryCard from "../../raise-chatbot-complaint/ChatRaiseSummaryCard";
import ChatRaiseSuccessCard from "../../raise-chatbot-complaint/ChatRaiseSuccessCard";

type EngineSlice = Pick<
  ChatEngineReturn,
  "addBotMessage" | "addUserMessage" | "setActiveChatInput" | "resetToRoot" | "setIsTyping"
>;

type RaiseStep =
  | "idle"
  | "login_mobile"
  | "login_captcha"
  | "login_otp"
  | "select_department"
  | "answering_steps"
  | "confirmation"
  | "submitted";

/**
 * useRaiseFlow — drives the Raise Complaint conversation through the shared engine.
 * Wraps the existing useRaiseComplaintChat hook; no existing API or card components
 * were changed.
 */
export function useRaiseFlow(engine: EngineSlice) {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState<RaiseStep>("idle");

  const raiseChat = useRaiseComplaintChat();

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const botMsg = (text: string, extra?: Record<string, any>) =>
    engine.addBotMessage({ text, ...extra });

  // ── 1. Start — ask for mobile ─────────────────────────────────────────────

  const start = useCallback(async () => {
    raiseChat.resetRaiseFlow();
    setStep("login_mobile");

    // Fetch login captcha immediately
    try {
      await raiseChat.fetchLoginCaptcha();
    } catch {
      // will be handled in handleInput
    }

    botMsg(
      t(
        "To raise a complaint, please enter your registered mobile number:",
        "शिकायत दर्ज करने के लिए कृपया अपना पंजीकृत मोबाइल नंबर दर्ज करें:"
      )
    );
  }, [engine, raiseChat, t]);

  // ── 2. Main input dispatcher ─────────────────────────────────────────────

  const handleInput = useCallback(
    async (text: string) => {
      const trimmed = text.trim();

      // ── Login: Mobile ──────────────────────────────────────────────────────
      if (step === "login_mobile") {
        raiseChat.setLoginMobile(trimmed);
        setStep("login_captcha");

        engine.setIsTyping(true);
        try {
          const res = await raiseChat.fetchLoginCaptcha();
          engine.setIsTyping(false);
          engine.addBotMessage({
            text: t(
              "Please enter the security code shown below:",
              "कृपया नीचे दिखाया गया सुरक्षा कोड दर्ज करें:"
            ),
            type: "captcha_prompt",
            customComponent: createElement(ChatCaptchaPrompt, {
              svgContent: res.svg,
              onRefresh: raiseChat.fetchLoginCaptcha,
              isLoading: false,
            }),
          }, 0);
        } catch (err: any) {
          engine.setIsTyping(false);
          botMsg(
            t(
              "Failed to load security code. Please try again.",
              "सुरक्षा कोड लोड करने में विफल।"
            )
          );
          setStep("login_mobile");
        }
        return;
      }

      // ── Login: Captcha → send OTP ──────────────────────────────────────────
      if (step === "login_captcha") {
        engine.setIsTyping(true);
        try {
          await raiseChat.sendLoginOtp(trimmed);
          engine.setIsTyping(false);
          setStep("login_otp");
          botMsg(
            t(
              "OTP sent to your mobile number. Please enter the OTP:",
              "आपके मोबाइल पर OTP भेजा गया है। कृपया OTP दर्ज करें:"
            )
          );
        } catch (err: any) {
          engine.setIsTyping(false);
          botMsg(
            `⚠️ ${err?.message || t("Failed to send OTP. Please try again.", "OTP भेजने में विफल।")}`
          );
        }
        return;
      }

      // ── Login: OTP verification ────────────────────────────────────────────
      if (step === "login_otp") {
        engine.setIsTyping(true);
        try {
          await raiseChat.verifyLoginOtp(trimmed);
          engine.setIsTyping(false);
          setStep("select_department");

          // Build department pill actions
          const deptActions = raiseChat.departmentOptions.slice(0, 10).map((d) => ({
            label: d.label,
            labelHindi: d.labelHindi || d.label,
            action: `dept:${d.value}`,
            variant: "outline" as const,
          }));

          engine.addBotMessage({
            text: t(
              "✅ Login successful! Please select the department related to your complaint:",
              "✅ लॉगिन सफल! कृपया अपनी शिकायत से संबंधित विभाग चुनें:"
            ),
            actions: deptActions,
          }, 0);
        } catch (err: any) {
          engine.setIsTyping(false);
          botMsg(`⚠️ ${err?.message || t("Invalid OTP. Please try again.", "अमान्य OTP।")}`);
        }
        return;
      }

      // ── Department selection via pill (action prefix "dept:") ──────────────
      // (This is handled via handleAction below for pill clicks)

      // ── Answering form steps ───────────────────────────────────────────────
      if (step === "answering_steps") {
        const result = raiseChat.handleAnswerStep(trimmed);
        if (!result) return;

        const { isCompleted, nextStep } = result;

        if (isCompleted) {
          setStep("confirmation");
          engine.addBotMessage({
            text: t(
              "Here's a summary of your complaint. Please review and confirm:",
              "यहाँ आपकी शिकायत का सारांश है। कृपया समीक्षा करें और पुष्टि करें:"
            ),
            type: "raise_summary",
            customComponent: createElement(ChatRaiseSummaryCard, {
              formData: raiseChat.raiseFormData,
              isSubmitting: false,
              onConfirm: handleConfirm,
              onCancel: () => {
                engine.addUserMessage(t("Cancel", "रद्द करें"));
                engine.resetToRoot();
              },
            }),
          }, 0);
        } else if (nextStep) {
          const questionText =
            lang === "hi" && nextStep.labelHindi ? nextStep.labelHindi : nextStep.label;

          // If it's a select step render option pills
          if (nextStep.type === "select" && nextStep.options && nextStep.options.length > 0) {
            const optActions = nextStep.options.map((o) => ({
              label: o.label,
              labelHindi: o.labelHindi || o.label,
              action: `step_opt:${o.value}`,
              variant: "outline" as const,
            }));
            engine.addBotMessage({ text: questionText, actions: optActions });
          } else {
            engine.addBotMessage({
              text: questionText,
              payload: { stepKey: nextStep.key, placeholder: nextStep.placeholder },
            });
          }
        }
        return;
      }
    },
    [step, engine, raiseChat, lang, t]
  );

  // ── Handle pill / action clicks ──────────────────────────────────────────

  const handleAction = useCallback(
    async (action: string) => {
      // Department selection pill
      if (action.startsWith("dept:")) {
        const deptValue = action.replace("dept:", "");
        const info = raiseChat.handleSelectDepartment(deptValue);
        engine.addUserMessage(info.deptName);
        setStep("answering_steps");

        const firstStep = raiseChat.steps[0];
        if (firstStep) {
          const questionText =
            lang === "hi" && firstStep.labelHindi ? firstStep.labelHindi : firstStep.label;

          if (firstStep.type === "select" && firstStep.options && firstStep.options.length > 0) {
            const optActions = firstStep.options.map((o) => ({
              label: o.label,
              labelHindi: o.labelHindi || o.label,
              action: `step_opt:${o.value}`,
              variant: "outline" as const,
            }));
            engine.addBotMessage({ text: questionText, actions: optActions });
          } else {
            engine.addBotMessage({ text: questionText });
          }
        }
        return;
      }

      // Step option pill
      if (action.startsWith("step_opt:")) {
        const value = action.replace("step_opt:", "");
        // Inject as if user typed the value
        engine.addUserMessage(value);
        await handleInput(value);
        return;
      }
    },
    [engine, raiseChat, lang, handleInput]
  );

  // ── Confirm & submit ─────────────────────────────────────────────────────

  const handleConfirm = useCallback(async () => {
    engine.addUserMessage(t("✅ Confirm & Submit", "✅ पुष्टि करें और जमा करें"));
    engine.setIsTyping(true);
    try {
      const result = await raiseChat.submitComplaint();
      engine.setIsTyping(false);
      setStep("submitted");
      engine.addBotMessage({
        text: t(
          "🎉 Your complaint has been submitted successfully!",
          "🎉 आपकी शिकायत सफलतापूर्वक दर्ज हो गई है!"
        ),
        type: "raise_success",
        customComponent: createElement(ChatRaiseSuccessCard, {
          complaintData: result,
          onTrackComplaint: () => {},
          onReset: () => engine.resetToRoot(),
        }),
      }, 0);
    } catch (err: any) {
      engine.setIsTyping(false);
      botMsg(`⚠️ ${err?.message || t("Submission failed. Please try again.", "जमा करने में विफल।")}`);
    }
  }, [engine, raiseChat, t]);

  const reset = useCallback(() => {
    raiseChat.resetRaiseFlow();
    setStep("idle");
  }, [raiseChat]);

  return {
    step,
    start,
    handleInput,
    handleAction,
    handleConfirm,
    reset,
  };
}
