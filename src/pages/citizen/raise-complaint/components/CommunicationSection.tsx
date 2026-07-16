import React from "react";
import RhfSelect from "@/components/rhfinputs/RhfSelect";
import RhfBoolean from "@/components/rhfinputs/RhfBoolean";
import FormSection from "./FormSection";

interface CommunicationSectionProps {
  // preferredModeOptions: { label: string; value: string }[];
  t: any;
}

export default function CommunicationSection({
  // preferredModeOptions,
  t
}: CommunicationSectionProps) {

  return (
    <FormSection title={t("Communication Preferences", "संचार प्राथमिकताएँ")}>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RhfSelect
          name="communication.preferredMode"
          label={t("Preferred Communication Mode", "पसंदीदा संचार माध्यम")}
          placeholder={t("Select mode", "माध्यम चुनें")}
          options={preferredModeOptions}
        />
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-muted/30 rounded-lg p-4 border border-border mt-2">
        <RhfBoolean
          name="communication.feedbackConsent"
          label={t(
            "I consent to receiving feedback call",
            "मैं फ़ीडबैक कॉल प्राप्त करने की सहमति देता/देती हूँ",
          )}
        />
        <RhfBoolean
          name="communication.satisfactionSurveyConsent"
          label={t(
            "I consent to satisfaction survey",
            "मैं संतुष्टि सर्वेक्षण की सहमति देता/देती हूँ",
          )}
        />
      </div>
    </FormSection>
  );
}
