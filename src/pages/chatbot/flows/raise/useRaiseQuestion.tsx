import moment from "moment";
import React, { useEffect, useState } from "react";
import ChatMessageInput from "../../components/ChatMessageInput";
import ChatCaptchaPrompt from "../../components/ChatCaptchaPrompt";
import { getCaptcha, sendOtp, postLogin } from "@/api/auth.api";
import useRaiseComplaintForm from "./useRaiseComplaintForm";

const initialLoginForm = {
  mobile: "",
  captcha: "",
  captchaId: "",
  captchaSvg: "",
  otp: "",
};

const useRaiseQuestion = (
  { handleSendMessage, appendBotMessage }: any,
  isFlowEnabled = false,
) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isErrorState, setIsErrorState] = useState(false);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [token, setToken] = useState<string>(() => {
    return  sessionStorage.getItem("usertoken") || "";
  });

  const loaderMessage = {
    id: "loader",
    sender: "bot" as const,
    text: "",
    timestamp: moment(),
    Component: (
      <div className="flex items-center gap-1.5 py-1 px-1">
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
      </div>
    ),
  };

  const fetchCaptcha = async () => {
    try {
      const res = await getCaptcha();
      const captchaId =
        res?.headers?.["x-captcha-id"] || res?.headers?.["X-Captcha-Id"] || "";
      const svg = res?.data || "";
      setLoginForm((prev) => ({
        ...prev,
        captchaId,
        captchaSvg: svg,
        captcha: "",
      }));
      return { captchaId, svg };
    } catch (err) {
      console.error("Failed to load captcha for raise flow", err);
      return null;
    }
  };

  async function handleSendOtp(mobile: string, captchaVal: string) {
    try {
      await sendOtp({
        mobile: mobile.trim(),
        captchaId: loginForm.captchaId,
        captchaValue: captchaVal.trim(),
      });

      setCurrentStep(2); // advance to OTP step
      appendBotMessage({
        id: "raise-bot-otp",
        sender: "bot",
        text: `OTP sent successfully to +91 ${mobile.trim()}. Please enter the 6-digit OTP to verify:`,
        textHindi: `ओटीपी सफलतापूर्वक +91 ${mobile.trim()} पर भेजा गया। कृपया सत्यापन के लिए 6 अंकों का ओटीपी दर्ज करें:`,
        timestamp: moment(),
        Component: null,
      });
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to send OTP. Please check security code and try again.";

      // Reset captchaId and captcha input value on failure
      setLoginForm((prev) => ({
        ...prev,
        captchaId: "",
        captcha: "",
      }));
      setIsErrorState(true);

      appendBotMessage({
        id: `raise-otp-err-${Date.now()}`,
        sender: "bot",
        text: `⚠️ ${errMsg}`,
        textHindi: `⚠️ ${errMsg}`,
        timestamp: moment(),
        Component: (
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={async () => {
                setIsErrorState(false);
                setCurrentStep(1);
                const freshCaptcha = await fetchCaptcha();
                appendBotMessage({
                  id: "raise-bot-captcha",
                  sender: "bot",
                  text: "Please enter the security code shown below to verify your phone number:",
                  textHindi: "अपने फ़ोन नंबर को सत्यापित करने के लिए कृपया नीचे दिखाया गया सुरक्षा कोड दर्ज करें:",
                  timestamp: moment(),
                  Component: (
                    <ChatCaptchaPrompt
                      svgContent={freshCaptcha?.svg || ""}
                      onCaptchaLoaded={(cid, svg) => {
                        setLoginForm((p) => ({
                          ...p,
                          captchaId: cid,
                          captchaSvg: svg,
                          captcha: "",
                        }));
                      }}
                    />
                  ),
                });
              }}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs active:scale-95 transition-all"
            >
              🔄 Try Again
            </button>
          </div>
        ),
      });
    }
  }

  async function handleVerifyOtp(mobile: string, otpVal: string) {
    try {
      const res: any = await postLogin({ mobile: mobile.trim(), otp: otpVal.trim() });
      const receivedToken = res?.data?.data?.token;
      if (receivedToken) {
        setToken(receivedToken);
        // localStorage.setItem("usertoken", receivedToken);
        sessionStorage.setItem("usertoken", receivedToken);
        setCurrentStep(3); // login complete
      } else {
        throw new Error("Token not found in login response.");
      }
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid OTP. Please check and try again.";

      setIsErrorState(true);

      appendBotMessage({
        id: `raise-login-err-${Date.now()}`,
        sender: "bot",
        text: `⚠️ ${errMsg}`,
        textHindi: `⚠️ ${errMsg}`,
        timestamp: moment(),
        Component: (
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => {
                setIsErrorState(false);
                setCurrentStep(2);
                appendBotMessage({
                  id: "raise-bot-otp-retry",
                  sender: "bot",
                  text: "Please enter the 6-digit OTP sent to your phone:",
                  textHindi: "कृपया अपने फ़ोन पर भेजा गया 6 अंकों का ओटीपी दर्ज करें:",
                  timestamp: moment(),
                  Component: null,
                });
              }}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs active:scale-95 transition-all"
            >
              🔄 Re-enter OTP
            </button>
          </div>
        ),
      });
    }
  }

  const raiseQuestions = [
    // Step 0: Phone Number
    {
      id: "raise-bot-phone",
      sender: "bot" as const,
      text: "To raise a complaint, please enter your 10-digit mobile number:",
      textHindi: "शिकायत दर्ज करने के लिए, कृपया अपना 10 अंकों का मोबाइल नंबर दर्ज करें:",
      timestamp: moment(),
      Component: null,
      InputComponent: ChatMessageInput,
      InputProps: {
        placeholder: "9876543210",
        type: "text",
        isNumsOnly: true,
        maxLength: 10,
        required: true,
        value: loginForm.mobile,
        onChange: (e: any) =>
          setLoginForm((prev) => ({ ...prev, mobile: e.target.value })),
        onSend: (value: string) => {
          handleSendMessage(value);
          const cleanPhone = value.replace(/\D/g, "");
          setLoginForm((prev) => ({ ...prev, mobile: cleanPhone }));
          fetchCaptcha();
          setCurrentStep(1);
        },
      },
    },
    // Step 1: Captcha
    {
      id: "raise-bot-captcha",
      sender: "bot" as const,
      text: "Please enter the security code shown below to verify your phone number:",
      textHindi: "अपने फ़ोन नंबर को सत्यापित करने के लिए कृपया नीचे दिखाया गया सुरक्षा कोड दर्ज करें:",
      timestamp: moment(),
      Component: (
        <ChatCaptchaPrompt
          svgContent={loginForm.captchaSvg}
          onCaptchaLoaded={(cid, svg) => {
            setLoginForm((prev) => ({
              ...prev,
              captchaId: cid,
              captchaSvg: svg,
              captcha: "",
            }));
          }}
        />
      ),
      InputComponent: ChatMessageInput,
      InputProps: {
        placeholder: "Enter security code...",
        required: true,
        value: loginForm.captcha,
        maxLength: 6,
        onChange: (e: any) =>
          setLoginForm((prev) => ({ ...prev, captcha: e.target.value })),
        onSend: async (value: string) => {
          handleSendMessage(value);
          setLoginForm((prev) => ({ ...prev, captcha: value }));
          appendBotMessage(loaderMessage);
          await handleSendOtp(loginForm.mobile, value);
        },
      },
    },
    // Step 2: OTP
    {
      id: "raise-bot-otp-input",
      sender: "bot" as const,
      text: "",
      textHindi: "",
      timestamp: moment(),
      Component: null,
      InputComponent: ChatMessageInput,
      InputProps: {
        placeholder: "Enter 6-digit OTP",
        type: "text",
        isNumsOnly: true,
        maxLength: 6,
        required: true,
        value: loginForm.otp,
        onChange: (e: any) =>
          setLoginForm((prev) => ({ ...prev, otp: e.target.value })),
        onSend: async (value: string) => {
          handleSendMessage(value);
          setLoginForm((prev) => ({ ...prev, otp: value }));
          appendBotMessage(loaderMessage);
          await handleVerifyOtp(loginForm.mobile, value);
        },
      },
    },
    // Step 3: Logged in (Ready for complaint form part)
    {
      id: "raise-bot-ready",
      sender: "bot" as const,
      text: "",
      textHindi: "",
      timestamp: moment(),
      Component: null,
      InputComponent: null,
      InputProps: {},
    },
  ];

  const activeQuestion = raiseQuestions[currentStep];

  useEffect(() => {
    if (isFlowEnabled && activeQuestion && currentStep < 2) {
      appendBotMessage({
        id: activeQuestion.id,
        sender: activeQuestion.sender,
        text: activeQuestion.text,
        textHindi: activeQuestion.textHindi,
        timestamp: moment(),
        Component: activeQuestion.Component,
      });
    }
  }, [isFlowEnabled, currentStep]);

  useEffect(() => {
    if (!isFlowEnabled) {
      setCurrentStep(0);
      setLoginForm(initialLoginForm);
      setIsErrorState(false);
    }
  }, [isFlowEnabled]);

  const isFormActive = isFlowEnabled && currentStep >= 3;

  const complaintForm = useRaiseComplaintForm({
    handleSendMessage,
    appendBotMessage,
    token,
    mobile: loginForm.mobile,
    isFlowActive: isFormActive,
    onResetFlow: () => {
      setCurrentStep(0);
      setLoginForm(initialLoginForm);
      setIsErrorState(false);
    },
  });

  return {
    InputComponent: isFlowEnabled && !isErrorState
      ? isFormActive
        ? complaintForm.InputComponent
        : activeQuestion?.InputComponent
      : null,
    inputProps: isFlowEnabled && !isErrorState
      ? isFormActive
        ? complaintForm.inputProps
        : activeQuestion?.InputProps
      : null,
    currentStep,
    setCurrentStep,
    loginForm,
    setLoginForm,
    token,
    setToken,
    isLoggedIn: currentStep >= 3,
    complaintForm,
  };
};

export default useRaiseQuestion;
