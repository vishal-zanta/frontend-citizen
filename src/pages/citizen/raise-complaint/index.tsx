import React, { useRef, useState } from "react";
import { Loader2 } from "lucide-react";

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
          {/* Section 0: Citizen Info */}
          <CitizenInfoSection t={t}/>

          {/* Section 1: Classification */}
          <ClassificationSection
            subServiceOptions={subServiceOptions}
            grievanceNatureOptions={grievanceNatureOptions}
            subServicesLoading={subServicesLoading}
            naturesLoading={naturesLoading}
            t={t}
          />

          {/* Section 2: Evidence */}
          <EvidenceSection frequencyOptions={frequencyOptions} t={t} />

          {/* Section 3: Impact */}
          <ImpactSection affectedBeneficiaryOptions={affectedBeneficiaryOptions} t={t} />

          {/* Section 4: Address */}
          <AddressSection t={t} />

          {/* Section 5: Communication Preferences */}
          <CommunicationSection t={t} />

          {/* Section 6: Attachments */}
          <AttachmentsSection
            fileInputRef={fileInputRef}
            attachments={attachments}
            fileError={fileError}
            handleFileChange={handleFileChange}
            removeAttachment={removeAttachment}
            t={t}
          />

          {/* Submit button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={postComplaintsMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700 min-w-[180px]"
            >
              {postComplaintsMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t("Submitting...", "जमा हो रहा है...")}
                </>
              ) : (
                t("Submit Grievance", "शिकायत जमा करें")
              )}
            </Button>
          </div>
        </RhfWrapper>
             </CenterLayout>
      {/* </div> */}
    </PortalLayout>
  );
}
