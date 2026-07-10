import React from "react";
import {
  FilePlus2,
  UserCheck,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Camera,
  Star,
  Lock,
  Flag,
  Clock,
  Send,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  COMPLAINT_REGISTERED: FilePlus2,
  PRIORITY_SET: AlertTriangle,
  PRIORITY_UPDATED: AlertTriangle,
  OFFICER_ASSIGNED: UserCheck,
  OFFICER_TRANSFERRED: UserCheck,
  STATUS_UPDATED: CheckCircle2,
  STATUS_CHANGED: CheckCircle2,
  COMMENT_ADDED: MessageSquare,
  GEOTAGGED_IMAGE_UPLOADED: Camera,
  FEEDBACK_SUBMITTED: Star,
};

const eventTranslations: Record<string, { en: string; hi: string }> = {
  COMPLAINT_REGISTERED: { en: "Complaint Registered", hi: "शिकायत दर्ज की गई" },
  PRIORITY_SET: { en: "Priority Set", hi: "प्राथमिकता निर्धारित" },
  PRIORITY_UPDATED: { en: "Priority Updated", hi: "प्राथमिकता अपडेट की गई" },
  OFFICER_ASSIGNED: { en: "Officer Assigned", hi: "अधिकारी नियुक्त" },
  OFFICER_TRANSFERRED: { en: "Officer Transferred", hi: "अधिकारी स्थानांतरित" },
  STATUS_UPDATED: { en: "Status Updated", hi: "स्थिति अपडेट की गई" },
  STATUS_CHANGED: { en: "Status Changed", hi: "स्थिति बदली गई" },
  COMMENT_ADDED: { en: "Comment Added", hi: "टिप्पणी जोड़ी गई" },
  GEOTAGGED_IMAGE_UPLOADED: { en: "Geo-tagged Photo Uploaded", hi: "जियो-टैग फोटो अपलोड की गई" },
  FEEDBACK_SUBMITTED: { en: "Feedback Submitted", hi: "फीडबैक सबमिट किया गया" },
};

interface TimelineEvent {
  _id: string;
  type: string;
  actor: {
    id: string;
    name: string;
    role: string;
  };
  metadata?: {
    description?: string;
    [key: string]: any;
  };
  createdAt: string;
}

interface ComplaintTimelineProps {
  events: TimelineEvent[];
  t?: any;
}

export default function ComplaintTimeline({ events, t }: ComplaintTimelineProps) {
  console.log({ events });

  const getLocalizedType = (type: string) => {
    const item = eventTranslations[type];
    if (!item) {
      return type
        .split("_")
        .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
        .join(" ");
    }
    return t ? t(item.en, item.hi) : item.en;
  };

  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 via-sky-300 to-slate-200"></div>

      {events.map((event, i) => {
        const Icon = iconMap[event.type] || FilePlus2;
        const actorName = event.actor?.name || event.actor?.role || "System";
        const description = event.metadata?.description || "";

        return (
          <div key={event._id || i} className="relative mb-6 last:mb-0">
            {/* Dot */}
            <div className="absolute -left-[22px] top-0 w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center shadow-sm">
              <Icon className="w-3 h-3 text-blue-600" />
            </div>

            {/* Content */}
            <div className="bg-white border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">
                    {getLocalizedType(event.type)}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 animate-pulse-once">
                    by {actorName}
                  </div>
                  {description && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {description}
                    </div>
                  )}
                </div>
                <div className="text-[10px] text-muted-foreground whitespace-nowrap flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(event.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}