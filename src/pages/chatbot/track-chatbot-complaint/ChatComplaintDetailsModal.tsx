import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Printer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ComplaintHeaderSection from "@/pages/citizen/track-complaint/components/viewComponents/ComplaintHeaderSection";
import ComplaintTimeline from "@/components/ComplaintTimeline";

interface ChatComplaintDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaint: any;
}

export const ChatComplaintDetailsModal: React.FC<
  ChatComplaintDetailsModalProps
> = ({ isOpen, onClose, complaint }) => {
  const { t } = useLanguage();

  if (!complaint) return null;

  const handlePrint = () => {
    window.print();
  };

  const trackingId =
    complaint?.grievanceId || complaint?._id || complaint?.id || "";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-background z-[100]">
        <DialogHeader className="border-b pb-3 mb-2 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <DialogTitle className="text-base sm:text-lg font-bold">
              {t("Complaint Details", "शिकायत का विवरण")}
            </DialogTitle>
            {trackingId && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 font-mono ml-2">
                {trackingId}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mr-6">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors cursor-pointer"
              title={t("Print", "प्रिंट करें")}
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t("Print", "प्रिंट")}</span>
            </button>
          </div>
        </DialogHeader>

        <div className="print-area space-y-6 pt-2">
          {/* 1. Header Details Card */}
          <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-2xs">
            <ComplaintHeaderSection
              complaint={complaint}
              t={t}
              onPrint={handlePrint}
            />
          </div>

          {/* 2. Timeline Lifecycle Card */}
          {complaint?.timeline && complaint.timeline.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-2xs">
              <h3 className="font-bold text-foreground mb-4 text-sm sm:text-base">
                {t("Complaint Timeline", "शिकायत समयसीमा")} -{" "}
                {t("End-to-End Lifecycle", "संपूर्ण जीवनचक्र")}
              </h3>
              <ComplaintTimeline events={complaint.timeline} t={t} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatComplaintDetailsModal;
