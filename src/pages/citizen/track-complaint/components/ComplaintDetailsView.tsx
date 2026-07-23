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
  RotateCcw,
} from "lucide-react";
import { StatusBadge } from "@/components/Badges";
import { Button } from "@/components/ui/button";
import ComplaintTimeline from "@/components/ComplaintTimeline";
import ComplaintFeedback from "./ComplaintFeedback";
import { feedbackStatus } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reopenComplaint } from "@/api/complaints.api";
import { getErrorToast, getSuccessToast } from "@/utils/helpers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [reOpenReason, setReOpenReason] = React.useState("");

  const filedDateVal = complaint?.createdAt || complaint?.createdDate;
  const isWithin7Days = React.useMemo(() => {
    if (!filedDateVal) return false;
    const filedDate = new Date(filedDateVal);
    if (isNaN(filedDate.getTime())) return false;
    const diffTime = Date.now() - filedDate.getTime();
    return diffTime >= 0 && diffTime <= 7 * 24 * 60 * 60 * 1000;
  }, [filedDateVal]);

  const canReopen = ["RESOLVED", "CLOSED"].includes(complaint?.status) && isWithin7Days;

  const mutation = useMutation({
    mutationFn: () =>
      reopenComplaint({
        id: complaint?._id || complaint?.id,
        data: { reOpenReason },
      }),
    onSuccess: () => {
      getSuccessToast(
        t("Complaint reopened successfully", "शिकायत सफलतापूर्वक पुनः खोल दी गई")
      );
      queryClient.invalidateQueries({ queryKey: ["grievance"] });
      setIsDialogOpen(false);
      setReOpenReason("");
    },
    onError: (err: any) => {
      getErrorToast(err);
    },
  });

  const handleReopenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reOpenReason.trim()) {
      getErrorToast(
        t(
          "Please enter a reason for reopening",
          "कृपया पुनः खोलने का कारण दर्ज करें"
        )
      );
      return;
    }
    mutation.mutate();
  };

  if (!complaint) return null;



  return (
    <div className="print-area space-y-6">
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">
              {t("Complaint ID", "शिकायत आईडी")}
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
              <h2 className="text-lg sm:text-xl font-bold text-primary font-mono break-all">
                {complaint.grievanceId || complaint.id}
              </h2>
              <StatusBadge status={complaint.status} />
            </div>
            <p className="text-sm text-foreground font-medium">
              {t(complaint.classification?.subService?.title , complaint.classification?.subService?.titleHindi)}
            </p>
          </div>
          <div className="flex items-center gap-2 no-print self-start sm:self-auto">
            {canReopen && (
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="shrink-0 text-xs sm:text-sm h-9 sm:h-10 bg-amber-500 hover:bg-amber-600 text-white font-medium flex items-center gap-1.5 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {t("Reopen", "पुनः खोलें")}
              </Button>
            )}
            <Button
              onClick={onPrint}
              variant="outline"
              className="shrink-0 text-xs sm:text-sm h-9 sm:h-10 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" /> {t("Print", "प्रिंट")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("Citizen", "नागरिक")}:
              </span>
              <span className="font-medium text-foreground">
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
              <span className="font-medium text-foreground">
                {complaint.citizenInfo?.mobile || complaint.mobile || "—"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("District", "ज़िला")}:
              </span>
              <span className="font-medium text-foreground">
                {t(complaint.address?.district?.name ||  "—", complaint.address?.district?.nameHindi ||  "—")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("Village / Ward", "गाँव / वार्ड")}:
              </span>
              <span className="font-medium text-foreground">
                {complaint.address?.villageOrWard || "—"}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("Filed On", "दाखिल")}:
              </span>
              <span className="font-medium text-foreground">
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
              <span className="font-medium text-foreground capitalize">
                {complaint.source || "Website"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("Assigned Officer", "नियुक्त अधिकारी")}:
              </span>
              <span className="font-medium text-foreground">
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

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">
            {t("Description", "विवरण")}
          </div>
          <p className="text-sm text-foreground">
            {complaint.evidence?.details || complaint.description || "—"}
          </p>
        </div>
          {/* <div className="mt-4 p-3 bg-muted/50 rounded-lg"> */}
        
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">
            {t("Subject", "विषय")}
          </div>
          <p className="text-sm text-foreground">
            {complaint.classification?.subject || complaint?.subject || "—"}
          </p>
        </div>
        {/* </div> */}
        {feedbackStatus.includes(complaint.status.toString()) && (
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
            — {complaint.deptTransfer.join(" + ")}
          </div>
        )}
      </div>

      {complaint.timeline && complaint.timeline.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
          <h3 className="font-bold text-foreground mb-4">
            {t("Complaint Timeline", "शिकायत समयरेखा")} —{" "}
            {t("End-to-End Lifecycle", "संपूर्ण जीवनचक्र")}
          </h3>
          <ComplaintTimeline events={complaint.timeline} t={t} />
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("Reopen Complaint", "शिकायत पुनः खोलें")}</DialogTitle>
            <DialogDescription>
              {t(
                "Please state the reason for reopening this complaint. It will be reassigned for investigation.",
                "कृपया इस शिकायत को पुनः खोलने का कारण बताएं। इसे जांच के लिए फिर से सौंपा जाएगा।"
              )}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleReopenSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label  htmlFor="reopen-reason" className="text-sm font-medium mb-4">
                {t("Reason ", "पुनः खोलने का कारण")}
              </Label>
              <Textarea
              
                id="reopen-reason"
                placeholder={t(
                  "e.g. Work is incomplete / not resolved correctly",
                  "उदा. कार्य अपूर्ण है / सही ढंग से हल नहीं हुआ"
                )}
                value={reOpenReason}
                onChange={(e) => setReOpenReason(e.target.value)}
                required
                rows={4}
                className="resize-none mt-2"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={mutation.isPending}
              >
                {t("Cancel", "रद्द करें")}
              </Button>
              <Button
                type="submit"
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
                disabled={!reOpenReason.trim() || mutation.isPending}
              >
                {mutation.isPending ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2 inline-block" />
                ) : null}
                {t("Reopen Complaint", "शिकायत पुनः खोलें")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
