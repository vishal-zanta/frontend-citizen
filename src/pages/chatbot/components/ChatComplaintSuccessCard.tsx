import React, { useState } from "react";
import { CheckCircle2, Copy, Check, ArrowRight, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getSuccessToast } from "@/utils/helpers";

interface ChatComplaintSuccessCardProps {
  grievanceId: string;
  departmentName?: string;
  natureTitle?: string;
  onTrack?: (id: string) => void;
  onReset?: () => void;
}

export default function ChatComplaintSuccessCard({
  grievanceId,
  departmentName,
  natureTitle,
  onTrack,
  onReset,
}: ChatComplaintSuccessCardProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (grievanceId) {
      navigator.clipboard.writeText(grievanceId);
      setCopied(true);
      getSuccessToast(
        t("Complaint number copied to clipboard", "शिकायत संख्या कॉपी हो गई"),
      );
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-sm bg-card border border-border/80 rounded-2xl p-4 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground">
            {t("Complaint Registered!", "शिकायत सफलतापूर्वक दर्ज!")}
          </h4>
          <p className="text-[11px] text-muted-foreground">
            {t(
              "Your grievance has been securely recorded.",
              "आपकी शिकायत सुरक्षित रूप से दर्ज कर ली गई है।",
            )}
          </p>
        </div>
      </div>

      {grievanceId && (
        <div className="bg-muted/40 border border-border rounded-xl p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
            {t("Complaint Number", "शिकायत संख्या")}
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm font-bold text-primary tracking-wide">
              {grievanceId}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              title={t("Copy number", "संख्या कॉपी करें")}
              className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      )}

      {(departmentName || natureTitle) && (
        <div className="grid grid-cols-2 gap-2 text-xs">
          {departmentName && (
            <div className="bg-muted/30 rounded-lg p-2 border border-border/60">
              <span className="text-[10px] text-muted-foreground block font-medium">
                {t("Department", "विभाग")}
              </span>
              <span className="font-semibold text-foreground truncate block">
                {departmentName}
              </span>
            </div>
          )}
          {natureTitle && (
            <div className="bg-muted/30 rounded-lg p-2 border border-border/60">
              <span className="text-[10px] text-muted-foreground block font-medium">
                {t("Nature", "प्रकार")}
              </span>
              <span className="font-semibold text-foreground truncate block">
                {natureTitle}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 pt-1">
        {/* {onTrack && grievanceId && (
          <button
            type="button"
            onClick={() => onTrack(grievanceId)}
            className="flex-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1 shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <span>{t("Track Status", "स्थिति ट्रैक करें")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )} */}
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="py-1.5 px-3 bg-muted hover:bg-muted/80 text-foreground border border-border rounded-xl text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t("File Another", "नई शिकायत")}</span>
          </button>
        )}
      </div>
    </div>
  );
}
