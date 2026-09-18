import React, { useRef, useState, useMemo, useEffect } from "react";
import { ArrowLeft, Building2, Search, Sparkles } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";

import PortalLayout from "@/components/PortalLayout";
import RhfWrapper from "@/components/RhfWrapper";
import { useLanguage } from "@/context/LanguageContext";

import { useRaiseComplaintData } from "./hooks";
import { defaultValues, grievanceSchema, GrievanceFormValues } from "./schema";

import CitizenInfoSection from "./components/CitizenInfoSection";
import ClassificationSection from "./components/ClassificationSection";
import LocationDetailsSection from "./components/LocationDetailsSection";
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
import { postExternalComplaint } from "@/api/externalDept.api";
import CenterLayout from "@/components/CenterLayout";
import { useProfile } from "@/context/ProfileContext";
import { useGetConfig } from "@/hooks/query/useGetConfig";
import { departmentsList, getExternalDepartment } from "@/utils/departments";
import { Input } from "@/components/ui/input";

interface RaiseComplaintProps {
  role?: string;
}

export default function RaiseComplaint({
  role = "citizen",
}: RaiseComplaintProps) {
  const { t, lang } = useLanguage();
  const qc = useQueryClient();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState<string>(() => {
    return searchParams.get("dept") || "";
  });
  const [externalComplaintId, setExternalComplaintId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

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

  const { data: configData } = useGetConfig();
  const mbFile = configData?.data?.data?.grievanceMaxUploadSizeMB || 1;
  const MAX_FILE_LIMIT = mbFile * 1024 * 1024;

  const {
    departmentOptions,
    departmentsLoading,
    departmentsError,
    grievanceNatureOptions,
    frequencyOptions,
    affectedBeneficiaryOptions,
    naturesLoading,
  } = useRaiseComplaintData(lang);

  // Sync state with URL params
  useEffect(() => {
    const deptParam = searchParams.get("dept");
    if (deptParam && deptParam !== selectedDept) {
      setSelectedDept(deptParam);
    } else if (!deptParam && selectedDept) {
      setSelectedDept("");
    }
  }, [searchParams]);

  const handleSelectDept = (key: string) => {
    setSelectedDept(key);
    setStep(1);
    setSearchParams(
      (params) => {
        if (key) {
          params.set("dept", key);
        } else {
          params.delete("dept");
        }
        return params;
      },
      { replace: true },
    );
  };

  // Combine internal and external departments for selection boxes
  const allDepartmentBoxes = useMemo(() => {
    const externalBoxes = departmentsList
      .filter((d) => !d.isHide)
      .map((d) => ({
        id: d.key,
        key: d.key,
        name: d.name,
        nameHindi: d.nameHindi || d.name,
        isExternal: true,
      }));

    const internalBoxes = (departmentOptions || []).map((d: any) => ({
      id: d.value,
      key: d.value,
      name: d.label,
      nameHindi: d.titleHindi || d.nameHindi || d.label,
      isExternal: false,
    }));

    return [...externalBoxes, ...internalBoxes];
  }, [departmentOptions]);

  const filteredDepartments = useMemo(() => {
    if (!searchQuery.trim()) return allDepartmentBoxes;
    const q = searchQuery.toLowerCase().trim();
    return allDepartmentBoxes.filter(
      (d) =>
        d.name?.toLowerCase().includes(q) ||
        d.nameHindi?.toLowerCase().includes(q),
    );
  }, [allDepartmentBoxes, searchQuery]);

  // Check if selected department is external
  const selectedExternalDept = useMemo(() => {
    if (!selectedDept) return null;
    return getExternalDepartment(selectedDept);
  }, [selectedDept]);

  const selectedDepartmentItem = useMemo(() => {
    if (!selectedDept) return null;
    return (
      allDepartmentBoxes.find(
        (d) => d.key === selectedDept || d.id === selectedDept,
      ) || null
    );
  }, [selectedDept, allDepartmentBoxes]);

  const computedDefaultValues = useMemo(() => {
    const mobileVal = profile?.mobile || "";

    return {
      ...defaultValues,
      citizenInfo: {
        ...defaultValues.citizenInfo,
        fullName: profile?.fullName || "",
        email: profile?.email || "",
        mobile: mobileVal,
      },
      classification: {
        ...defaultValues.classification,
        department: selectedDept || "",
      },
    };
  }, [profile, selectedDept]);

  // ── File attachments ──────────────────────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const files = Array.from(e.target.files ?? []);

    const whitelist = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "video/mp4",
      "audio/mpeg",
    ];
    const invalidFile = files.find((f) => !whitelist.includes(f.type));
    if (invalidFile) {
      const msg = t(
        "Invalid file type. Only JPEG, PNG, WEBP, MP4, and MP3 are allowed.",
        "अमान्य फ़ाइल प्रकार। केवल JPEG, PNG, WEBP, MP4, और MP3 की अनुमति है।",
      );
      setFileError(msg);
      getErrorToast(msg);
      return;
    }

    const oversized = files.find((f) => f.size > MAX_FILE_LIMIT);
    if (oversized) {
      const msg = t(
        `File too large. Max ${mbFile} MB.`,
        `फ़ाइल बहुत बड़ी है। अधिकतम ${mbFile} MB।`,
      );
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

  // ── Submissions ───────────────────────────────────────────────────────────
  const [submitted, setSubmitted] = useState<any>([false, null]);

  const postComplaintsMutation = useMutation({
    mutationFn: postComplaints,
    onSuccess: (data) => {
      getSuccessToast(
        t("Complaint registered successfully", "शिकायत सफलतापूर्वक दर्ज की गई"),
      );
      qc.invalidateQueries({ queryKey: ["grievance"] });
      console.log(data);
      setSubmitted([true, data]);
    },
    onError: (err) => {
      getErrorToast(err);
    },
  });

  const postExternalComplaintMutation = useMutation({
    mutationFn: postExternalComplaint,
    onSuccess: (data: any) => {
      const extId = data?.data?.data?.externalComplaintId;
      getSuccessToast(
        t("Complaint registered successfully", "शिकायत सफलतापूर्वक दर्ज की गई"),
        extId,
      );
      qc.invalidateQueries({ queryKey: ["external-grievances"] });
      setExternalComplaintId(extId || null);
      setSubmitted([true, data]);
    },
    onError: (err) => {
      getErrorToast(err);
    },
  });

  const handleInternalSubmit = (data: GrievanceFormValues) => {
    const formData = getFormData(data, attachments);
    console.log("Final FormData:", Object.fromEntries(formData as any));
    postComplaintsMutation.mutate(formData);
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (submitted?.[0]) {
    return (
      <SuccessScreen
        role={role}
        t={t}
        onReset={() => {
          setSubmitted([false, null]);
          setExternalComplaintId(null);
          setAttachments([]);
          setFileError("");
          setSelectedDept("");
          setSearchParams((params) => {
            params.delete("dept");
            return params;
          });
        }}
        data={submitted?.[1]}
        externalComplaintId={externalComplaintId}
        grievanceNatureOptions={grievanceNatureOptions}
      />
    );
  }

  // ── Department Selection Screen ───────────────────────────────────────────
  if (!selectedDept) {
    return (
      <PortalLayout>
        <CenterLayout className="p-4 sm:p-6">
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
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
                  {t("Register Complaint", "शिकायत दर्ज करें")}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {t(
                    "Please choose a department to proceed with your complaint",
                    "शिकायत दर्ज करने के लिए कृपया एक विभाग चुनें",
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="mb-6 relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Search department...", "विभाग खोजें...")}
              className="pl-10 h-11 rounded-xl bg-card border-border shadow-xs"
            />
          </div>

          {/* Departments Grid Boxes */}
          {departmentsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800 animate-pulse"
                />
              ))}
            </div>
          ) : filteredDepartments.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card/50">
              <Building2 className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground font-medium">
                {t("No departments found", "कोई विभाग नहीं मिला")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredDepartments.map((dept) => {
                const label =
                  lang === "hi" && dept.nameHindi ? dept.nameHindi : dept.name;

                return (
                  <button
                    key={dept.key}
                    type="button"
                    onClick={() => handleSelectDept(dept.key)}
                    className="group relative flex flex-col justify-between p-4 rounded-2xl bg-card hover:bg-blue-50/60 dark:hover:bg-blue-950/30 border border-border hover:border-blue-500 dark:hover:border-blue-600 transition-all duration-200 shadow-xs hover:shadow-md text-left cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                    
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {t(label, dept.nameHindi)}
                      </h3>
                      {/* <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                        {lang === "hi" ? dept.name : dept.nameHindi || ""}
                      </p> */}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </CenterLayout>
      </PortalLayout>
    );
  }

  // ── Selected Department Form Screen ───────────────────────────────────────
  const selectedDeptTitle = selectedDepartmentItem
    ? lang === "hi" && selectedDepartmentItem.nameHindi
      ? selectedDepartmentItem.nameHindi
      : selectedDepartmentItem.name
    : selectedDept;

  return (
    <PortalLayout>
      <CenterLayout className="p-4 sm:p-6">
        {/* Page header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (selectedExternalDept) {
                  handleSelectDept("");
                } else if (step > 1) {
                  setStep((prev) => prev - 1);
                } else {
                  handleSelectDept("");
                }
              }}
              className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title={t("Back", "पीछे जाएं")}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                {t("Register Complaint", "शिकायत दर्ज करें")}
              </h1>
            </div>
          </div>

          {/* Current selected department badge & change action */}
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-xl px-3 py-1.5">
            <Building2 className="w-4 h-4 text-primary shrink-0" />
            <div className="text-xs">
              <span className="text-muted-foreground font-medium mr-1">
                {t("Department:", "विभाग:")}
              </span>
              <span className="font-semibold text-foreground">
                {selectedDeptTitle}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleSelectDept("")}
              className="ml-2 text-xs font-semibold text-primary hover:underline cursor-pointer"
            >
              {t("Change", "बदलें")}
            </button>
          </div>
        </div>

        {/* Render External Department Form or Internal 3-Step Wizard */}
        {selectedExternalDept?.component ? (
          <selectedExternalDept.component
            selectedDept={selectedExternalDept.key}
            onSuccess={(payload: any) =>
              postExternalComplaintMutation.mutate(payload)
            }
            isLoading={postExternalComplaintMutation.isPending}
          />
        ) : (
          <RhfWrapper
            key={selectedDept}
            initialValues={computedDefaultValues}
            isValidation
            validationSchema={grievanceSchema}
            validationOn="onChange"
            onSubmit={handleInternalSubmit}
            onError={(err) => console.log("Errors ", err)}
            className="space-y-6"
          >
            <FormWizard
              t={t}
              lang={lang}
              departmentOptions={departmentOptions}
              departmentsLoading={departmentsLoading}
              departmentsError={departmentsError}
              grievanceNatureOptions={grievanceNatureOptions}
              naturesLoading={naturesLoading}
              frequencyOptions={frequencyOptions}
              affectedBeneficiaryOptions={affectedBeneficiaryOptions}
              fileInputRef={fileInputRef}
              attachments={attachments}
              fileError={fileError}
              handleFileChange={handleFileChange}
              removeAttachment={removeAttachment}
              postComplaintsMutation={postComplaintsMutation}
              mbFile={mbFile}
              step={step}
              setStep={setStep}
              steps={steps}
            />
          </RhfWrapper>
        )}
      </CenterLayout>
    </PortalLayout>
  );
}

interface FormWizardProps {
  t: (en: string, hi: string) => string;
  lang: any;
  departmentOptions: any;
  departmentsLoading?: boolean;
  departmentsError?: any;
  grievanceNatureOptions: any;
  naturesLoading: boolean;
  frequencyOptions: any;
  affectedBeneficiaryOptions: any;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  attachments: File[];
  fileError: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeAttachment: (index: number) => void;
  postComplaintsMutation: any;
  mbFile?: number;
  step?: number;
  setStep: any;
  steps?: any;
}

function FormWizard({
  t,
  lang,
  departmentOptions,
  departmentsLoading,
  departmentsError,
  grievanceNatureOptions,
  naturesLoading,
  affectedBeneficiaryOptions,
  fileInputRef,
  attachments,
  fileError,
  handleFileChange,
  removeAttachment,
  postComplaintsMutation,
  mbFile,
  step,
  setStep,
  steps,
}: FormWizardProps) {
  const { trigger } = useFormContext<GrievanceFormValues>();

  const handleNext = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger([
        "citizenInfo.fullName",
        "citizenInfo.mobile",
        "citizenInfo.alternateMobile",
        "citizenInfo.email",
        "communication.feedbackConsent",
      ]);
    } else if (step === 2) {
      isValid = await trigger(["citizenInfo.address", "address"]);
    }
    if (isValid) {
      setStep((prev: number) => prev + 1);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const handleBack = () => {
    setStep((prev: number) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "instant" });
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
            style={{
              width: `${(((step || 1) - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {steps.map((s: any) => {
          const isActive = step === s.id;
          const isCompleted = (step || 1) > s.id;
          return (
            <div key={s.id} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald-500 text-white shadow-md border-2 border-emerald-500"
                    : isActive
                      ? "bg-blue-600 text-white shadow-lg ring-4 ring-blue-100 dark:ring-blue-950 border-2 border-blue-600"
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
                      ? "text-blue-600 dark:text-blue-400"
                      : isCompleted
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div>
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
              departmentOptions={departmentOptions}
              departmentsLoading={departmentsLoading}
              departmentsError={departmentsError}
              grievanceNatureOptions={grievanceNatureOptions}
              naturesLoading={naturesLoading}
              t={t}
              lang={lang}
              isDepartmentFixed={true}
            />
            <LocationDetailsSection t={t} />
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
              mbFile={mbFile}
            />
          </div>
        )}
      </div>

      <FormButtonsFooter
        step={step || 1}
        handleBack={handleBack}
        handleNext={handleNext}
        t={t}
        isSubmitting={postComplaintsMutation.isPending}
      />
    </div>
  );
}
