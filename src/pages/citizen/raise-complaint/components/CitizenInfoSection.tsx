import React from "react";
import RhfInput from "@/components/rhfinputs/RhfInput";
import RhfMobileInput from "@/components/rhfinputs/RhfMobileInput";
import RhfSelect from "@/components/rhfinputs/RhfSelect";
import FormSection from "./FormSection";
import { PREFERRED_LANGUAGE_OPTIONS } from "../schema";

interface CitizenInfoSectionProps {
  t: any;
}

export default function CitizenInfoSection({ t }: CitizenInfoSectionProps) {


  return (
    <FormSection title={t("Complainant Details", "शिकायतकर्ता का विवरण")}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RhfInput
          name="citizenInfo.fullName"
          label={t("Full Name", "पूरा नाम")}
          placeholder={t("Enter your full name", "अपना पूरा नाम दर्ज करें")}
          isLettersAllowed
        />
        <RhfMobileInput
          name="citizenInfo.mobile"
          label={t("Mobile Number", "मोबाइल नंबर")}
          placeholder={t("10-digit mobile number", "10 अंकों का मोबाइल नंबर")}
          required
          disabled={true}


        />
        <RhfMobileInput
          name="citizenInfo.alternateMobile"
          label={t("Alternate Mobile", "वैकल्पिक मोबाइल")}
          placeholder={t("Optional alternate number", "वैकल्पिक नंबर")}
        />
        <RhfInput
          name="citizenInfo.email"
          label={t("Email", "ईमेल")}
          placeholder="example@email.com"
          type="email"
        />
        <RhfSelect
          name="citizenInfo.preferredLanguage"
          label={t("Preferred Language", "पसंदीदा भाषा")}
          placeholder={t("Select language", "भाषा चुनें")}
          options={PREFERRED_LANGUAGE_OPTIONS}
          required
        />
      </div>
    </FormSection>
  );
}
