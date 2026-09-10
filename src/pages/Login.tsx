import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  LogIn,
  Loader2,
  ArrowLeft,
  KeyRound,
  RotateCw,
  MessageSquare,
} from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCaptcha, sendOtp, postLogin } from "@/api/auth.api";
import { Input } from "@/components/ui/input";
import LoaderErrWrapper from "@/components/LoaderErrWrapper";
import { getErrorToast, getSuccessToast } from "@/utils/helpers";
import { useLanguage } from "@/context/LanguageContext";

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useLanguage();
  const [phone, setPhone] = useState<any>("");
  const [otp, setOtp] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [resendTimer, setResendTimer] = useState(0);
  const [showResendCaptcha, setShowResendCaptcha] = useState(false);
  const [resendCaptcha, setResendCaptcha] = useState("");

  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const {
    data,
    refetch,
    isLoading,
    isRefetching,
    error: queryError,
  } = useQuery({
    queryFn: getCaptcha,
    queryKey: ["captcha"],
  });

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (!!token && state?.redirect !== false) {
      navigate("/citizen");
    }
  }, [navigate]);

  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      getSuccessToast(t("OTP sent successfully", "ओटीपी सफलतापूर्वक भेजा गया"));
      setStep("otp");
      setResendTimer(30);
      setShowResendCaptcha(false);
      setResendCaptcha("");
    },
    onError: (err) => {
      getErrorToast(err);
      setCaptcha("");
      setResendCaptcha("");
      refetch();
    },
  });

  const handleConfirmResend = () => {
    if (!resendCaptcha) {
      setError(t("Please enter security code", "कृपया सुरक्षा कोड दर्ज करें"));
      return;
    }
    setError("");
    sendOtpMutation.mutate({
      mobile: phone,
      captchaId: data?.headers["x-captcha-id"],
      captchaValue: resendCaptcha,
    });
  };

  const verifyOtpMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (res: any) => {
      getSuccessToast(
        t("Logged in successfully", "सफलतापूर्वक लॉग इन किया गया"),
      );
      const token = res?.data?.data?.token;
      if (token) {
        localStorage.setItem("usertoken", token);
        sessionStorage.setItem("usertoken", token);
        navigate("/citizen");
      } else {
        setError(
          t("Token not found in response", "प्रतिक्रिया में टोकन नहीं मिला"),
        );
      }
    },
    onError: (err: any) => {
      getErrorToast(err);
    },
  });

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError(
        t(
          "Please enter a valid phone number",
          "कृपया एक मान्य फ़ोन नंबर दर्ज करें",
        ),
      );
      return;
    }
    if (!captcha) {
      setError(t("Please enter security code", "कृपया सुरक्षा कोड दर्ज करें"));
      return;
    }
    setError("");
    try {
      sendOtpMutation.mutate({
        mobile: phone,
        captchaId: data?.headers["x-captcha-id"],
        captchaValue: captcha,
      });
    } catch (err: any) {
      // Handled by mutation
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError(
        t("Please enter a 6-digit OTP", "कृपया 6 अंकों का ओटीपी दर्ज करें"),
      );
      return;
    }
    setError("");
    try {
      verifyOtpMutation.mutate({ mobile: phone, otp });
    } catch (err: any) {
      // Handled by mutation
    }
  };

  return (
    <AuthLayout
      icon={LogIn}
      title={t("Sahyog Helpline Portal", "सहयोग हेल्पलाइन पोर्टल")}
      subtitle={
        step === "phone"
          ? t(
              "Enter your phone number to sign in or register",
              "साइन इन या पंजीकरण करने के लिए अपना फ़ोन नंबर दर्ज करें",
            )
          : t("Verify your identity", "अपनी पहचान सत्यापित करें")
      }
      footer={
        <Button
          variant="link"
          onClick={() => navigate("/complaint")}
          className="cursor-pointer"
        >
          Track complaint
        </Button>
      }
    >
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
          {error}
        </div>
      )}

      {step === "phone" ? (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-semibold text-foreground"
              >
                {t("Phone Number", "फ़ोन नंबर")}
              </Label>
              <div className="relative">
                <PhoneInput
                  id="phone"
                  defaultCountry="IN"
                  countrySelectProps={{ disabled: true }}
                  placeholder={t(
                    "Enter your registered phone number",
                    "अपना पंजीकृत फ़ोन नंबर दर्ज करें",
                  )}
                  value={phone}
                  onChange={setPhone}
                  countries={["IN"]}
                  className="h-8.5 sm:h-12"
                  limitMaxLength
                  required
                  international={false}
                  countryCallingCodeEditable={false}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="captcha"
                className="text-sm font-semibold text-foreground"
              >
                {t("Security Code", "सुरक्षा कोड")}
              </Label>

              <div className="flex sm:flex-row flex-col sm:items-center gap-2">
                <Input
                  id="captcha"
                  placeholder={t(
                    "Enter security code",
                    "सुरक्षा कोड दर्ज करें",
                  )}
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  className="flex-1 !h-8.5 sm:!h-12"
                  required
                />
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 shrink-0">
                  <LoaderErrWrapper
                    isLoading={isLoading || isRefetching}
                    error={queryError}
                    loaderClassName={"pt-0 pb-0 "}
                  >
                    <div className="flex items-center justify-center bg-white dark:bg-slate-100 border border-border rounded-lg h-12 select-none w-32 shrink-0 overflow-hidden">
                      {data?.data ? (
                        <div
                          className="w-full h-full flex items-center justify-center [&_svg]:h-full [&_svg]:w-auto"
                          dangerouslySetInnerHTML={{ __html: data.data }}
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {t("No Captcha", "कोई कैप्चा नहीं")}
                        </span>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 text-muted-foreground hover:text-foreground shrink-0 rounded-lg cursor-pointer"
                      onClick={() => refetch()}
                      disabled={isLoading || isRefetching}
                      title={t("Refresh Captcha", "कैप्चा रिफ्रेश करें")}
                    >
                      <RotateCw
                        className={`h-4 w-4 ${isLoading || isRefetching ? "animate-spin" : ""}`}
                      />
                    </Button>
                  </LoaderErrWrapper>
                </div>
              </div>
            </div>
            {/* <p className="text-xs text-muted-foreground mt-1">
              {t(
                "We'll send a 6-digit verification code to this number.",
                "हम इस नंबर पर 6 अंकों का सत्यापन कोड भेजेंगे।"
              )}
            </p> */}
          </div>

          <Button
            type="submit"
            className="w-full h-12 font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer"
            disabled={loading}
          >
            {sendOtpMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t("Sending OTP...", "ओटीपी भेजा जा रहा है...")}
              </>
            ) : (
              <>
                <MessageSquare className="w-4 h-4 mr-2" />
                {t("Send OTP", "ओटीपी भेजें")}
              </>
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="otp"
                className="text-sm font-semibold text-foreground"
              >
                {showResendCaptcha
                  ? t(
                      "Enter new captcha to resend OTP",
                      "ओटीपी पुनः भेजने के लिए नया कैप्चा दर्ज करें",
                    )
                  : t("One-Time Password (OTP)", "वन-टाइम पासवर्ड (ओटीपी)")}
              </Label>
            </div>

            {!showResendCaptcha && (
              <p className="text-xs text-muted-foreground">
                {t(
                  "Enter the 6-digit code sent to",
                  "इस नंबर पर भेजा गया 6 अंकों का कोड दर्ज करें:",
                )}{" "}
                <span className="font-semibold text-foreground">{phone}</span>
              </p>
            )}

            {!showResendCaptcha && (
              <div className="flex justify-center py-2">
                <InputOTP maxLength={6} value={otp} onChange={setOtp} autoFocus>
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot
                      index={0}
                      className="w-10 h-12 text-lg font-bold"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-10 h-12 text-lg font-bold"
                    />
                    <InputOTPSlot
                      index={2}
                      className="w-10 h-12 text-lg font-bold"
                    />
                    <InputOTPSlot
                      index={3}
                      className="w-10 h-12 text-lg font-bold"
                    />
                    <InputOTPSlot
                      index={4}
                      className="w-10 h-12 text-lg font-bold"
                    />
                    <InputOTPSlot
                      index={5}
                      className="w-10 h-12 text-lg font-bold"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {showResendCaptcha && (
              <div className="space-y-2 mt-4 p-3 bg-muted/10 rounded-lg">
                <Label
                  htmlFor="resendCaptcha"
                  className="text-xs font-semibold"
                ></Label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                  <Input
                    id="resendCaptcha"
                    placeholder={t(
                      "Enter security code",
                      "सुरक्षा कोड दर्ज करें",
                    )}
                    value={resendCaptcha}
                    onChange={(e) => setResendCaptcha(e.target.value)}
                    className="flex-1 !h-8.5 sm:!h-12 text-sm"
                    required
                  />
                  <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 shrink-0">
                    <LoaderErrWrapper
                      isLoading={isLoading || isRefetching}
                      error={queryError}
                      loaderClassName="pt-0 pb-0"
                    >
                      <div className="flex items-center justify-center bg-white dark:bg-slate-100 border border-border rounded-lg h-12 select-none w-32 shrink-0 overflow-hidden">
                        {data?.data ? (
                          <div
                            className="w-full h-full flex items-center justify-center [&_svg]:h-full [&_svg]:w-auto"
                            dangerouslySetInnerHTML={{ __html: data.data }}
                          />
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            {t("No Captcha", "कोई कैप्चा नहीं")}
                          </span>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 text-muted-foreground hover:text-foreground shrink-0 rounded-lg cursor-pointer"
                        onClick={() => refetch()}
                        disabled={isLoading || isRefetching}
                        title={t("Refresh Captcha", "कैप्चा रिफ्रेश करें")}
                      >
                        <RotateCw
                          className={`h-4 w-4 ${isLoading || isRefetching ? "animate-spin" : ""}`}
                        />
                      </Button>
                    </LoaderErrWrapper>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleConfirmResend}
                  disabled={!resendCaptcha || sendOtpMutation.isPending}
                  className="w-full mt-2 h-12 text-xs"
                >
                  {sendOtpMutation.isPending ? (
                    <span className="flex items-center gap-2 justify-center">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      {t("Resending...", "पुनः भेजा जा रहा है...")}
                    </span>
                  ) : (
                    t("Confirm & Resend OTP", "पुष्टि करें और ओटीपी पुनः भेजें")
                  )}
                </Button>
              </div>
            )}

            {!showResendCaptcha && (
              <Button
                type="submit"
                className="w-full h-12 font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer"
                disabled={verifyOtpMutation.isPending}
              >
                {verifyOtpMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t("Verifying...", "सत्यापित किया जा रहा है...")}
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 mr-2" />
                    {t("Verify & Login", "सत्यापित करें और लॉगिन करें")}
                  </>
                )}
              </Button>
            )}

            <div className="text-center pt-2 space-y-2">
              <div>
                {resendTimer > 0 ? (
                  <span className="text-xs text-muted-foreground font-medium">
                    {t(
                      `Resend OTP in ${resendTimer}s`,
                      `${resendTimer}s में ओटीपी पुनः भेजें`,
                    )}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setShowResendCaptcha(true);
                      setResendCaptcha("");
                      refetch();
                    }}
                    disabled={sendOtpMutation.isPending || showResendCaptcha}
                    className="text-xs text-muted-foreground hover:text-primary hover:underline font-medium cursor-pointer disabled:opacity-50"
                  >
                    {t(
                      "Didn't receive code? Resend OTP",
                      "कोड नहीं मिला? ओटीपी पुनः भेजें",
                    )}
                  </button>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setError("");
                    setOtp("");
                    setShowResendCaptcha(false);
                    setResendCaptcha("");
                  }}
                  className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3 h-3" />{" "}
                  {t("Change Mobile Number", "मोबाइल नंबर बदलें")}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
