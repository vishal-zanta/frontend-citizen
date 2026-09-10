import React from "react";
import {
  Printer,
  User,
  Phone,
  Calendar,
  CheckCircle2,
  RotateCcw,
  Mail,
} from "lucide-react";
import { StatusBadge } from "@/components/Badges";
import { Button } from "@/components/ui/button";
import { getEntityLabel } from "./utils";

interface ComplaintHeaderSectionProps {
  complaint: any;
  t: any;
  onPrint?: () => void;
  canReopen?: boolean;
  onOpenReopenDialog?: () => void;
}

export default function ComplaintHeaderSection({
  complaint,
  t,
  onPrint,
  canReopen,
  onOpenReopenDialog,
}: ComplaintHeaderSectionProps) {
  const c = complaint;
  const citizenInfo = complaint?.citizenInfo || {};
  const filedDateVal =
    complaint?.createdAt ||
    complaint?.createdDate ||
    complaint?.timeline?.[0]?.createdAt;

  const natureTitle =
    getEntityLabel(c?.classification?.nature, t) || t("Complaint", "शिकायत");
  const serviceTitle =
    getEntityLabel(
      c?.classification?.service ||
        c?.service ||
        c?.classification?.subService,
      t,
    ) || "";

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-xs text-muted-foreground mb-1">
            {natureTitle} {t("ID", "आईडी")}
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
            <h2 className="text-lg sm:text-xl font-bold text-primary font-mono break-all">
              {complaint.grievanceId || complaint.id}
            </h2>
            {complaint.status && <StatusBadge status={complaint.status} />}
          </div>
          {serviceTitle && (
            <p className="text-sm text-foreground font-medium">
              {serviceTitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 no-print self-start sm:self-auto">
          {canReopen && onOpenReopenDialog && (
            <Button
              onClick={onOpenReopenDialog}
              className="shrink-0 text-xs sm:text-sm h-9 sm:h-10 bg-amber-500 hover:bg-amber-600 text-white font-medium flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {t("Reopen", "पुनः खोलें")}
            </Button>
          )}
          {onPrint && (
            <Button
              onClick={onPrint}
              variant="outline"
              className="shrink-0 text-xs sm:text-sm h-9 sm:h-10 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />{" "}
              {t("Print", "प्रिंट")}
            </Button>
          )}
        </div>
      </div>

      {/* Basic Citizen & Complaint Meta Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pb-4 border-b border-border">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">
              {t("Citizen", "नागरिक")}:
            </span>
            <span className="font-medium text-foreground">
              {citizenInfo.fullName || complaint.citizenName || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">
              {t("Mobile", "मोबाइल")}:
            </span>
            <span className="font-medium text-foreground">
              {citizenInfo.mobile || complaint.mobile || "N/A"}
            </span>
          </div>
          {citizenInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">
                {t("Email", "ईमेल")}:
              </span>
              <span className="font-medium text-foreground">
                {citizenInfo.email}
              </span>
            </div>
          )}
          {citizenInfo.alternateMobile && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">
                {t("Alternate Mobile", "वैकल्पिक मोबाइल")}:
              </span>
              <span className="font-medium text-foreground">
                {citizenInfo.alternateMobile}
              </span>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">
              {t("Raised On", "दाखिल")}:
            </span>
            <span className="font-medium text-foreground">
              {filedDateVal
                ? new Date(filedDateVal).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">
              {t("Assigned Officer", "नियुक्त अधिकारी")}:
            </span>
            <span className="font-medium text-foreground">
              {complaint.assignedOfficer?.fullName ||
                complaint.assignedOfficer?.name ||
                complaint.l1OfficerName ||
                t("Unassigned", "अभी तक नियुक्त नहीं")}
            </span>
          </div>
          {complaint.resolvedDate && (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-muted-foreground">
                {t("Resolved On", "हल")}:
              </span>
              <span className="font-medium text-foreground">
                {new Date(complaint.resolvedDate).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
