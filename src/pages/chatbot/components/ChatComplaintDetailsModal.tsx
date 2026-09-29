import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText } from "lucide-react";
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-background z-[100]">
        <DialogHeader className="border-b pb-3 mb-2 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <DialogTitle className="text-base sm:text-lg font-bold">
              {t("Complaint Details", "शिकायत का विवरण")}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="print-area space-y-6 pt-2">
          {/* 1. Header Details Card */}
          <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-2xs">
            <ComplaintHeaderSection
              complaint={complaint}
              t={t}
              onPrint={null}
            />
          </div>

          {/* 2. Timeline Lifecycle Card */}
          {complaint?.timeline && complaint.timeline.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-2xs">
              <h3 className="font-bold text-foreground mb-4 text-sm sm:text-base">
                {t("End to End Complaint Lifecycle", "शिकायत का संपूर्ण जीवनचक्र")}
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
