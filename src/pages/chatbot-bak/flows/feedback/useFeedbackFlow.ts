import { useState, useCallback, createElement } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { ChatEngineReturn } from "../../hooks/useChatEngine";
import { StarRatingInput } from "./StarRatingInput";

type EngineSlice = Pick<
  ChatEngineReturn,
  "addBotMessage" | "addUserMessage" | "setActiveChatInput" | "resetToRoot" | "setIsTyping"
>;

type FeedbackStep = "idle" | "awaiting_rating" | "awaiting_comment" | "done";

const STAR_LABELS: Record<number, { en: string; hi: string }> = {
  1: { en: "Very Poor ⭐", hi: "बहुत खराब ⭐" },
  2: { en: "Poor ⭐⭐", hi: "खराब ⭐⭐" },
  3: { en: "Average ⭐⭐⭐", hi: "औसत ⭐⭐⭐" },
  4: { en: "Good ⭐⭐⭐⭐", hi: "अच्छा ⭐⭐⭐⭐" },
  5: { en: "Excellent ⭐⭐⭐⭐⭐", hi: "शानदार ⭐⭐⭐⭐⭐" },
};

/**
 * useFeedbackFlow — two-step feedback collection:
 *  1. Star rating via custom input bar (StarRatingInput component)
 *  2. Optional text comment via default input
 */
export function useFeedbackFlow(engine: EngineSlice) {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState<FeedbackStep>("idle");
  const [ratingValue, setRatingValue] = useState(0);

  const start = useCallback(() => {
    setStep("awaiting_rating");
    setRatingValue(0);

    engine.addBotMessage({
      text: t(
        "We'd love to hear your feedback! 😊\nPlease rate your experience with the Bihar Sahyog helpline:",
        "हम आपकी प्रतिक्रिया सुनना चाहते हैं! 😊\nकृपया बिहार सहयोग हेल्पलाइन के साथ अपना अनुभव रेट करें:"
      ),
    });

    // Override input bar with star rating
    engine.setActiveChatInput(
      createElement(StarRatingInput, {
        onSubmit: (rating: number) => handleRating(rating),
      })
    );
  }, [engine, t]);

  const handleRating = useCallback(
    (rating: number) => {
      setRatingValue(rating);
      engine.setActiveChatInput(null); // restore default input

      const starLabel = STAR_LABELS[rating];
      engine.addUserMessage(lang === "hi" ? starLabel.hi : starLabel.en);

      setStep("awaiting_comment");
      engine.addBotMessage({
        text: t(
          `Thank you for rating us ${rating}/5! 🙏\nWould you like to share any additional comments? (Type 'skip' to skip)`,
          `${rating}/5 रेटिंग देने के लिए धन्यवाद! 🙏\nक्या आप कोई अतिरिक्त टिप्पणी साझा करना चाहेंगे? ('skip' लिखें अगर नहीं)`
        ),
      });
    },
    [engine, lang, t]
  );

  const handleInput = useCallback(
    (text: string) => {
      if (step !== "awaiting_comment") return;

      const comment = text.trim().toLowerCase() === "skip" ? null : text.trim();

      // Show thank-you message
      setStep("done");
      engine.addBotMessage({
        text: t(
          `✅ Thank you for your valuable feedback! Your response has been recorded.\n\nYou rated us ${ratingValue}/5${comment ? `\nComment: "${comment}"` : ""}.\n\nIs there anything else I can help you with?`,
          `✅ आपकी बहुमूल्य प्रतिक्रिया के लिए धन्यवाद! आपका जवाब दर्ज हो गया है।\n\nआपने ${ratingValue}/5 रेटिंग दी${comment ? `\nटिप्पणी: "${comment}"` : ""}।\n\nक्या मैं आपकी और सहायता कर सकता हूँ?`
        ),
        actions: [
          { label: "🏠 Main Menu", labelHindi: "🏠 मुख्य मेनू", action: "reset", variant: "primary" },
        ],
      });
    },
    [step, engine, ratingValue, t]
  );

  const reset = useCallback(() => {
    engine.setActiveChatInput(null);
    setStep("idle");
    setRatingValue(0);
  }, [engine]);

  return {
    step,
    start,
    handleInput,
    handleRating,
    reset,
  };
}
