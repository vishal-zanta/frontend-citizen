import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  RotateCw,
  Loader2,
  Printer,
  FileText,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCaptcha } from "@/api/auth.api";
import { getPublicComplaintStatus } from "@/api/complaints.api";
import LoaderErrWrapper from "@/components/LoaderErrWrapper";
import { getErrorToast, getSuccessToast } from "@/utils/helpers";
import ComplaintHeaderSection from "@/pages/citizen/track-complaint/components/viewComponents/ComplaintHeaderSection";
import ComplaintTimeline from "@/components/ComplaintTimeline";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSahyogTranslation } from "../../../translations";

export default function TrackWidget() {
  const { t } = useLanguage();
  const { t: sahyogT } = useSahyogTranslation();

  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [captcha, setCaptcha] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [complaintData, setComplaintData] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const {
    data: captchaData,
    refetch: refetchCaptcha,
    isLoading: isCaptchaLoading,
    isRefetching: isCaptchaRefetching,
    error: captchaQueryError,
  } = useQuery({
    queryKey: ["sahyog-track-captcha"],
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
      setIsDialogOpen(true);
      setError("");
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

  const handleSubmit = (e: React.FormEvent) => {
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

    // Validate format: e.g. BR-2026-000031
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

  const handlePrint = () => {
    window.print();
  };

  const currentTrackingId = `BR-${trackingNumber.trim().replace(/^BR-?/i, "")}`;

  return (
    <>
      <section className="py-14 px-4 sm:px-8 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {sahyogT.trackWidget.heading}
          </h2>
          <p className="text-blue-200 text-xs sm:text-sm mt-2 max-w-xl mx-auto font-normal">
            {sahyogT.trackWidget.subheading}
          </p>

          {/* Error Banner */}
          {error && (
            <div className="mt-4 max-w-2xl mx-auto p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 max-w-lg mx-auto bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/15 shadow-xl text-left space-y-4"
          >
            {/* Field 1: Tracking ID */}
            <div>
              <label className="block text-xs font-semibold text-blue-100 mb-1.5">
                {t("Tracking ID", "ट्रैकिंग आईडी")} *
              </label>
              <div className="flex rounded-xl border border-white/20 shadow-xs focus-within:ring-2 focus-within:ring-blue-400 overflow-hidden bg-white">
                <span className="inline-flex items-center px-3.5 bg-slate-100 text-slate-700 text-xs font-bold select-none border-r border-slate-200">
                  BR-
                </span>
                <input
                  type="text"
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
                  className="flex-1 px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
                  required
                />
              </div>
              <p className="text-[11px] text-blue-200/80 mt-1">
                {t(
                  "Format: BR-YYYY-XXXXXX (e.g. BR-2026-000031)",
                  "प्रारूप: BR-YYYY-XXXXXX (उदा. BR-2026-000031)",
                )}
              </p>
            </div>

            {/* Field 2: Captcha */}
            <div>
              <label className="block text-xs font-semibold text-blue-100 mb-1.5">
                {t("Security Code", "सुरक्षा कोड")} *
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  placeholder={t(
                    "Enter security code",
                    "सुरक्षा कोड दर्ज करें",
                  )}
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-white/20 bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <div className="flex items-center gap-2 shrink-0">
                  <LoaderErrWrapper
                    isLoading={isCaptchaLoading || isCaptchaRefetching}
                    error={captchaQueryError}
                    loaderClassName="pt-0 pb-0"
                  >
                    <div className="flex items-center justify-center bg-white border border-slate-200 rounded-xl h-10 select-none w-28 shrink-0 overflow-hidden">
                      {captchaData?.data ? (
                        <div
                          className="w-full h-full flex items-center justify-center [&_svg]:h-full [&_svg]:w-auto"
                          dangerouslySetInnerHTML={{ __html: captchaData.data }}
                        />
                      ) : (
                        <span className="text-[10px] text-slate-400">
                          {t("No Captcha", "कोई कैप्चा नहीं")}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
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
                    </button>
                  </LoaderErrWrapper>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={getStatusMutation.isPending}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-[0.99]"
            >
              {getStatusMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    {t("Checking Status...", "स्थिति जांची जा रही है...")}
                  </span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>{sahyogT.trackWidget.btn}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Info Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{sahyogT.trackWidget.smsQuery}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{sahyogT.trackWidget.downloadAtr}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-background">
          <DialogHeader className="border-b pb-3 mb-2 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <DialogTitle className="text-lg font-bold">
                {t("Complaint Details", "शिकायत का विवरण")}
              </DialogTitle>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 font-mono ml-2">
                {currentTrackingId}
              </span>
            </div>

            {/* <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="gap-1.5 text-xs mr-6 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t("Print", "प्रिंट करें")}</span>
            </Button> */}
          </DialogHeader>

          {complaintData && (
            <div className="space-y-6 pt-2">
              {/* Header Details Card */}
              <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-2xs">
                <ComplaintHeaderSection
                  complaint={complaintData}
                  t={t}
                  onPrint={null}
                />
              </div>

              {/* Timeline Lifecycle */}
              {complaintData?.timeline && complaintData.timeline.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-2xs">
                  <h3 className="font-bold text-foreground mb-4 text-sm sm:text-base">
                    {t("Complaint Timeline", "शिकायत समयरेखा")} -{" "}
                    {t("End-to-End Lifecycle", "संपूर्ण जीवनचक्र")}
                  </h3>
                  <ComplaintTimeline events={complaintData.timeline} t={t} />
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
