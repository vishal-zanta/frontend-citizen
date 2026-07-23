import React, { useState } from "react";
import { StatusBadge } from "@/components/Badges";
import { ComplaintDetailDialog } from "@/components/ComplaintDetailDialog";
import LoaderErrWrapper from "@/components/LoaderErrWrapper";

interface PreviousComplaintsTableProps {
  filteredComplaints: any[];
  t: any;
  Pagination: React.ReactNode;
  isLoading: boolean;
  error: any;
}

export default function PreviousComplaintsTable({
  filteredComplaints,
  t,
  Pagination,
  isLoading,
  error,
}: PreviousComplaintsTableProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden mb-6 no-print">
      <div className="px-5 py-3 border-b border-border">
        <h3 className="font-bold text-foreground">
          {t("Your Previous Complaints", "आपकी पिछली शिकायतें")}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {t(
            "Click any complaint to view full details",
            "पूर्ण विवरण देखने के लिए किसी भी शिकायत पर क्लिक करें",
          )}
        </p>
      </div>
      <div className="overflow-x-auto">
        <LoaderErrWrapper isLoading={isLoading} error={error}>
          {!isLoading && !error && filteredComplaints.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              {t("No complaints found.", "कोई शिकायत नहीं मिली।")}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">
                    {t("Complaint ID", "शिकायत आईडी")}
                  </th>
                  <th className="px-4 py-3 font-medium min-w-[180px]">
                    {t("Service", "सेवा")}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {t("Status", "स्थिति")}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {t("Filed On", "दाखिल")}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {t("Officer", "अधिकारी")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredComplaints.map((c) => (
                  <tr
                    key={c._id || c.id}
                    onClick={() => setSelectedId(c._id || c.id)}
                    className="hover:bg-blue-50/50 dark:hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-2.5 font-mono text-primary font-semibold hover:underline">
                      {c.grievanceId || c.id || "—"}
                    </td>
                    <td className="px-4 py-2.5 text-foreground">
                      {t(c.classification?.subService?.title ||
                        c.serviceName ||
                        "—", c.classification?.subService?.titleHindi ||
                        c.serviceName ||
                        "—")}
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {c.createdAt || c.createdDate
                        ? new Date(
                            c.createdAt || c.createdDate,
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {c.assignedOfficer?.fullName ||
                        c.assignedOfficer?.name ||
                        c.l1OfficerName ||
                        t("Not assigned", "नियुक्त नहीं")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </LoaderErrWrapper>
      </div>
      {Pagination}

      {selectedId && (
        <ComplaintDetailDialog
          complaintId={selectedId}
          open={!!selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
