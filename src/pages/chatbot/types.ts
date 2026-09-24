export type ChatRole = "bot" | "user" | "system";

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
