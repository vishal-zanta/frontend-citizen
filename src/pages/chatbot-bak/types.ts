import type React from "react";

export type ChatRole = "bot" | "user" | "system";

export type ActiveFlow = "none" | "track" | "raise" | "feedback";

export interface ChatAction {
  label: string;
  labelHindi?: string;
  action: string;
  variant?: "primary" | "secondary" | "outline";
}

export interface RaiseStepOption {
  label: string;
  value: string;
  labelHindi?: string;
}

export interface RaiseComplaintStep {
  key: string;
  label: string;
  labelHindi?: string;
  type: "select" | "text" | "number";
  options?: RaiseStepOption[];
  placeholder?: string;
  placeholderHindi?: string;
  required?: boolean;
}

/** A single entry in the root-level question config */
export interface RootQuestion {
  id: string;
  questionText: string;
  questionTextHindi?: string;
  /** Rendered inside the bot bubble BELOW questionText */
  customComponent?: React.ReactNode | null;
  /** Replaces the default text input bar while this question is active */
  customInput?: React.ReactNode | null;
  actions?: ChatAction[];
}

/** A single entry in the unified bi-directional message history */
export interface RootMessage {
  id: string;
  role: ChatRole;
  text: string;
  /** Rendered inside the bot bubble BELOW the text */
  customComponent?: React.ReactNode | null;
  /** Overrides input bar at shell level — set via setActiveChatInput */
  customInput?: React.ReactNode | null;
  actions?: ChatAction[];
  type?: string;
  payload?: Record<string, any>;
  timestamp: Date;
}

// ── Legacy aliases kept so existing imports still compile ──
export type ChatStep =
  | "STEP_0_GREETING"
  | "TRACK_AWAITING_PHONE"
  | "TRACK_AWAITING_CAPTCHA"
  | "TRACK_SHOW_RESULT"
  | "RAISE_LOGIN_PHONE"
  | "RAISE_LOGIN_CAPTCHA"
  | "RAISE_LOGIN_OTP"
  | "RAISE_AWAITING_DEPARTMENT"
  | "RAISE_STEP_QUESTION"
  | "RAISE_CONFIRMATION"
  | "RAISE_SUBMITTED";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  type?:
    | "default"
    | "step0_actions"
    | "captcha_prompt"
    | "complaint_summary"
    | "raise_summary"
    | "raise_success"
    | "error";
  captchaData?: {
    svg: string;
    captchaId: string;
  };
  complaintData?: any;
  raiseData?: Record<string, any>;
  actions?: ChatAction[];
  timestamp: Date;
}
