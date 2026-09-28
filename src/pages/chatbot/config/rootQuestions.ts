import type { RootQuestion } from "../types";

/**
 * Root-level question config.
 * Each entry becomes the FIRST bot message in the chat window.
 * To add new entry pills: add an action object here — no other file needs changing.
 */
export const rootQuestions: RootQuestion[] = [
  {
    id: "greeting",
    questionText:
      "Namaste! 🙏 Welcome to Bihar Sahyog Helpline AI Assistant.\n\nHow can I assist you today?",
    questionTextHindi:
      "नमस्ते! 🙏 बिहार सहयोग हेल्पलाइन एआई सहायक में आपका स्वागत है।\n\nआज मैं आपकी क्या सहायता करूँ?",
    customComponent: null,
    customInput: null, // no custom input at root — pills drive navigation
    actions: [
      {
        label: "🔍 Track Complaint",
        labelHindi: "🔍 शिकायत ट्रैक करें",
        action: "track_complaint",
        variant: "primary",
      },
      {
        label: "📝 Raise Complaint",
        labelHindi: "📝 शिकायत दर्ज करें",
        action: "raise_complaint",
        variant: "outline",
      },
      {
        label: "💬 Feedback",
        labelHindi: "💬 प्रतिक्रिया",
        action: "feedback",
        variant: "outline",
      },
    ],
  },
];
