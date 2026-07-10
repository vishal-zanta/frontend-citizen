import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogIn, Loader2, ArrowLeft, Phone, KeyRound, RotateCw } from "lucide-react";
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

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState<any>("");
  const [otp, setOtp] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!!token) {
      navigate("/citizen");
    }
  }, [navigate]);

  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: (data)=> {
          getSuccessToast("OTP send successfully");
          setStep("otp");
    },
    onError : (err)=> {
      getErrorToast(err);
      setCaptcha("");
      refetch();
    }
  })

  const verifyOtpMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (res: any) => {
      getSuccessToast("Logged in successfully");
      const token = res?.data?.data?.token;
      if (token) {
        localStorage.setItem("usertoken", token);
        sessionStorage.setItem("usertoken", token);
        navigate("/citizen");
      } else {
        setError("Token not found in response");
      }
    },
    onError: (err: any) => {
      getErrorToast(err);
    },
  });

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError("Please enter a valid phone number");
      return;
    }
    if (!captcha) {
      setError("Please enter captcha");
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
      setError("Please enter a 6-digit OTP");
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
      title="Citizen Portal"
      subtitle={
        step === "phone"
          ? "Enter your phone number to sign in or register"
          : "Verify your identity"
      }
      footer={null}
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
              <Label htmlFor="phone" className="text-sm font-semibold">
                Phone Number
              </Label>
              <div className="relative">
                <PhoneInput
                  id="phone"
                  defaultCountry="IN"
                  countrySelectProps={{ disabled: true }}
                  placeholder="Enter your registered phone number"
                  value={phone}
                  onChange={setPhone}
                  countries={["IN"]}
                  className="h-12"
                  limitMaxLength
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="captcha" className="text-sm font-semibold">
                Security Code
              </Label>
             
                <div className="flex sm:flex-row flex-col sm:items-center gap-2">
                  <Input
                    id="captcha"
                    placeholder="Enter security code"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    className="flex-1 h-12"
                    required
                  />
                  <div className="sm:basis-1/2 flex justify-center  items-center gap-2">

             
                   <LoaderErrWrapper
                isLoading={isLoading || isRefetching}
                error={queryError}
              loaderClassName = {"pt-0 pb-0 "}
              >

            
                  <div className="flex items-center justify-center bg-muted/10 border border-border rounded-lg h-12 select-none w-32 shrink-0 overflow-hidden">
                    {data?.data ? (
                      <div
                        className="w-full h-full flex items-center justify-center [&_svg]:h-full [&_svg]:w-auto"
                        dangerouslySetInnerHTML={{ __html: data.data }}
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">No Captcha</span>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 text-muted-foreground hover:text-foreground shrink-0 rounded-lg cursor-pointer"
                    onClick={() => refetch()}
                    disabled={isLoading || isRefetching}
                    title="Refresh Captcha"
                  >
                    <RotateCw className={`h-4 w-4 ${(isLoading || isRefetching) ? "animate-spin" : ""}`} />
                  </Button>
                    </LoaderErrWrapper>
                         </div>
                </div>
           
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              We'll send a 6-digit verification code to this number.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full h-12 font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer"
            disabled={loading}
          >
            {sendOtpMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending OTP...
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 mr-2" />
                Send OTP
              </>
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="otp" className="text-sm font-semibold">
                One-Time Password (OTP)
              </Label>
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setError("");
                  setOtp("");
                }}
                className="text-xs text-primary hover:underline font-medium flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" /> Change Number
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              Enter the 6-digit code sent to{" "}
              <span className="font-semibold text-foreground">{phone}</span>
            </p>

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
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full h-12 font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer"
              disabled={verifyOtpMutation.isPending}
            >
              {verifyOtpMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 mr-2" />
                  Verify & Login
                </>
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  sendOtpMutation.mutate({
                    mobile: phone,
                    captchaId: data?.headers["x-captcha-id"],
                    captchaValue: captcha,
                  });
                }}
                disabled={sendOtpMutation.isPending}
                className="text-xs text-muted-foreground hover:text-primary hover:underline font-medium cursor-pointer"
              >
                {sendOtpMutation.isPending ? "Resending..." : "Didn't receive code? Resend OTP"}
              </button>
            </div>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
