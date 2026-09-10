import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";

interface ComplaintReopenDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  complaintId: string;
  t: any;
  onSuccess?: () => void;
}

export default function ComplaintReopenDialog({
  isOpen,
  onOpenChange,
  complaintId,
  t,
  onSuccess,
}: ComplaintReopenDialogProps) {
  const queryClient = useQueryClient();
  const [reOpenReason, setReOpenReason] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      reopenComplaint({
        id: complaintId,
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
      onOpenChange(false);
      setReOpenReason("");
      onSuccess?.();
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
            <Label htmlFor="reopen-reason" className="text-sm font-medium mb-4">
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
              onClick={() => onOpenChange(false)}
              disabled={mutation.isPending}
            >
              {t("Cancel", "रद्द करें")}
            </Button>
            <Button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white cursor-pointer"
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
  );
}
