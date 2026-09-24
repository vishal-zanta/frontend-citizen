import React, { useState } from "react";
import {
  FileText,
  Calendar,
  UserCheck,
  Tag,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getStatusBadgeMeta } from "@/utils/constants";

interface ChatComplaintCardProps {
  complaint: any;
  onViewFullDetails: () => void;
  onTrackAnother: () => void;
}

export const ChatComplaintCard: React.FC<ChatComplaintCardProps> = ({
  complaint,
  onViewFullDetails,
  onTrackAnother,
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!complaint) return null;

  const trackingId =
    complaint.grievanceId || complaint._id || complaint.id || "N/A";
  const statusMeta = getStatusBadgeMeta(complaint.status);

  // Service name
  const serviceObj = complaint.service || complaint.classification?.service;
  const serviceName =
    typeof serviceObj === "object"
      ? t(
          serviceObj?.title || serviceObj?.name || "",
          serviceObj?.titleHindi || serviceObj?.name_local || ""
        )
      : serviceObj || complaint.subject || t("Public Grievance", "सार्वजनिक शिकायत");

  // Date
  const rawDate = complaint.createdAt || complaint.createdDate;
  const formattedDate = rawDate
    ? new Date(rawDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  // Officer
  const officerName =
    complaint.assignedOfficer?.name ||
    complaint.l1OfficerName ||
    complaint.officer?.name ||
    t("Under Department Review", "विभागीय समीक्षाधीन");

  // Last timeline event
  const lastEvent =
    Array.isArray(complaint.timeline) && complaint.timeline.length > 0
      ? complaint.timeline[complaint.timeline.length - 1]
      : null;

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden text-left">
      {/* Top Banner with Complaint ID & Status */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-3.5 text-white flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <FileText className="w-4 h-4 text-sky-400 shrink-0" />
          <div className="min-w-0">
            <div className="text-[10px] text-blue-200 uppercase font-medium">
              {t("Complaint ID", "शिकायत संख्या")}
            </div>
            <div className="font-mono font-bold text-xs sm:text-sm tracking-wide truncate flex items-center gap-1">
              <span>{trackingId}</span>
              <button
                type="button"
                onClick={handleCopy}
                title={t("Copy ID", "संख्या कॉपी करें")}
                className="p-1 hover:bg-white/20 rounded transition-colors text-white/80 hover:text-white cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
        </div>

        <span
          className={`px-2.5 py-1 text-[11px] font-bold rounded-full border shrink-0 ${statusMeta.badgeClass}`}
        >
          {t(statusMeta.badgeLabel, statusMeta.badgeLabel)}
        </span>
      </div>

      {/* Main Details Grid */}
      <div className="p-3.5 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
        {/* Service */}
        <div className="flex items-start gap-2">
          <Tag className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-muted-foreground block font-medium">
              {t("Department / Service", "विभाग / सेवा")}
            </span>
            <span className="font-semibold text-foreground line-clamp-1">
              {serviceName}
            </span>
          </div>
        </div>

        {/* Assigned Officer & Date */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          {formattedDate && (
            <div className="flex items-start gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-muted-foreground block font-medium">
                  {t("Filed On", "दर्ज तिथि")}
                </span>
                <span className="font-medium text-foreground text-[11px] truncate block">
                  {formattedDate}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-start gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-muted-foreground block font-medium">
                {t("Officer", "अधिकारी")}
              </span>
              <span className="font-medium text-foreground text-[11px] truncate block">
                {officerName}
              </span>
            </div>
          </div>
        </div>

        {/* Latest Milestone / Progress */}
        {lastEvent && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 -mx-3.5 -mb-3.5 p-3 rounded-b-2xl">
            <span className="text-[10px] text-muted-foreground block font-medium">
              {t("Latest Progress Update", "नवीनतम स्थिति")}
            </span>
            <span className="text-[11px] font-medium text-foreground block line-clamp-1 mt-0.5">
              •{" "}
              {lastEvent.title ||
                lastEvent.type ||
                lastEvent.notes ||
                t("In Progress", "प्रक्रियाधीन")}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={onViewFullDetails}
          className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{t("View Full Details", "पूर्ण विवरण देखें")}</span>
        </button>

        <button
          type="button"
          onClick={onTrackAnother}
          className="py-2 px-3 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t("Track Another", "अन्य ट्रैक करें")}</span>
        </button>
      </div>
    </div>
  );
};

export default ChatComplaintCard;
