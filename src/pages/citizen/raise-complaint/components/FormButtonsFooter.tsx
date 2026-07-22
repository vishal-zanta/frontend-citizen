import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface FormButtonsFooterProps {
  step: number;
  handleBack: () => void;
  handleNext: () => void;
  t: (en: string, hi: string) => string;
  isSubmitting: boolean;
}

export default function FormButtonsFooter({
  step,
  handleBack,
  handleNext,
  t,
  isSubmitting,
}: FormButtonsFooterProps) {
  const { watch } = useFormContext();
  const feedbackConsent = watch("communication.feedbackConsent");
  const isNextDisabled = step === 1 && !feedbackConsent;

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-center items-stretch sm:items-center gap-3 mt-6 pt-4 border-t border-border">
      <div className="w-full sm:w-auto">
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="w-full sm:w-auto hover:bg-muted font-medium transition-all"
          >
            &larr; {t("Back", "पीछे")}
          </Button>
        )}
      </div>

      <div className="w-full sm:w-auto">
        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={isNextDisabled}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium min-w-[120px] transition-all h-9 px-4 py-2 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("Next", "आगे")} &rarr;
          </button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium min-w-[180px] transition-all"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("Submitting...", "जमा हो रहा है...")}
              </span>
            ) : (
              t("Submit Grievance", "शिकायत जमा करें")
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
