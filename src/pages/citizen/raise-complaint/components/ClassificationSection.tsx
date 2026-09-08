import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import RhfInput from "@/components/rhfinputs/RhfInput";
import RhfSelect from "@/components/rhfinputs/RhfSelect";
import MySelect from "@/components/inputs/MySelect";
import FormSection from "./FormSection";
import { useGetServices, useGetSubservices } from "@/hooks/useGetQuery";
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
  const { setValue,watch } = useFormContext();


  const selectedDepartment = watch("classification.department")
  const selectedService = watch("classification.service")

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

  const SUBSERVICES_PARAMS = {
    page: 1,
    limit: 500,
    select: "title,titleHindi,name,nameHindi",
    serviceId: selectedService,
  };

  const { data: subServicesData, isLoading: subServicesLoading } =
    useGetSubservices([selectedService], SUBSERVICES_PARAMS, !!selectedService);

  const subServiceOptions = (subServicesData?.data?.data?.docs ?? []).map(
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

  return (
    <FormSection title={t("What does the complaint related to?", "शिकायत किससे संबंधित है?")}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MySelect
          label={t("Department", "विभाग")}
          placeholder={
            departmentsLoading
              ? t("Loading...", "लोड हो रहा है...")
              : t("Select department", "विभाग चुनें")
          }
          options={departmentOptions}
          value={selectedDepartment}
          onValueChange={(val) => {
            setValue("classification.department", val);
            setValue("classification.service", "");
            setValue("classification.subService", "");
          }}
          disabled={departmentsLoading}
          required
        />

        <MySelect
          label={t("Service / Category", "सेवा")}
          placeholder={
            !selectedDepartment
              ? t("Select department first", "पहले विभाग चुनें")
              : servicesLoading
                ? t("Loading...", "लोड हो रहा है...")
                : t("Select service", "सेवा चुनें")
          }
          options={serviceOptions}
          value={selectedService}
          onValueChange={(val) => {
            setValue("classification.service", val);
            setValue("classification.subService", "");
          }}
          disabled={!selectedDepartment || servicesLoading}
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
          label={t("Type / Nature", "शिकायत प्रकार")}
          placeholder={
            naturesLoading
              ? t("Loading...", "लोड हो रहा है...")
              : t("Select type", "प्रकार चुनें")
          }
          options={grievanceNatureOptions}
          required
        />

        {/* <RhfInput
          name="classification.subject"
          label={t("Subject", "विषय")}
          placeholder={t(
            "Brief subject of your complaint",
            "शिकायत का संक्षिप्त विषय",
          )}
          required
          className="md:col-span-2"
          isLettersAllowed
        /> */}

        <RhfTextarea
          name="evidence.details"
          label={t("Brief Description", "संक्षिप्त विवरण")}
          placeholder={t(
            "Describe the issue in detail...",
            "समस्या का विस्तार से वर्णन करें...",
          )}
          rows={4}
          className="md:col-span-2"
        />
      </div>
    </FormSection>
  );
}

