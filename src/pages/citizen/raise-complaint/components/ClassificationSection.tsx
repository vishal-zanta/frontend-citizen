import React, { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import RhfSelect from "@/components/rhfinputs/RhfSelect";
import FormSection from "./FormSection";
import { useGetServices } from "@/hooks/useGetQuery";
import RhfTextarea from "@/components/rhfinputs/RhfTextarea";

interface ClassificationSectionProps {
  departmentOptions: { label: string; value: string }[];
  grievanceNatureOptions: { label: string; value: string }[];
  departmentsLoading?: boolean;
  departmentsError?: any;
  naturesLoading: boolean;
  t: any;
  lang?: any;
}

export default function ClassificationSection({
  departmentOptions,
  grievanceNatureOptions,
  departmentsLoading,
  departmentsError,
  naturesLoading,
  t,
  lang,
}: ClassificationSectionProps) {
  const { setValue, control } = useFormContext();

  const selectedDepartment = useWatch({
    control,
    name: "classification.department",
  });
  const selectedService = useWatch({ control, name: "classification.service" });
    const departmentRef = useRef(selectedDepartment);
  

  const SERVICES_PARAMS = {
    page: 1,
    limit: 500,
    select: "title,titleHindi,name,nameHindi",
    departmentId: selectedDepartment,
  };

  const { data: servicesData, isLoading: servicesLoading } = useGetServices(
    [selectedDepartment],
    SERVICES_PARAMS,
    !!selectedDepartment,
    {
      gcTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  );

  const serviceOptions = (servicesData?.data?.data?.docs ?? []).map(
    (s: any) => ({
      label:
        lang === "hi" && (s.titleHindi || s.nameHindi)
          ? s.titleHindi || s.nameHindi
          : s.title || s.name,
      value: s._id,
      title: s.title || s.name,
      titleHindi: s.titleHindi || s.nameHindi,
    }),
  );

  useEffect(() => {
    if (departmentRef.current && selectedDepartment !== departmentRef.current)
      setValue("classification.service", "");

    departmentRef.current = selectedDepartment;
  }, [selectedDepartment]);

  return (
    <FormSection
      title={t(
        "What does the complaint related to?",
        "शिकायत किससे संबंधित है?",
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RhfSelect
          name="classification.department"
          label={t("Department", "विभाग")}
          placeholder={
            departmentsLoading
              ? t("Loading...", "लोड हो रहा है...")
              : t("Select department", "विभाग चुनें")
          }
          options={departmentOptions}
          disabled={departmentsLoading}
          required
        />

        <RhfSelect
          name="classification.service"
          label={t("Service / Category", "सेवा")}
          placeholder={
            !selectedDepartment
              ? t("Select department first", "पहले विभाग चुनें")
              : servicesLoading
                ? t("Loading...", "लोड हो रहा है...")
                : t("Select service", "सेवा चुनें")
          }
          options={serviceOptions}
          disabled={!selectedDepartment || servicesLoading}
          required
        />

        <RhfSelect
          name="classification.nature"
          label={t("Type / Nature", "शिकायत प्रकार")}
          placeholder={
            naturesLoading
              ? t("Loading...", "लोड हो रहा है...")
              : t("Select type", "प्रकार चुनें")
          }
          options={grievanceNatureOptions}
          required
        />

        <RhfTextarea
          name="evidence.details"
          label={t("Brief Description", "संक्षिप्त विवरण")}
          placeholder={t(
            "Describe the issue in detail...",
            "समस्या का विस्तार से वर्णन करें...",
          )}
          rows={4}
          maxLength={1000}
          required
          className="md:col-span-2"
        />
      </div>
    </FormSection>
  );
}
