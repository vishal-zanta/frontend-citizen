import React from "react";
import { MessageSquare } from "lucide-react";
import PortalLayout from "@/components/PortalLayout";
import CenterLayout from "@/components/CenterLayout";
import { useLanguage } from "@/hooks/useLanguage";
import FeedbackForm from "./components/FeedbackForm";

export default function CitizenFeedback() {
  const { t } = useLanguage();

  return (
    <PortalLayout role="citizen">
      <CenterLayout className="p-4 sm:p-6">
        {/* Page header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              {t("Feedback", "प्रतिक्रिया")}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {t(
              "Rate your experience with a resolved complaint.",
              "अपनी हल की गई शिकायत के अनुभव को रेट करें।"
            )}
          </p>
        </div>

        {/* Form card */}
        <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-sm">
          <FeedbackForm />
        </div>
      </CenterLayout>
    </PortalLayout>
  );
}
