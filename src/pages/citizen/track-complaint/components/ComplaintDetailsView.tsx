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
import { feedbackStatus, IMG_BASE_URL } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reopenComplaint } from "@/api/complaints.api";
import { getErrorToast, getImageUrl, getSuccessToast } from "@/utils/helpers";
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

  const canReopen =
    ["RESOLVED", "CLOSED"].includes(complaint?.status) && isWithin7Days;

  const mutation = useMutation({
    mutationFn: () =>
      reopenComplaint({
        id: complaint?._id || complaint?.id,
        data: { reOpenReason },
      }),
    onSuccess: () => {
      getSuccessToast(
        t(
          "Complaint reopened successfully",
          "शिकायत सफलतापूर्वक पुनः खोल दी गई",
        ),
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
          "कृपया पुनः खोलने का कारण दर्ज करें",
        ),
      );
      return;
    }
    mutation.mutate();
  };

  if (!complaint) return null;

  const c = complaint;
  const getEntityLabel = (item: any) => {
    if (!item) return "";
    if (typeof item === "object") {
      return (
        t(item.name || item.title, item.nameHindi || item.titleHindi) ||
        item.name ||
        item.title ||
        item.nameHindi ||
        item.titleHindi ||
        ""
      );
    }
    return String(item);
  };

  const citizenInfo = complaint.citizenInfo || {};
  const permAddr = citizenInfo.address || {};
  const corrAddr = complaint.address || {};
  const loc = complaint.location || {};
  const attachments = c?.evidence?.attachments || [];
  const geotaggedImages =
    c?.geotaggedImages || c?.evidence?.geotaggedImages || [];
   

  return (
    <div className="print-area space-y-6">
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6 px-0">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">
              {t(`${c?.classification?.nature?.title || "Complaint"} ID`, "आईडी")}
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
              <h2 className="text-lg sm:text-xl font-bold text-primary font-mono break-all">
                {complaint.grievanceId || complaint.id}
              </h2>
              <StatusBadge status={complaint.status} />
            </div>
            <p className="text-sm text-foreground font-medium">
              {t(
                complaint.classification?.subService?.title,
                complaint.classification?.subService?.titleHindi,
              )}
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
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />{" "}
              {t("Print", "प्रिंट")}
            </Button>
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
                {citizenInfo.fullName ||
                  complaint.citizenName ||
                  "N/A"}
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
            {/* <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">
                {t("Source", "स्रोत")}:
              </span>
              <span className="font-medium text-foreground capitalize">
                {complaint.source || "Website"}
              </span>
            </div> */}
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

        {/* Permanent Address Block (citizenInfo.address) */}
        {(permAddr.addressLine ||
          permAddr.district ||
          permAddr.subdivision ||
          permAddr.panchayat ||
          permAddr.thana ||
          permAddr.pincode) && (
          <div className="mt-4 pt-3 pb-4 border-b border-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              {t("Permanent Address", "स्थायी पता")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {permAddr.addressLine && (
                <div className="sm:col-span-2 md:col-span-3">
                  <span className="text-xs text-muted-foreground block">
                    {t("Address Line", "पता विवरण")}
                  </span>
                  <span className="font-medium text-foreground">
                    {permAddr.addressLine}
                  </span>
                </div>
              )}
              {permAddr.district && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("District", "ज़िला")}
                  </span>
                  <span className="font-medium text-foreground">
                    {getEntityLabel(permAddr.district)}
                  </span>
                </div>
              )}
              {permAddr.subdivision && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("Block / Subdivision", "प्रखंड / अनुमंडल")}
                  </span>
                  <span className="font-medium text-foreground">
                    {getEntityLabel(permAddr.subdivision)}
                  </span>
                </div>
              )}
              {permAddr.panchayat && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("Panchayat", "पंचायत")}
                  </span>
                  <span className="font-medium text-foreground">
                    {permAddr.panchayat}
                  </span>
                </div>
              )}
              {permAddr.thana && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("Thana", "थाना")}
                  </span>
                  <span className="font-medium text-foreground">
                    {permAddr.thana}
                  </span>
                </div>
              )}
              {permAddr.pincode && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("Pin Code", "पिन कोड")}
                  </span>
                  <span className="font-medium text-foreground">
                    {permAddr.pincode}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Correspondence Address Block (complaint.address) */}
        {(corrAddr.addressLine ||
          corrAddr.state ||
          corrAddr.city ||
          corrAddr.district ||
          corrAddr.subdivision ||
          corrAddr.panchayat ||
          corrAddr.thana ||
          corrAddr.villageOrWard ||
          corrAddr.pincode ||
          corrAddr.pinCode) && (
          <div className="mt-4 pt-3 pb-4 border-b border-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-primary shrink-0" />
              {t("Correspondence Address", "पत्राचार का पता")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {(corrAddr.addressLine || corrAddr.landmark) && (
                <div className="sm:col-span-2 md:col-span-3">
                  <span className="text-xs text-muted-foreground block">
                    {t("Address Line", "पता विवरण")}
                  </span>
                  <span className="font-medium text-foreground">
                    {corrAddr.addressLine || corrAddr.landmark}
                  </span>
                </div>
              )}
              {corrAddr.state && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("State", "राज्य")}
                  </span>
                  <span className="font-medium text-foreground">
                    {corrAddr.state}
                  </span>
                </div>
              )}
              {corrAddr.city && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("City", "शहर")}
                  </span>
                  <span className="font-medium text-foreground">
                    {corrAddr.city}
                  </span>
                </div>
              )}
              {corrAddr.district && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("District", "ज़िला")}
                  </span>
                  <span className="font-medium text-foreground">
                    {getEntityLabel(corrAddr.district)}
                  </span>
                </div>
              )}
              {corrAddr.subdivision && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("Block / Subdivision", "प्रखंड / अनुमंडल")}
                  </span>
                  <span className="font-medium text-foreground">
                    {getEntityLabel(corrAddr.subdivision)}
                  </span>
                </div>
              )}
              {corrAddr.panchayat && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("Panchayat", "पंचायत")}
                  </span>
                  <span className="font-medium text-foreground">
                    {corrAddr.panchayat}
                  </span>
                </div>
              )}
              {corrAddr.thana && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("Thana", "थाना")}
                  </span>
                  <span className="font-medium text-foreground">
                    {corrAddr.thana}
                  </span>
                </div>
              )}
              {corrAddr.villageOrWard && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("Village / Ward", "गाँव / वार्ड")}
                  </span>
                  <span className="font-medium text-foreground">
                    {corrAddr.villageOrWard}
                  </span>
                </div>
              )}
              {(corrAddr.pincode || corrAddr.pinCode) && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("Pin Code", "पिन कोड")}
                  </span>
                  <span className="font-medium text-foreground">
                    {corrAddr.pincode || corrAddr.pinCode}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Location Details / Place of occurrence Block (complaint.location) */}
        {(loc.division ||
          loc.district ||
          loc.subdivision ||
          loc.block ||
          loc.panchayat ||
          loc.pincode) && (
          <div className="mt-4 pt-3 pb-4 border-b border-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-primary shrink-0" />
              {t(
                "Location Details/Place of occurence",
                "स्थान का विवरण/घटना का स्थान",
              )}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {loc.division && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("Division", "प्रमंडल")}
                  </span>
                  <span className="font-medium text-foreground">
                    {loc.division}
                  </span>
                </div>
              )}
              {loc.district && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("District", "ज़िला")}
                  </span>
                  <span className="font-medium text-foreground">
                    {getEntityLabel(loc.district)}
                  </span>
                </div>
              )}
              {loc.subdivision && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("Subdivision", "अनुमंडल")}
                  </span>
                  <span className="font-medium text-foreground">
                    {getEntityLabel(loc.subdivision)}
                  </span>
                </div>
              )}
              {loc.block && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("Block", "प्रखंड")}
                  </span>
                  <span className="font-medium text-foreground">
                    {loc.block}
                  </span>
                </div>
              )}
              {loc.panchayat && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("Panchayat", "पंचायत")}
                  </span>
                  <span className="font-medium text-foreground">
                    {loc.panchayat}
                  </span>
                </div>
              )}
              {(loc.pincode || loc.pinCode) && (
                <div>
                  <span className="text-xs text-muted-foreground block">
                    {t("Pin Code", "पिन कोड")}
                  </span>
                  <span className="font-medium text-foreground">
                    {loc.pincode || loc.pinCode}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">
            {t("Brief Description", "संक्षिप्त विवरण")}
          </div>
          <p className="text-sm text-foreground">
            {complaint.evidence?.details || complaint.description || "N/A"}
          </p>
        </div>

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="mt-4">
            <div className="text-[10px] lg:text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
              {t("Uploaded document", "अपलोड किया गया दस्तावेज़")} (
              {attachments.length})
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {attachments.map((att: any, idx: number) => {
                const isImage =
                  att.type === "IMAGE" ||
                  att.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                return (
                  <div
                    key={idx}
                    className="border border-border rounded-lg p-2 bg-card overflow-hidden"
                  >
                    {isImage ? (
                      <a
                        href={getImageUrl(att.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={getImageUrl(att.url)}
                          alt={att.fileName || "Attachment"}
                          className=" max-h-48 max-w-48 mx-auto w-full h-full object-contain rounded hover:scale-105 transition-transform"
                        />
                      </a>
                    ) : (
                      <div className="w-full h-24 bg-muted/50 rounded flex items-center justify-center flex-col p-1 text-center">
                        <span className="text-[10px] text-muted-foreground font-mono truncate w-full">
                          {att.fileName}
                        </span>
                        <a
                          href={IMG_BASE_URL + att.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline mt-1 font-semibold"
                        >
                          {t("Download", "डाउनलोड करें")}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Geotagged Images */}
        {geotaggedImages.length > 0 && (
          <div className="mt-4">
            <div className="text-[10px] lg:text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
              {t("Geo-Tagged Field Photos", "जियो-टैग की गई फील्ड तस्वीरें")} (
              {geotaggedImages.length})
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {geotaggedImages.map((img: any, idx: number) => {
                const url =
                  typeof img === "string" ? img : img?.url || img?.path || "";
                const displayUrl = getImageUrl(url);
                const fileName =
                  typeof img === "object"
                    ? img?.fileName || img?.name || `Field Photo ${idx + 1}`
                    : url.split("/").pop() || `Field Photo ${idx + 1}`;
                const isImage =
                  (typeof img === "object" && img?.type === "IMAGE") ||
                  !!url.match(/\.(jpg|jpeg|png|gif|webp)$/i);

                return (
                  <div
                    key={idx}
                    className="border border-border rounded-lg p-2 bg-card overflow-hidden"
                  >
                    {isImage ? (
                      <a
                        href={displayUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={displayUrl}
                          alt={fileName}
                          className="max-h-48 max-w-48 mx-auto w-full h-full object-contain  rounded hover:scale-105 transition-transform"
                        />
                      </a>
                    ) : (
                      <div className="w-full h-24 bg-muted/50 rounded flex items-center justify-center flex-col p-1 text-center">
                        <span className="text-[10px] text-muted-foreground font-mono truncate w-full">
                          {fileName}
                        </span>
                        <a
                          href={displayUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline mt-1 font-semibold"
                        >
                          {t("Download", "डाउनलोड करें")}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {t("Reopen Complaint", "शिकायत पुनः खोलें")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "Please state the reason for reopening this complaint. It will be reassigned for investigation.",
                "कृपया इस शिकायत को पुनः खोलने का कारण बताएं। इसे जांच के लिए फिर से सौंपा जाएगा।",
              )}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleReopenSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="reopen-reason"
                className="text-sm font-medium mb-4"
              >
                {t("Reason ", "पुनः खोलने का कारण")}
              </Label>
              <Textarea
                id="reopen-reason"
                placeholder={t(
                  "e.g. Work is incomplete / not resolved correctly",
                  "उदा. कार्य अपूर्ण है / सही ढंग से हल नहीं हुआ",
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
