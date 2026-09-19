import React, { useEffect, useState } from "react";
import { Rating } from "@/components/reui/rating";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postComplaintFeedback,
  resolveComplaint,
  reopenComplaint,
} from "@/api/complaints.api";
import { getErrorToast, getSuccessToast } from "@/utils/helpers";
import { useLanguage } from "@/context/LanguageContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  MessageSquare,
  Send,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

interface ComplaintFeedbackProps {
  complaintId: string;
  existingRating?: number;
  existingFeedback?: string;
  t: any;
  setSelected?: any;
  isWithin7Days:boolean
}

const ComplaintFeedback = ({
  complaintId,
  existingRating,
  existingFeedback,
  t: propT,
  setSelected,
  isWithin7Days= false
}: ComplaintFeedbackProps) => {
  const languageContext = useLanguage();
  const t = propT || languageContext?.t || ((en: string, hi: string) => en);
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(existingRating || 0);
  const [feedback, setFeedback] = useState(existingFeedback || "");
  const [statusAction, setStatusAction] = useState<"RESOLVED" | "REOPEN">("RESOLVED");
  const [reason, setReason] = useState("");

  const ratingLabels: Record<number, string> = {
    1: t("Poor", "खराब"),
    2: t("Fair", "औसत"),
    3: t("Good", "अच्छा"),
    4: t("Very Good", "बहुत अच्छा"),
    5: t("Excellent", "उत्कृष्ट"),
  };

  const isAlreadySubmitted =
    typeof existingRating === "number" && existingRating > 0;

  const mutation = useMutation({
    mutationFn: async () => {
      // 1. Submit rating and feedback
      await postComplaintFeedback({
        id: complaintId,
        data: { rating, feedbackText: feedback },
      });

      // 2. Call status API based on selection
      if (statusAction === "RESOLVED") {
        await resolveComplaint({
          id: complaintId,
          data: { remarks: reason },
        });
      } else if (statusAction === "REOPEN") {
        await reopenComplaint({
          id: complaintId,
          data: { reOpenReason: reason },
        });
      }
    },
    onSuccess: () => {
      getSuccessToast(
        statusAction === "RESOLVED"
          ? t(
              "Feedback submitted and complaint marked as resolved",
              "प्रतिक्रिया सबमिट की गई और शिकायत का समाधान चिह्नित किया गया",
            )
          : t(
              "Feedback submitted and complaint reopened successfully",
              "प्रतिक्रिया सबमिट की गई और शिकायत सफलतापूर्वक पुनः खोल दी गई",
            ),
      );
      queryClient.invalidateQueries({ queryKey: ["grievance"] });
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
      setSelected &&
        setSelected((prev: any) => ({
          ...prev,
          rating,
          feedbackText: feedback,
          status: statusAction === "RESOLVED" ? "RESOLVED" : "REOPENED",
        }));
    },
    onError: (err: any) => {
      getErrorToast(err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      getErrorToast({
        message: t(
          "Please select a rating before submitting",
          "कृपया सबमिट करने से पहले रेटिंग चुनें",
        ),
      });
      return;
    }
    if (!feedback.trim()) {
      getErrorToast({
        message: t(
          "Please provide your comments / suggestions",
          "कृपया अपनी टिप्पणियाँ / सुझाव दर्ज करें",
        ),
      });
      return;
    }
    if (!reason.trim()) {
      getErrorToast({
        message:
          statusAction === "RESOLVED"
            ? t(
                "Please enter remarks/reason for resolution",
                "कृपया समाधान के लिए टिप्पणी/कारण दर्ज करें",
              )
            : t(
                "Please enter a reason for reopening",
                "कृपया पुनः खोलने का कारण दर्ज करें",
              ),
      });
      return;
    }
    mutation.mutate();
  };

  useEffect(()=> {
    if(rating!== existingRating){
      setRating(existingRating || 0);
    }
    if(feedback !== existingFeedback){
      setFeedback(existingFeedback || "");
    }
  },[existingRating,existingFeedback])

  if (isAlreadySubmitted) {
    return (
      <div className="mt-6 p-4 bg-emerald-50/50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>{t("Feedback Submitted", "प्रतिक्रिया सबमिट की गई")}</span>
        </div>
        <div className="space-y-2 text-sm text-emerald-950 dark:text-emerald-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-emerald-800 dark:text-emerald-300">
              {t("Rating", "रेटिंग")}:
            </span>
            <Rating
              rating={existingRating}
              editable={false}
              showValue={true}
              ratingLabels={ratingLabels}
            />
          </div>
          {existingFeedback && (
            <div>
              <span className="font-medium text-emerald-800 dark:text-emerald-300">
                {t("Comments", "टिप्पणियाँ")}:
              </span>
              <p className="mt-1 p-3 bg-card rounded-lg border border-emerald-100 dark:border-emerald-900 text-foreground italic">
                "{existingFeedback}"
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-card border border-border rounded-xl space-y-4">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3>{t("Rate Resolution Experience", "समाधान अनुभव को रेट करें")}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="mb-2 block text-sm font-medium text-muted-foreground">
            {t(
              "How satisfied are you with the resolution? *",
              "आप समाधान से कितने संतुष्ट हैं? *",
            )}
          </Label>
          <Rating
            rating={rating}
            editable={true}
            onRatingChange={(val) => setRating(val)}
            showValue={true}
            ratingLabels={ratingLabels}
            size="lg"
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="feedback-textarea"
            className="text-sm font-medium text-muted-foreground"
          >
            {t("Your Comments / Suggestions *", "आपकी टिप्पणियाँ / सुझाव *")}
          </Label>
          <Textarea
            id="feedback-textarea"
            placeholder={t(
              "Share your thoughts on the resolution or officer's conduct...",
              "समाधान या अधिकारी के आचरण पर अपने विचार साझा करें...",
            )}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            rows={3}
            className="resize-none mt-2"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            {t(
              "What would you like to do with this complaint? *",
              "आप इस शिकायत के साथ क्या करना चाहते हैं? *",
            )}
          </Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button
              type="button"
              onClick={() => setStatusAction("RESOLVED")}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                statusAction === "RESOLVED"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-600/30"
                  : "bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/60"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{t("Resolved", "समाधान")}</span>
            </button>

           {isWithin7Days && <button
              type="button"
              onClick={() => setStatusAction("REOPEN")}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                statusAction === "REOPEN"
                  ? "bg-amber-500 text-white border-amber-500 shadow-sm ring-2 ring-amber-500/30"
                  : "bg-amber-50/60 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-500/30 hover:bg-amber-100/60 dark:hover:bg-amber-950/60"
              }`}
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>{t("Reopen", "पुनः खोलें")}</span>
            </button>}
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="feedback-reason"
            className="text-sm font-medium text-muted-foreground "
          >
            {statusAction === "RESOLVED"
              ? t("Reason / Resolution Remarks *", "समाधान टिप्पणी / कारण *")
              : t("Reason for Reopening *", "पुनः खोलने का कारण *")}
          </Label>
          <Textarea
            id="feedback-reason"
            placeholder={
              statusAction === "RESOLVED"
                ? t(
                    "e.g. Issue has been fixed, thank you...",
                    "उदा. समस्या का समाधान हो गया है, धन्यवाद...",
                  )
                : t(
                    "e.g. Work is incomplete / not resolved correctly...",
                    "उदा. कार्य अपूर्ण है / सही ढंग से हल नहीं हुआ...",
                  )
            }
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            rows={2}
            className="resize-none mt-2"
          />
        </div>

        <Button
          type="submit"
          disabled={
            rating === 0 ||
            !feedback.trim() ||
            !reason.trim() ||
            mutation.isPending
          }
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {mutation.isPending ? (
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {t("Submit Feedback", "प्रतिक्रिया सबमिट करें")}
        </Button>
      </form>
    </div>
  );
};

export default ComplaintFeedback;
