import {
  CheckCircle2,
  XCircle,
  Pause,
  RotateCcw,
  Clock,
  AlertCircle,
  Check,
  AlertTriangle,
} from "lucide-react";

export const IMG_BASE_URL = (() => {
  let url = import.meta.env.VITE_BASE_URL || "";
  url = url.replace(/\/?api\/v1\/?/, "/");
  return url;
})();
export const STATUS_ACTIONS = [
  {
    label: "Mark Resolved",
    labelHindi: "समाधान चिह्नित करें",
    value: "RESOLVED",
    icon: CheckCircle2,
    color: "bg-emerald-600 hover:bg-emerald-700",
    badgeLabel: "Resolved",
    badgeLabelHindi: "समाधान हो गया",
    badgeClass:
      "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900",
    isRemark: true,
  },
  {
    label: "Closed",
    labelHindi: "बंद",
    value: "CLOSED",
    icon: XCircle,
    color: "bg-red-600 hover:bg-red-700",
    badgeLabel: "Closed",
    badgeLabelHindi: "बंद",
    badgeClass:
      "bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800",
    isRemark: true,
  },
  {
    label: "In Progress",
    labelHindi: "प्रगति पर",
    value: "IN_PROGRESS",
    icon: Pause,
    color: "bg-amber-600 hover:bg-amber-700",
    badgeLabel: "In Progress",
    badgeLabelHindi: "प्रगति पर",
    badgeClass:
      "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900",
  },
  {
    label: "Reopen",
    labelHindi: "पुनः खोलें",
    value: "REOPENED",
    icon: RotateCcw,
    color: "bg-yellow-600 hover:bg-yellow-700",
    badgeLabel: "Reopened",
    badgeLabelHindi: "पुनः खोला गया",
    badgeClass:
      "bg-yellow-50 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-900",
  },
  {
    label: "Open",
    labelHindi: "खुला",
    value: "OPEN",
    icon: Clock,
    color: "bg-blue-600 hover:bg-blue-700",
    badgeLabel: "Open",
    badgeLabelHindi: "खुला",
    badgeClass:
      "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900",
  },
  {
    label: "Pending",
    labelHindi: "लंबित",
    value: "PENDING",
    icon: Clock,
    color: "bg-blue-600 hover:bg-blue-700",
    badgeLabel: "Pending",
    badgeLabelHindi: "लंबित",
    badgeClass:
      "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900",
  },
  {
    label: "Escalate",
    labelHindi: "आगे बढ़ाएं",
    value: "ESCALATED",
    icon: AlertCircle,
    color: "bg-red-600 hover:bg-red-700",
    badgeLabel: "Escalated",
    badgeLabelHindi: "अग्रसारित",
    badgeClass:
      "bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-300 border-red-300 dark:border-red-900",
  },
];

export const PRIORITY_ACTIONS = [
  {
    label: "Normal",
    labelHindi: "सामान्य",
    value: "NORMAL",
    icon: Check,
    color: "bg-slate-600 hover:bg-slate-700",
    badgeLabel: "Normal",
    badgeLabelHindi: "सामान्य",
    badgeClass:
      "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900",
  },
  {
    label: "Pending",
    labelHindi: "लंबित",
    value: "PENDING",
    icon: Clock,
    color: "bg-blue-600 hover:bg-blue-700",
    badgeLabel: "Pending",
    badgeLabelHindi: "लंबित",
    badgeClass:
      "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800",
  },
  {
    label: "Urgent",
    labelHindi: "जरूरी",
    value: "URGENT",
    icon: AlertTriangle,
    color: "bg-amber-600 hover:bg-amber-700",
    badgeLabel: "Urgent",
    badgeLabelHindi: "जरूरी",
    badgeClass:
      "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900",
  },
  {
    label: "Critical",
    labelHindi: "गंभीर",
    value: "CRITICAL",
    icon: AlertCircle,
    color: "bg-red-600 hover:bg-red-700",
    badgeLabel: "Critical",
    badgeLabelHindi: "गंभीर",
    badgeClass:
      "bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-300 border-red-300 dark:border-red-900",
  },
];

export const FIELD_VISIT_STATUS = [
  { value: "PENDING", label: "Pending" },
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "IN_PROGRESS", label: "In Progress" },
];

export const getFieldVisitStatusClass = (status: string) => {
  const normStatus = (status || "").toUpperCase();
  if (normStatus === "COMPLETED")
    return "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900";
  if (normStatus === "IN_PROGRESS")
    return "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900";
  if (normStatus === "SCHEDULED")
    return "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900";
  if (normStatus === "CANCELLED")
    return "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900";
  return "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900";
};

export const getStatusBadgeMeta = (status: string) => {
  const norm = (status || "").toUpperCase().replace(/[\s-]/g, "_");
  const match = STATUS_ACTIONS.find((a) => a.value === norm);
  if (match) return match;
  // Legacy / fallbacks
  if (norm === "OPEN") {
    return {
      badgeLabel: "Open",
      badgeLabelHindi: "खुला",
      badgeClass:
        "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900",
    };
  }
  if (norm === "PENDING") {
    return {
      badgeLabel: "Pending",
      badgeLabelHindi: "लंबित",
      badgeClass:
        "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900",
    };
  }
  if (norm === "REJECTED") {
    return {
      badgeLabel: "Rejected",
      badgeLabelHindi: "अस्वीकृत",
      badgeClass:
        "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900",
    };
  }
  if (norm === "FIELD_VISIT") {
    return {
      badgeLabel: "Field Visit",
      badgeLabelHindi: "क्षेत्र दौरा",
      badgeClass:
        "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900",
    };
  }
  // Default fallback
  return {
    badgeLabel: status || "Pending",
    badgeLabelHindi: "लंबित",
    badgeClass:
      "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800",
  };
};

export const getPriorityBadgeMeta = (priority: string) => {
  const norm = (priority || "").toUpperCase().replace(/[\s-]/g, "_");
  const match = PRIORITY_ACTIONS.find((p) => p.value === norm);
  if (match) return match;
  // Fallbacks
  if (norm === "LOW") {
    return {
      badgeLabel: "Low",
      badgeLabelHindi: "निम्न",
      badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    };
  }
  if (norm === "HIGH") {
    return {
      badgeLabel: "High",
      badgeLabelHindi: "उच्च",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    };
  }
  // Default fallback
  return {
    badgeLabel: priority || "Normal",
    badgeLabelHindi: "सामान्य",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
  };
};

export const feedbackStatus = [ "CLOSED"];

export const OFFICER_URL = import.meta.env.VITE_OFFICER_URL;