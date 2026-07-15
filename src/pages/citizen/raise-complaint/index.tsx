import React, { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

import PortalLayout from "@/components/PortalLayout";
import RhfWrapper from "@/components/RhfWrapper";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";

import { useRaiseComplaintData } from "./hooks";
import { defaultValues, grievanceSchema, GrievanceFormValues } from "./schema";

import CitizenInfoSection from "./components/CitizenInfoSection";
import ClassificationSection from "./components/ClassificationSection";
import EvidenceSection from "./components/EvidenceSection";
import ImpactSection from "./components/ImpactSection";
import AddressSection from "./components/AddressSection";
import CommunicationSection from "./components/CommunicationSection";
import AttachmentsSection from "./components/AttachmentsSection";
import { getFormData } from "./helpers";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorToast, getSuccessToast } from "@/utils/helpers";
import SuccessScreen from "./components/SuccessScreen";
import { postComplaints } from "@/api/complaints.api";
import CenterLayout from "@/components/CenterLayout";

interface RaiseComplaintProps {
  role?: string;
}

export default function RaiseComplaint({ role = "citizen" }: RaiseComplaintProps) {
  const { t, lang, setLang } = useLanguage();
  const qc = useQueryClient();

  // ── Query Hook ─────────────────────────────────────────────────────────────
  const {
    subServiceOptions,
    grievanceNatureOptions,
    frequencyOptions,
    affectedBeneficiaryOptions,
    // preferredModeOptions,
    subServicesLoading,
    naturesLoading,
  } = useRaiseComplaintData(lang);

  // ── File attachments ──────────────────────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const files = Array.from(e.target.files ?? []);
    const oversized = files.find((f) => f.size > 10 * 1024 * 1024);
    if (oversized) {
      setFileError(t("File too large. Max 10 MB.", "फ़ाइल बहुत बड़ी है। अधिकतम 10 MB।"));
      return;
    }
    setAttachments((prev) => [...prev, ...files]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const [submitted, setSubmitted] = useState(false);
  // const [submitting, setSubmitting] = useState(false);



  const postComplaintsMutation = useMutation({
    mutationFn : postComplaints,
    onSuccess: (data)=> {
      getSuccessToast("Complaint register successfully");
      qc.invalidateQueries({queryKey: ["grievance"]});
      console.log(data);
      setSubmitted(true);
    },
    onError : (err)=> {
      getErrorToast(err);
    }
  })

  const handleSubmit = (data: GrievanceFormValues) => {
   
   const formData = getFormData(data , attachments)
    console.log("Final  FormData:", Object.fromEntries(formData as any));
    postComplaintsMutation.mutate(formData);

  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <SuccessScreen
        role={role}
        t={t}
        onReset={() => {
          setSubmitted(false);
          setAttachments([]);
          setFileError("");
        }}
      />
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <PortalLayout role={role}>
      {/* <div className="p-6 max-w-6xl mx-auto"> */}
        <CenterLayout className="p-6">

   
        {/* Page header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("Register Grievance", "शिकायत दर्ज करें")}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t(
                "Fields marked * are required.",
                "* चिह्नित फ़ील्ड अनिवार्य हैं।",
              )}
            </p>
          </div>

          {/* Language switcher */}
          <Select value={lang} onValueChange={(v: any) => setLang(v)}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिन्दी</SelectItem>
            </SelectContent>
          </Select>
        </div>

      <RhfWrapper
        initialValues={defaultValues}
        isValidation
        validationSchema={grievanceSchema}
        validationOn="onChange"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <FormWizard
          t={t}
          subServiceOptions={subServiceOptions}
          grievanceNatureOptions={grievanceNatureOptions}
          subServicesLoading={subServicesLoading}
          naturesLoading={naturesLoading}
          frequencyOptions={frequencyOptions}
          affectedBeneficiaryOptions={affectedBeneficiaryOptions}
          fileInputRef={fileInputRef}
          attachments={attachments}
          fileError={fileError}
          handleFileChange={handleFileChange}
          removeAttachment={removeAttachment}
          postComplaintsMutation={postComplaintsMutation}
        />
      </RhfWrapper>
           </CenterLayout>
    {/* </div> */}
  </PortalLayout>
);
}

interface FormWizardProps {
  t: (en: string, hi: string) => string;
  subServiceOptions: any;
  grievanceNatureOptions: any;
  subServicesLoading: boolean;
  naturesLoading: boolean;
  frequencyOptions: any;
  affectedBeneficiaryOptions: any;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  attachments: File[];
  fileError: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeAttachment: (index: number) => void;
  postComplaintsMutation: any;
}

function FormWizard({
  t,
  subServiceOptions,
  grievanceNatureOptions,
  subServicesLoading,
  naturesLoading,
  frequencyOptions,
  affectedBeneficiaryOptions,
  fileInputRef,
  attachments,
  fileError,
  handleFileChange,
  removeAttachment,
  postComplaintsMutation,
}: FormWizardProps) {
  const { trigger } = useFormContext<GrievanceFormValues>();
  const [step, setStep] = useState(1);

  const steps = [
    {
      id: 1,
      label: t("Basic Info", "बुनियादी जानकारी"),
      description: t("Citizen details", "नागरिक का विवरण"),
    },
    {
      id: 2,
      label: t("Location", "स्थान"),
      description: t("Address details", "पता का विवरण"),
    },
    {
      id: 3,
      label: t("Complaint Details", "शिकायत विवरण"),
      description: t("Category & description", "श्रेणी और विवरण"),
    },
  ];

  const handleNext = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger([
        "citizenInfo.fullName",
        "citizenInfo.mobile",
        "citizenInfo.alternateMobile",
        "citizenInfo.email",
        "citizenInfo.preferredLanguage",
        "communication.feedbackConsent",
        "communication.satisfactionSurveyConsent",
      ]);
    } else if (step === 2) {
      isValid = await trigger([
        "address.state",
        "address.district",
        "address.subdivision",
        "address.villageOrWard",
        "address.pinCode",
        "address.landmark",
      ]);
    }
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="space-y-8 animate-fade-in w-full">
      {/* Stepper Header */}
      <div className="relative flex justify-between items-center max-w-3xl mx-auto mb-8 px-4">
        {/* Background Line */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-muted rounded-full -z-10">
          {/* Progress Line */}
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((s) => {
          const isActive = step === s.id;
          const isCompleted = step > s.id;
          return (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald-500 text-white shadow-md border-2 border-emerald-500"
                    : isActive
                      ? "bg-blue-600 text-white shadow-lg ring-4 ring-blue-100 border-2 border-blue-600"
                      : "bg-muted text-muted-foreground border-2 border-border"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  s.id
                )}
              </div>
              <div className="text-center">
                <p
                  className={`text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : isCompleted
                        ? "text-emerald-600"
                        : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </p>
                <p className="text-[10px] text-muted-foreground hidden sm:block">
                  {s.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="bg-card border border-border shadow-sm rounded-xl p-6 transition-all duration-300">
        {step === 1 && (
          <div className="space-y-6">
            <CitizenInfoSection t={t} />
            <CommunicationSection t={t} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <AddressSection t={t} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <ClassificationSection
              subServiceOptions={subServiceOptions}
              grievanceNatureOptions={grievanceNatureOptions}
              subServicesLoading={subServicesLoading}
              naturesLoading={naturesLoading}
              t={t}
            />
            <EvidenceSection frequencyOptions={frequencyOptions} t={t} />
            <ImpactSection
              affectedBeneficiaryOptions={affectedBeneficiaryOptions}
              t={t}
            />
            <AttachmentsSection
              fileInputRef={fileInputRef}
              attachments={attachments}
              fileError={fileError}
              handleFileChange={handleFileChange}
              removeAttachment={removeAttachment}
              t={t}
            />
          </div>
        )}
      </div>

      {/* Buttons Footer */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
        <div>
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="hover:bg-muted font-medium transition-all"
            >
              &larr; {t("Back", "पीछे")}
            </Button>
          )}
        </div>

        <div>
          {step < 3 ? (
          
             <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium min-w-[120px] transition-all h-9 px-4 py-2 rounded-lg flex items-center justify-center"
            >
              {t("Next", "आगे")} &rarr;
            </button> 
          ) : (
            <Button
              type="submit"
              disabled={postComplaintsMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium min-w-[180px] transition-all"
            >
              {postComplaintsMutation.isPending ? (
                <span className="flex items-center gap-2">
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
    </div>
  );
}
