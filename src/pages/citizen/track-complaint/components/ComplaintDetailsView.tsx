import React from "react";
import {
  Printer,
  MapPin,
  User,
  Phone,
  Building2,
  Tag,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { StatusBadge } from "@/components/Badges";
import { Button } from "@/components/ui/button";
import ComplaintTimeline from "@/components/ComplaintTimeline";
import ComplaintFeedback from "./ComplaintFeedback";

interface ComplaintDetailsViewProps {
  complaint: any;
  t: any;
  onPrint: () => void;
}

export default function ComplaintDetailsView({
  complaint,
  t,
  onPrint,
}: ComplaintDetailsViewProps) {
  if (!complaint) return null;

  const feedbackStatus = ["RESOLVED"];

  return (
    <div className="print-area space-y-6">
      <div className="bg-white rounded-xl border border-border p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">
              {t("Complaint ID", "शिकायत आईडी")}
            </div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold text-primary font-mono">
                {complaint.grievanceId || complaint.id}
              </h2>
              <StatusBadge status={complaint.status} />
             
            </div>
            <p className="text-sm text-muted-foreground">
              {complaint.classification?.subService?.title ||
                complaint.serviceName}
            </p>
          </div>
          <Button
            onClick={onPrint}
            variant="outline"
            className="shrink-0 no-print"
          >
            <Printer className="w-4 h-4 mr-1" /> {t("Print", "प्रिंट")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("Citizen", "नागरिक")}:
              </span>
              <span className="font-medium">
                {complaint.citizenInfo?.fullName ||
                  complaint.citizenName ||
                  "—"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("Mobile", "मोबाइल")}:
              </span>
              <span className="font-medium">
                {complaint.citizenInfo?.mobile || complaint.mobile || "—"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("District", "ज़िला")}:
              </span>
              <span className="font-medium">
                {complaint.address?.district || complaint.districtName || "—"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("ULB / Ward", "नगर निकाय / वार्ड")}:
              </span>
              <span className="font-medium">
                {complaint.address?.villageOrWard || complaint.ulbName || "—"}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("Filed On", "दाखिल")}:
              </span>
              <span className="font-medium">
                {complaint.createdAt || complaint.createdDate
                  ? new Date(
                      complaint.createdAt || complaint.createdDate,
                    ).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "—"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("Source", "स्रोत")}:
              </span>
              <span className="font-medium capitalize">
                {complaint.source || "Website"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("Assigned Officer", "नियुक्त अधिकारी")}:
              </span>
              <span className="font-medium">
                {complaint.assignedOfficer?.fullName ||
                  complaint.assignedOfficer?.name ||
                  complaint.l1OfficerName ||
                  t("Not yet assigned", "अभी तक नियुक्त नहीं")}
              </span>
            </div>
            {complaint.resolvedDate && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-muted-foreground">
                  {t("Resolved On", "हल")}:
                </span>
                <span className="font-medium">
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

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">
            {t("Description", "विवरण")}
          </div>
          <p className="text-sm text-foreground">
            {complaint.evidence?.details || complaint.description || "—"}
          </p>
        </div>
        {feedbackStatus.includes(complaint.status.toString()) && (
          <ComplaintFeedback
            complaintId={complaint?._id}
            existingRating={complaint?.rating}
            existingFeedback={complaint?.feedbackText}
            t={t}
          />
        )}

        {complaint.deptTransfer && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            {t("Department Transfer", "विभागीय स्थानांतरण")}:{" "}
            {t(
              "This complaint involves multiple departments",
              "यह शिकायत कई विभागों की है",
            )}{" "}
            — {complaint.deptTransfer.join(" + ")}
          </div>
        )}
      </div>

      {complaint.timeline && complaint.timeline.length > 0 && (
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">
            {t("Complaint Timeline", "शिकायत समयरेखा")} —{" "}
            {t("End-to-End Lifecycle", "संपूर्ण जीवनचक्र")}
          </h3>
          <ComplaintTimeline events={complaint.timeline} t={t} />
        </div>
      )}
    </div>
  );
}
