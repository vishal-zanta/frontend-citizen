import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  COMPLAINTS,
  CALL_TRACKER,
  OFFICERS,
  SERVICES,
  DISTRICTS,
  ULBS,
} from "@/lib/biharData";
import { StatusBadge, PriorityBadge } from "@/components/Badges";
import {
  User,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Tag,
  ExternalLink,
  HardHat,
  Navigation,
  Camera,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

// ── Field Visit Data (shared across pages) ──
export const FIELD_VISIT_DATA = [
  {
    id: "FV-2026-0042",
    complaintId: "BH-2026-047824",
    officer: "Amit Ranjan",
    officerId: "off-003",
    ward: "Gaya Ward-03",
    district: "Gaya",
    service: "Road & Infrastructure",
    subservice: "Potholes / damaged road",
    scheduledDate: "07 Jul 2026, 10:00 AM",
    status: "Scheduled",
    priority: "High",
    photoUploaded: false,
    geoTag: "24.7914°N, 85.0002°E",
    notes:
      "Site inspection pending. Large potholes reported on Gola Road causing accidents.",
  },
  {
    id: "FV-2026-0041",
    complaintId: "BH-2026-047821",
    officer: "Rajesh Kumar Singh",
    officerId: "off-001",
    ward: "Patna Ward-12",
    district: "Patna",
    service: "Drainage & Sewerage",
    subservice: "Drain overflow / waterlogging",
    scheduledDate: "06 Jul 2026, 02:00 PM",
    status: "Completed",
    priority: "High",
    photoUploaded: true,
    geoTag: "25.6093°N, 85.1235°E",
    notes:
      "Site inspected. Drain cleaned and cover repaired. Resolution photo uploaded with geo-tag.",
  },
  {
    id: "FV-2026-0040",
    complaintId: "BH-2026-047826",
    officer: "Md. Irfan Alam",
    officerId: "off-006",
    ward: "Muzaffarpur Ward-15",
    district: "Muzaffarpur",
    service: "Animal Rescue",
    subservice: "Stray dog menace",
    scheduledDate: "06 Jul 2026, 09:00 AM",
    status: "Completed",
    priority: "High",
    photoUploaded: true,
    geoTag: "26.1209°N, 85.3647°E",
    notes: "Stray dogs relocated to animal shelter. Area secured near school.",
  },
  {
    id: "FV-2026-0039",
    complaintId: "BH-2026-047822",
    officer: "Sunita Devi",
    officerId: "off-002",
    ward: "Patna Ward-07",
    district: "Patna",
    service: "Street Lighting",
    subservice: "Street light not working",
    scheduledDate: "07 Jul 2026, 11:00 AM",
    status: "In Progress",
    priority: "Normal",
    photoUploaded: true,
    geoTag: "25.6130°N, 85.1441°E",
    notes:
      "3 street lights identified as non-functional. Bulbs being replaced. Estimated completion by evening.",
  },
  {
    id: "FV-2026-0038",
    complaintId: "BH-2026-047825",
    officer: "Nisha Kumari",
    officerId: "off-005",
    ward: "Bhagalpur Ward-22",
    district: "Bhagalpur",
    service: "Sanitation & Waste",
    subservice: "Garbage not collected",
    scheduledDate: "07 Jul 2026, 03:00 PM",
    status: "Scheduled",
    priority: "Normal",
    photoUploaded: false,
    geoTag: "25.2425°N, 86.9842°E",
    notes:
      "Visit scheduled for garbage collection assessment in Sujaganj area.",
  },
];

function getServiceName(serviceId: string) {
  const s = SERVICES.find((s) => s.id === serviceId);
  return s ? s.name : serviceId;
}

interface IdProps {
  id: string;
  className?: string;
}

export function ComplaintId({ id, className = "" }: IdProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`font-mono text-primary hover:underline cursor-pointer ${className}`}
      >
        {id}
      </button>
      <ComplaintDetailDialog
        complaintId={id}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export function CallId({ id, className = "" }: IdProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`font-mono text-primary hover:underline cursor-pointer ${className}`}
      >
        {id}
      </button>
      <CallDetailDialog
        callId={id}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export function OfficerId({ id, className = "" }: IdProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`font-mono text-primary hover:underline cursor-pointer ${className}`}
      >
        {id}
      </button>
      <OfficerDetailDialog
        officerId={id}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export function FieldVisitId({ id, className = "" }: IdProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`font-mono text-primary hover:underline cursor-pointer ${className}`}
      >
        {id}
      </button>
      <FieldVisitDetailDialog
        visitId={id}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

interface DialogProps {
  complaintId?: string;
  callId?: string;
  officerId?: string;
  visitId?: string;
  open: boolean;
  onClose: () => void;
}

import { useGetComplaintById } from "@/hooks/useGetQuery";
import LoaderErrWrapper from "@/components/LoaderErrWrapper";

export function ComplaintDetailDialog({
  complaintId,
  open,
  onClose,
}: {
  complaintId: string;
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const { data, isLoading, error } = useGetComplaintById(
    [complaintId],
    { _id: complaintId },
    open,
  );
  const complaint = data?.data?.data;
  console.log({complaint})

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[92vw] max-w-2xl max-h-[85vh] overflow-y-auto p-4 sm:p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex flex-wrap items-center gap-2 text-base sm:text-lg">
            <span className="text-foreground ">{t("Complaint Details", "शिकायत का विवरण")}</span>
            <span className="font-mono text-primary text-sm sm:text-base break-all">{complaint?.grievanceId}</span>
          </DialogTitle>
        </DialogHeader>
        <LoaderErrWrapper isLoading={isLoading} error={error}>
          {complaint ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={complaint.status} />
                <PriorityBadge
                  priority={complaint.assignedPriority || complaint.priority}
                />
                <span className="text-[10px] sm:text-xs text-muted-foreground ml-auto capitalize">
                  {complaint.source || "Website"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{t("Citizen:", "नागरिक:")}</span>
                  <span className="font-medium text-foreground truncate">
                    {complaint.citizenInfo?.fullName ||
                      complaint.citizenName ||
                      "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{t("Mobile:", "मोबाइल:")}</span>
                  <span className="font-medium text-foreground">
                    {complaint.citizenInfo?.mobile || complaint.mobile || "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{t("District:", "जिला:")}</span>
                  <span className="font-medium text-foreground">
                    {complaint.address?.district?.name || complaint?.address?.district ||
                      complaint.districtName ||
                      "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{t("Village / Ward:", "ग्राम / वार्ड:")}</span>
                  <span className="font-medium text-foreground">
                    {complaint.address?.villageOrWard ||
                      complaint.ulbName ||
                      "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{t("Subdivision:", "अनुमंडल:")}</span>
                  <span className="font-medium text-foreground">
                    {complaint.address?.subdivision || complaint.ward || "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{t("Filed:", "दर्ज:")}</span>
                  <span className="font-medium text-foreground">
                    {complaint.createdAt || complaint.createdDate
                      ? new Date(
                          complaint.createdAt || complaint.createdDate,
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </span>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">
                  {t("Service", "सेवा")}
                </div>
                <div className="font-medium text-xs sm:text-sm text-foreground">
                  {complaint.classification?.subService?.title ||
                    complaint.serviceName ||
                    "—"}
                </div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">
                  {t("Description", "विवरण")}
                </div>
                <p className="text-xs sm:text-sm whitespace-pre-wrap text-foreground">
                  {complaint.evidence?.details || complaint.description || "—"}
                </p>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">
                  {t("Subject", "विषय")}
                </div>
                <p className="text-xs sm:text-sm whitespace-pre-wrap text-foreground">
                  {complaint.classification?.subject || "—"}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-lg p-3">
                  <div className="text-[9px] sm:text-[10px] uppercase text-muted-foreground">
                    {t("Assigned Officer", "नियुक्त अधिकारी")}
                  </div>
                  <div className="font-semibold text-xs sm:text-sm text-foreground">
                    {complaint.assignedOfficer?.fullName ||
                      complaint.assignedOfficer?.name ||
                      complaint.l1OfficerName ||
                      t("Unassigned", "असाइन नहीं किया गया")}
                  </div>
                </div>
              </div>
              {complaint.resolvedDate && (
                <div className="text-xs sm:text-sm text-emerald-600">
                  {t("Resolved on", "समाधान की तारीख")}{" "}
                  {new Date(complaint.resolvedDate).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </div>
              )}
              <Link
                to={`/citizen/track?complaint=${complaint._id || complaint.id}`}
                className="flex items-center gap-1 text-xs sm:text-sm text-primary hover:underline"
              >
                {t("View Full Timeline", "पूरी समयरेखा देखें")} <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              {t("Complaint not found.", "शिकायत नहीं मिली।")}
            </p>
          )}
        </LoaderErrWrapper>
      </DialogContent>
    </Dialog>
  );
}

export function CallDetailDialog({
  callId,
  open,
  onClose,
}: {
  callId: string;
  open: boolean;
  onClose: () => void;
}) {
  const call = CALL_TRACKER.find((c) => c.id === callId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Call Details - {callId}</DialogTitle>
        </DialogHeader>
        {call ? (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-muted-foreground">Time:</span>{" "}
                <span className="font-medium">{call.time}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Duration:</span>{" "}
                <span className="font-medium">{call.duration}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Agent:</span>{" "}
                <span className="font-medium">{call.agent}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>{" "}
                <span className="font-medium">{call.status}</span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Disposition:</span>{" "}
                <span className="font-medium">{call.disposition}</span>
              </div>
            </div>
            {call.complaintId && (
              <div className="bg-muted/50 rounded-lg p-3">
                <span className="text-xs text-muted-foreground">
                  Linked Complaint:{" "}
                </span>
                <ComplaintId id={call.complaintId} />
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Call not found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function OfficerDetailDialog({
  officerId,
  open,
  onClose,
}: {
  officerId: string;
  open: boolean;
  onClose: () => void;
}) {
  const officer = OFFICERS.find((o) => o.id === officerId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HardHat className="w-5 h-5 text-primary" /> Officer Details
            <span className="font-mono text-primary text-sm">{officerId}</span>
          </DialogTitle>
        </DialogHeader>
        {officer ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                {officer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <div className="font-bold text-lg">{officer.name}</div>
                <Badge
                  variant="outline"
                  className={`text-xs ${officer.designation === "l1-officer" ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900" : officer.designation === "l2-officer" ? "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900" : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900"}`}
                >
                  {officer.designationLabel}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">District:</span>
                <span className="font-medium">
                  {DISTRICTS.find((d) => d.id === officer.district)?.name ||
                    officer.district}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">ULB:</span>
                <span className="font-medium">
                  {ULBS.find((u) => u.id === officer.ulb)?.name || officer.ulb}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Mobile:</span>
                <span className="font-medium">{officer.mobile}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Status:</span>
                <Badge
                  variant="outline"
                  className={`text-xs ${officer.status === "active" ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300" : "bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400"}`}
                >
                  {officer.status}
                </Badge>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">
                Department / Services Assigned
              </div>
              <div className="flex flex-wrap gap-1.5">
                {officer.services.length > 0 ? (
                  officer.services.map((sId) => (
                    <Badge
                      key={sId}
                      variant="outline"
                      className="text-xs bg-blue-50 dark:bg-blue-950/50 text-primary dark:text-blue-300 border-blue-200 dark:border-blue-900"
                    >
                      {getServiceName(sId)}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    All services (admin level)
                  </span>
                )}
              </div>
            </div>
            {officer.wards.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">
                  Assigned Wards
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {officer.wards.map((w) => (
                    <Badge
                      key={w}
                      variant="outline"
                      className="text-xs bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900"
                    >
                      {w}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-transparent dark:border-emerald-900 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {officer.resolved}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Resolved
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-transparent dark:border-amber-900 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  {officer.pending}
                </div>
                <div className="text-[10px] text-muted-foreground">Pending</div>
              </div>
              <div className="bg-red-50 dark:bg-red-950/40 border border-transparent dark:border-red-900 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-red-600 dark:text-red-400">
                  {officer.slaBreached}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  SLA Breach
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/40 border border-transparent dark:border-blue-900 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {officer.avgResolutionHrs}h
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Avg Resolve
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Officer not found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function FieldVisitDetailDialog({
  visitId,
  open,
  onClose,
}: {
  visitId: string;
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const visit = FIELD_VISIT_DATA.find((v) => v.id === visitId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" /> {t("Field Visit Details", "फील्ड विजिट विवरण")}
            <span className="font-mono text-primary text-sm">{visitId}</span>
          </DialogTitle>
        </DialogHeader>
        {visit ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={`text-xs ${visit.status === "Completed" ? "bg-emerald-50 text-emerald-700" : visit.status === "In Progress" ? "bg-purple-50 text-purple-700" : "bg-amber-50 text-amber-700"}`}
              >
                {visit.status}
              </Badge>
              <PriorityBadge priority={visit.priority} />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t("Officer:", "अधिकारी:")}</span>
                <span className="font-medium">{visit.officer}</span>
              </div>
              <div className="flex items-center gap-2">
                <HardHat className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t("Officer ID:", "अधिकारी आईडी:")}</span>
                <OfficerId id={visit.officerId} />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t("Ward:", "वार्ड:")}</span>
                <span className="font-medium">{visit.ward}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t("District:", "जिला:")}</span>
                <span className="font-medium">{visit.district}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t("Scheduled:", "निर्धारित:")}</span>
                <span className="font-medium">{visit.scheduledDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t("Photo:", "फोटो:")}</span>
                {visit.photoUploaded ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <span className="text-xs text-amber-600">{t("Pending", "लंबित")}</span>
                )}
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">{t("Service", "सेवा")}</div>
              <div className="font-medium">
                {visit.service} — {visit.subservice}
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">
                {t("Complaint ID", "शिकायत आईडी")}
              </div>
              <ComplaintId id={visit.complaintId} />
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">{t("Geo-Tag", "जियो-टैग")}</div>
              <div className="font-mono text-sm">{visit.geoTag}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                {t("Visit Notes", "विजिट टिप्पणी")}
              </div>
              <p className="text-sm">{visit.notes}</p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            {t("Field visit not found.", "फील्ड विजिट नहीं मिली।")}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
