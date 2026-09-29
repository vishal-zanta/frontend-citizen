import React, { useState } from "react";
import {
  CheckCircle2,
  Copy,
  Check,
  Search,
  RotateCcw,
  Building2,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ChatRaiseSuccessCardProps {
  complaintData: any;
  onTrackComplaint: (id: string) => void;
  onReset: () => void;
}

export default function ChatRaiseSuccessCard({
  complaintData,
  onTrackComplaint,
  onReset,
}: ChatRaiseSuccessCardProps) {
  const { t, lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const grievanceId =
    complaintData?.grievanceId ||
    complaintData?.complaintNumber ||
    complaintData?.id ||
    complaintData?._id ||
    "BR-2026-PENDING";

  const deptName =
    lang === "hi" && complaintData?.departmentNameHindi
      ? complaintData.departmentNameHindi
      : complaintData?.departmentName ||
        complaintData?.department?.title ||
        complaintData?.departmentId ||
        "Bihar Government Department";

  const serviceName =
    complaintData?.serviceLabel ||
    complaintData?.service?.title ||
    complaintData?.service ||
    "Public Grievance";

  const handleCopy = () => {
    if (grievanceId) {
      navigator.clipboard.writeText(grievanceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full mt-2.5 rounded-2xl border border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-950/20 p-3.5 sm:p-4 text-foreground shadow-xs animate-in zoom-in-95 duration-200">
      {/* Success Badge */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
            {t(
              "Grievance Registered Successfully!",
              "शिकायत सफलतापूर्वक दर्ज की गई!",
            )}
          </h4>
          <p className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80">
            {t(
              "Keep your Complaint ID safe for future reference",
              "भविष्य के संदर्भ के लिए अपनी शिकायत संख्या सुरक्षित रखें",
            )}
          </p>
        </div>
      </div>

      {/* Complaint ID Box */}
      <div className="bg-card dark:bg-card/70 rounded-xl p-3 border border-border flex items-center justify-between gap-2 mb-3 shadow-2xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-muted-foreground block tracking-wider">
            {t("Complaint ID", "शिकायत संख्या")}
          </span>
          <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 font-mono tracking-wide">
            {grievanceId}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-[11px] font-medium transition-colors cursor-pointer"
          title={t("Copy ID", "संख्या कॉपी करें")}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">{t("Copied", "कॉपी किया")}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{t("Copy", "कॉपी")}</span>
            </>
          )}
        </button>
      </div>

      {/* Info Details */}
      <div className="bg-card/60 dark:bg-card/30 rounded-xl p-2.5 border border-border/60 text-[11px] space-y-1.5 mb-3">
        <div className="flex items-center gap-1.5 text-foreground">
          <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="font-semibold truncate">{deptName}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground text-[10.5px]">
          <span>{serviceName}</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold text-[9.5px]">
            {t("PENDING", "लंबित")}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <button
          type="button"
          onClick={() => onTrackComplaint(grievanceId)}
          className="w-full sm:flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{t("Track this Complaint", "इस शिकायत को ट्रैक करें")}</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto py-2 px-3 bg-card hover:bg-muted border border-border text-foreground text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t("Main Menu", "मुख्य मेनू")}</span>
        </button>
      </div>
    </div>
  );
}
