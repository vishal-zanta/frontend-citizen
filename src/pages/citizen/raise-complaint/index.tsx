import React, { useRef, useState, useMemo } from "react";
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
import { useLanguage } from "@/context/LanguageContext";

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
import FormButtonsFooter from "./components/FormButtonsFooter";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorToast, getSuccessToast } from "@/utils/helpers";
import SuccessScreen from "./components/SuccessScreen";
import { postComplaints } from "@/api/complaints.api";
import CenterLayout from "@/components/CenterLayout";
import { useProfile } from "@/context/ProfileContext";
import LangSelector from "@/components/LangSelector";
import { useGetConfig } from "@/hooks/query/useGetConfig";

interface RaiseComplaintProps {
  role?: string;
}

export default function RaiseComplaint({ role = "citizen" }: RaiseComplaintProps) {
  const { t, lang, setLang } = useLanguage();
  const qc = useQueryClient();
  const { profile } = useProfile();

  const { data: configData } = useGetConfig();
  console.log("configData:", configData?.data?.data);
  const mbFile = configData?.data?.data?.grievanceMaxUploadSizeMB || 1;
  const MAX_FILE_LIMIT = mbFile * 1024 * 1024;


  const computedDefaultValues = useMemo(() => {
    let mobileVal = profile?.mobile || "";
   
    return {
      ...defaultValues,
      citizenInfo: {
        ...defaultValues.citizenInfo,
        fullName: profile?.fullName || "",
        email: profile?.email || "",
        mobile: mobileVal,
        preferredLanguage :profile?.preferredLanguage || "",
      },
    };
  }, [profile]);

  const {
    servicesOptions,
    grievanceNatureOptions,
    frequencyOptions,
    affectedBeneficiaryOptions,
    servicesLoading,
    naturesLoading,
    allDemography,
    demographyLoading,
  } = useRaiseComplaintData(lang);


  // ── File attachments ──────────────────────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const files = Array.from(e.target.files ?? []);

    const whitelist = ["image/jpeg", "image/png", "image/webp", "video/mp4", "audio/mpeg"];
    const invalidFile = files.find((f) => !whitelist.includes(f.type));
    if (invalidFile) {
      const msg = t(
        "Invalid file type. Only JPEG, PNG, WEBP, MP4, and MP3 are allowed.",
        "अमान्य फ़ाइल प्रकार। केवल JPEG, PNG, WEBP, MP4, और MP3 की अनुमति है।"
      );
      setFileError(msg);
      getErrorToast(msg);
      return;
    }

    const oversized = files.find((f) => f.size > MAX_FILE_LIMIT);
    if (oversized) {
      const msg = t(`File too large. Max ${mbFile} MB.`, `फ़ाइल बहुत बड़ी है। अधिकतम ${mbFile} MB।`);
      setFileError(msg);
      getErrorToast(msg);
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
    <PortalLayout >
      {/* <div className="p-6 max-w-6xl mx-auto"> */}
        <CenterLayout className="p-4 sm:p-6">

   
        {/* Page header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
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
         <LangSelector/>
        </div>

      <RhfWrapper
        initialValues={computedDefaultValues}
        isValidation
        validationSchema={grievanceSchema}
        validationOn="onChange"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <FormWizard
          t={t}
          lang={lang}
          servicesOptions={servicesOptions}
          grievanceNatureOptions={grievanceNatureOptions}
          servicesLoading={servicesLoading}
          naturesLoading={naturesLoading}
          frequencyOptions={frequencyOptions}
          affectedBeneficiaryOptions={affectedBeneficiaryOptions}
          fileInputRef={fileInputRef}
          attachments={attachments}
          fileError={fileError}
          handleFileChange={handleFileChange}
          removeAttachment={removeAttachment}
          postComplaintsMutation={postComplaintsMutation}
          allDemography={allDemography}
          demographyLoading={demographyLoading}
        />
      </RhfWrapper>
           </CenterLayout>
    {/* </div> */}
  </PortalLayout>
);
}

interface FormWizardProps {
  t: (en: string, hi: string) => string;
  lang : any
  servicesOptions: any;
  grievanceNatureOptions: any;
  servicesLoading: boolean;
  naturesLoading: boolean;
  frequencyOptions: any;
  affectedBeneficiaryOptions: any;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  attachments: File[];
  fileError: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeAttachment: (index: number) => void;
  postComplaintsMutation: any;
  allDemography?: any;
  demographyLoading?: boolean;
}

function FormWizard({
  t,
  lang,
  servicesOptions,
  grievanceNatureOptions,
  servicesLoading,
  naturesLoading,
  frequencyOptions,
  affectedBeneficiaryOptions,
  fileInputRef,
  attachments,
  fileError,
  handleFileChange,
  removeAttachment,
  postComplaintsMutation,
  allDemography,
  demographyLoading,
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
      <div className="relative flex justify-between items-center max-w-3xl mx-auto mb-8 px-2 sm:px-4">
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
            <div key={s.id} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald-500 text-white shadow-md border-2 border-emerald-500"
                    : isActive
                      ? "bg-blue-600 text-white shadow-lg ring-4 ring-blue-100 border-2 border-blue-600"
                      : "bg-muted text-muted-foreground border-2 border-border"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
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
                  className={`text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
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
      <div className="bg-card border border-border shadow-sm rounded-xl p-3 sm:p-6 transition-all duration-300">
        {step === 1 && (
          <div className="space-y-6">
            <CitizenInfoSection t={t} />
            <CommunicationSection t={t} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <AddressSection t={t} allDemography={allDemography} demographyLoading={demographyLoading} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <ClassificationSection
              servicesOptions={servicesOptions}
              grievanceNatureOptions={grievanceNatureOptions}
              servicesLoading={servicesLoading}
              naturesLoading={naturesLoading}
              t={t}
              lang={lang}
             
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

      <FormButtonsFooter
        step={step}
        handleBack={handleBack}
        handleNext={handleNext}
        t={t}
        isSubmitting={postComplaintsMutation.isPending}
      />
    </div>
  );
}
