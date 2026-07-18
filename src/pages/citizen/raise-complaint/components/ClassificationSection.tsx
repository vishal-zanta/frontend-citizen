import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import RhfInput from "@/components/rhfinputs/RhfInput";
import RhfSelect from "@/components/rhfinputs/RhfSelect";
import MySelect from "@/components/inputs/MySelect";
import FormSection from "./FormSection";
import { useGetSubservices } from "@/hooks/useGetQuery";

interface ClassificationSectionProps {
  servicesOptions: { label: string; value: string }[];
  grievanceNatureOptions: { label: string; value: string }[];
  servicesLoading: boolean;
  naturesLoading: boolean;
  t: any;
  lang?: any;
}

export default function ClassificationSection({
  servicesOptions,
  grievanceNatureOptions,
  servicesLoading,
  naturesLoading,
  t,
  lang
  
}: ClassificationSectionProps) {
  const { setValue } = useFormContext();
  const [selectedService, setSelectedService] = useState<string>("");

  const API_PARAMS = { page: 1, limit: 500, select: "title,titleHindi,name,nameHindi", serviceId: selectedService };
  const { data: subServicesData, isLoading: subServicesLoading } = useGetSubservices(
    [selectedService],
    API_PARAMS,
    !!selectedService
  );

  const subServiceOptions = (subServicesData?.data?.data?.docs ?? []).map((s: any) => ({
    label: lang === "hi" ? s.titleHindi :s.title , 
    value: s._id,
  }));
// console.log({lang, subServiceOptions})
  return (
    <FormSection title={t("Complaint Classification", "शिकायत वर्गीकरण")}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MySelect
          label={t("Service", "सेवा")}
          placeholder={
            servicesLoading
              ? t("Loading...", "लोड हो रहा है...")
              : t("Select service", "सेवा चुनें")
          }
          options={servicesOptions}
          value={selectedService}
          onValueChange={(val) => {
            setSelectedService(val);
            setValue("classification.subService", "");
          }}
          disabled={servicesLoading}
          required
        />

        <RhfSelect
          name="classification.subService"
          label={t("Sub-Service", "उप-सेवा")}
          placeholder={
            !selectedService
              ? t("Select service first", "पहले सेवा चुनें")
              : subServicesLoading
              ? t("Loading...", "लोड हो रहा है...")
              : t("Select sub-service", "उप-सेवा चुनें")
          }
          options={subServiceOptions}
          disabled={!selectedService || subServicesLoading}
          required
        />

        <RhfSelect
          name="classification.nature"
          label={t("Grievance Type / Nature", "शिकायत प्रकार")}
          placeholder={
            naturesLoading
              ? t("Loading...", "लोड हो रहा है...")
              : t("Select type", "प्रकार चुनें")
          }
          options={grievanceNatureOptions}
          required
        />

        <RhfInput
          name="classification.subject"
          label={t("Subject", "विषय")}
          placeholder={t("Brief subject of your complaint", "शिकायत का संक्षिप्त विषय")}
          required
          className="md:col-span-2"
          isLettersAllowed
        />
      </div>
    </FormSection>
  );
}
