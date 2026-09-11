import React, { useState, useEffect } from "react";
import AuthLayout from "@/components/AuthLayout";
import HomeLayout from "@/components/HomeLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FileText,
  RotateCw,
  ArrowLeft,
  Loader2,
  Search,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCaptcha } from "@/api/auth.api";
import { getPublicComplaintStatus } from "@/api/complaints.api";
import LoaderErrWrapper from "@/components/LoaderErrWrapper";
import { getErrorToast, getSuccessToast } from "@/utils/helpers";
import ComplaintHeaderSection from "@/pages/citizen/track-complaint/components/viewComponents/ComplaintHeaderSection";
import ComplaintTimeline from "@/components/ComplaintTimeline";
import { useNavigate } from "react-router-dom";

const CompliantDetails = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [captcha, setCaptcha] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [complaintData, setComplaintData] = useState<any>(null);
  const navigate = useNavigate();

  const {
    data: captchaData,
    refetch: refetchCaptcha,
    isLoading: isCaptchaLoading,
    isRefetching: isCaptchaRefetching,
    error: captchaQueryError,
  } = useQuery({
    queryKey: ["public-complaint-captcha"],
    queryFn: getCaptcha,
  });

  const getStatusMutation = useMutation({
    mutationFn: getPublicComplaintStatus,
    onSuccess: (res: any) => {
      getSuccessToast(
        t(
          "Complaint status fetched successfully",
          "शिकायत की स्थिति सफलतापूर्वक प्राप्त की गई",
        ),
      );
      const data = res?.data?.data || res?.data;
      setComplaintData(data);
      setStep(2);
    },
    onError: (err: any) => {
      getErrorToast(err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        t("Failed to track complaint", "शिकायत ट्रैक करने में विफल");
      setError(msg);
      setCaptcha("");
      refetchCaptcha();
    },
  });

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanedNumber = trackingNumber.trim().replace(/^BR-?/i, "");
    if (!cleanedNumber) {
      setError(
        t(
          "Please enter your Tracking ID",
          "कृपया अपनी ट्रैकिंग आईडी दर्ज करें",
        ),
      );
      return;
    }

    const fullTrackingId = `BR-${cleanedNumber}`;

    // Validate format: e.g. BR-2026-000031 (BR-YYYY-XXXXXX)
    const trackingRegex = /^BR-\d{4}-\d{5,10}$/i;
    if (!trackingRegex.test(fullTrackingId)) {
      setError(
        t(
          "Invalid Tracking ID format. Expected format: BR-2026-000031",
          "अमान्य ट्रैकिंग आईडी प्रारूप। अपेक्षित प्रारूप: BR-2026-000031",
        ),
      );
      return;
    }

    const captchaId = captchaData?.headers?.["x-captcha-id"];
    if (!captcha.trim()) {
      setError(t("Please enter security code", "कृपया सुरक्षा कोड दर्ज करें"));
      return;
    }

    getStatusMutation.mutate({
      complaintId: fullTrackingId,
      params: {
        captchaId: captchaId || "",
        captchaValue: captcha.trim(),
      },
    });
  };

  const handleBackToSearch = () => {
    setStep(1);
    setCaptcha("");
    setError("");
    refetchCaptcha();
    navigate("/login")
  };

  if (step === 2) {
    return (
      <Step2
        t={t}
        data={complaintData}
        trackingId={`BR-${trackingNumber.trim().replace(/^BR-?/i, "")}`}
        onBack={handleBackToSearch}
      />
    );
  }

  return (
    <HomeLayout>
      <AuthLayout
        icon={FileText}
        title={t("Track Complaint Status", "शिकायत की स्थिति ट्रैक करें")}
        subtitle={t(
          "Enter your Tracking ID and security code to view status",
          "स्थिति देखने के लिए अपनी ट्रैकिंग आईडी और सुरक्षा कोड दर्ज करें",
        )}
        footer={<Button variant="link" onClick={() => navigate("/login")} className="cursor-pointer" >Back to login</Button>}
      >
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleTrackingSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Field 1: Tracking ID */}
            <div className="space-y-2">
              <Label
                htmlFor="trackingId"
                className="text-sm font-semibold text-foreground"
              >
                {t("Tracking ID", "ट्रैकिंग आईडी")}
              </Label>
              <div className="flex rounded-lg border border-input shadow-xs focus-within:ring-2 focus-within:ring-ring focus-within:border-ring overflow-hidden bg-background">
                <span className="inline-flex items-center px-3.5 bg-muted text-muted-foreground text-sm font-bold select-none border-r border-input">
                  BR-
                </span>
                <Input
                  id="trackingId"
                  value={trackingNumber}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (val.toUpperCase().startsWith("BR-")) {
                      val = val.slice(3);
                    } else if (val.toUpperCase().startsWith("BR")) {
                      val = val.slice(2);
                    }
                    setTrackingNumber(val);
                  }}
                  placeholder="2026-000031"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 !h-10 sm:!h-12 text-sm font-medium"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {t(
                  "Format: BR-YYYY-XXXXXX (e.g. BR-2026-000031)",
                  "प्रारूप: BR-YYYY-XXXXXX (उदा. BR-2026-000031)",
                )}
              </p>
            </div>

            {/* Field 2: Captcha */}
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
                  className="flex-1 !h-10 sm:!h-12"
                  required
                />
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 shrink-0">
                  <LoaderErrWrapper
                    isLoading={isCaptchaLoading || isCaptchaRefetching}
                    error={captchaQueryError}
                    loaderClassName="pt-0 pb-0"
                  >
                    <div className="flex items-center justify-center bg-white dark:bg-slate-100 border border-border rounded-lg h-12 select-none w-32 shrink-0 overflow-hidden">
                      {captchaData?.data ? (
                        <div
                          className="w-full h-full flex items-center justify-center [&_svg]:h-full [&_svg]:w-auto"
                          dangerouslySetInnerHTML={{ __html: captchaData.data }}
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
                      onClick={() => refetchCaptcha()}
                      disabled={isCaptchaLoading || isCaptchaRefetching}
                      title={t("Refresh Captcha", "कैप्चा रिफ्रेश करें")}
                    >
                      <RotateCw
                        className={`h-4 w-4 ${
                          isCaptchaLoading || isCaptchaRefetching
                            ? "animate-spin"
                            : ""
                        }`}
                      />
                    </Button>
                  </LoaderErrWrapper>
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 sm:h-12 text-base font-semibold cursor-pointer"
            disabled={getStatusMutation.isPending}
          >
            {getStatusMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("Checking Status...", "स्थिति जांची जा रही है...")}
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                {t("Track Status", "स्थिति देखें")}
              </>
            )}
          </Button>
        </form>
      </AuthLayout>
    </HomeLayout>
  );
};

interface Step2Props {
  t: (en: string, hi?: string) => string;
  data: any;
  trackingId: string;
  onBack: () => void;
}

const Step2: React.FC<Step2Props> = ({ t, data, trackingId, onBack }) => {
  useEffect(() => {
    console.log("Complaint Details API Response Data:", data);
  }, [data]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <HomeLayout isHidePhoto={true}>
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 pt-0 sm:pt-0 space-y-6">
        <div className="flex items-center justify-between no-print">
          <Button
            variant="link"
            size="sm"
            onClick={onBack}
            className="gap-2 cursor-pointer text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to login", "लॉगिन पर वापस")}
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 font-mono">
              {trackingId}
            </span>
          </div>
        </div>

        <div className="print-area space-y-6">
          <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
            <ComplaintHeaderSection
              complaint={data}
              t={t}
              onPrint={handlePrint}
            />
          </div>

          {data?.timeline && data.timeline.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
              <h3 className="font-bold text-foreground mb-4">
                {t("Complaint Timeline", "शिकायत समयरेखा")} -{" "}
                {t("End-to-End Lifecycle", "संपूर्ण जीवनचक्र")}
              </h3>
              <ComplaintTimeline events={data.timeline} t={t} />
            </div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CompliantDetails;


