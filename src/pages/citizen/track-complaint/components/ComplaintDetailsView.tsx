import React, { useState, useMemo } from "react";
import ComplaintTimeline from "@/components/ComplaintTimeline";
import ComplaintFeedback from "./ComplaintFeedback";
import { feedbackStatus } from "@/utils/constants";
import {
  ComplaintHeaderSection,
  ComplaintPermanentAddress,
  ComplaintCorrespondenceAddress,
  ComplaintLocationDetails,
  ComplaintImpactVulnerability,
  ComplaintEvidenceSection,
  ComplaintReopenDialog,
} from "./viewComponents";

interface ComplaintDetailsViewProps {
  complaint: any;
  t: any;
  onPrint?: () => void;
}

export default function ComplaintDetailsView({
  complaint,
  t,
  onPrint,
}: ComplaintDetailsViewProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filedDateVal =
    complaint?.createdAt ||
    complaint?.createdDate ||
    complaint?.timeline?.[0]?.createdAt;

  const isWithin7Days = useMemo(() => {
    if (!filedDateVal) return false;
    const filedDate = new Date(filedDateVal);
    if (isNaN(filedDate.getTime())) return false;
    const diffTime = Date.now() - filedDate.getTime();
    return diffTime >= 0 && diffTime <= 7 * 24 * 60 * 60 * 1000;
  }, [filedDateVal]);

  const canReopen = Boolean(
    complaint?.status &&
      ["RESOLVED", "CLOSED"].includes(complaint.status) &&
      isWithin7Days &&
      (complaint?._id || complaint?.id),
  );

  if (!complaint) return null;

  const citizenInfo = complaint.citizenInfo || {};
  const permAddr = citizenInfo.address || {};
  const corrAddr = complaint.address || {};
  const loc = complaint.location || {};

  const hasPermAddr = Boolean(
    permAddr?.addressLine ||
      permAddr?.district ||
      permAddr?.subdivision ||
      permAddr?.panchayat ||
      permAddr?.thana ||
      permAddr?.pincode,
  );

  const isSameAddress = Boolean(
    complaint?.isCrpEqualPerAdd ||
      (!corrAddr?.addressLine &&
        !corrAddr?.district &&
        !corrAddr?.pincode &&
        hasPermAddr),
  );

  return (
    <div className="print-area space-y-6">
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6 px-0">
        <ComplaintHeaderSection
          complaint={complaint}
          t={t}
          onPrint={onPrint}
          canReopen={canReopen}
          onOpenReopenDialog={() => setIsDialogOpen(true)}
        />

        <ComplaintPermanentAddress address={permAddr} t={t} />

        <ComplaintCorrespondenceAddress
          address={corrAddr}
          permanentAddress={permAddr}
          isSameAddress={isSameAddress}
          t={t}
        />

        <ComplaintLocationDetails location={loc} t={t} />

        <ComplaintImpactVulnerability impact={complaint.impact} t={t} />

        <ComplaintEvidenceSection complaint={complaint} t={t} />

        {complaint?.status &&
          feedbackStatus.includes(complaint.status.toString()) && (
            <ComplaintFeedback
              complaintId={complaint?._id}
              existingRating={complaint?.rating}
              existingFeedback={complaint?.feedbackText}
              t={t}
            />
          )}

        {complaint.deptTransfer && (
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg text-sm text-amber-800 dark:text-amber-200">
            {t("Department Transfer", "विभागीय स्थानांतरण")}:{" "}
            {t(
              "This complaint involves multiple departments",
              "यह शिकायत कई विभागों की है",
            )}{" "}
            - {complaint.deptTransfer.join(" + ")}
          </div>
        )}
      </div>

      {complaint.timeline && complaint.timeline.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
          <h3 className="font-bold text-foreground mb-4">
            {t("Complaint Timeline", "शिकायत समयरेखा")} -{" "}
            {t("End-to-End Lifecycle", "संपूर्ण जीवनचक्र")}
          </h3>
          <ComplaintTimeline events={complaint.timeline} t={t} />
        </div>
      )}

      {(complaint?._id || complaint?.id) && (
        <ComplaintReopenDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          complaintId={complaint?._id || complaint?.id}
          t={t}
        />
      )}
    </div>
  );
}
