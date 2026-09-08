import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import CenterLayout from "@/components/CenterLayout";
import { useLanguage } from "@/context/LanguageContext";
import FeedbackForm from "./components/FeedbackForm";

export default function CitizenFeedback() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <PortalLayout role="citizen">
      <CenterLayout className="p-4 sm:p-6">
        {/* Page header */}
        <div className="mb-6 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title={t("Back", "पीछे जाएं")}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                {t("Feedback", "प्रतिक्रिया")}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {t(
                  "Rate your experience with a resolved complaint.",
                  "अपनी हल की गई शिकायत के अनुभव को रेट करें।"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-sm">
          <FeedbackForm />
        </div>
      </CenterLayout>
    </PortalLayout>
  );
}

