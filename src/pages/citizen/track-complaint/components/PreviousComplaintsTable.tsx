import React, { useState } from "react";
import { StatusBadge } from "@/components/Badges";
import { ComplaintDetailDialog } from "@/components/ComplaintDetailDialog";
import LoaderErrWrapper from "@/components/LoaderErrWrapper";
import { useNavigate } from "react-router-dom";

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
  console.log({ filteredComplaints });
  const nav = useNavigate();

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden mb-6 no-print">
      {/* <div className="px-5 py-3 border-b border-border">
        <h3 className="font-bold text-foreground">
          {t("Your Previous Complaints", "आपकी पिछली शिकायतें")}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {t(
            "Click any complaint to view full details",
            "पूर्ण विवरण देखने के लिए किसी भी शिकायत पर क्लिक करें",
          )}
        </p>
      </div> */}
      <div className="overflow-x-auto">
        <LoaderErrWrapper isLoading={isLoading} error={error}>
          {!isLoading && !error && filteredComplaints.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              {t("No complaints found.", "कोई शिकायत नहीं मिली।")}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs text-muted-foreground whitespace-nowrap">
                <tr>
                  <th className="px-4 py-3 font-medium text-center">
                    {t("S.No.", "क्र.सं.")}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {t("ID", "शिकायत आईडी")}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {t("Nature", "प्रकृति")}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {t("District", "जिला")}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {t("Department", "विभाग")}
                  </th>
                  <th className="px-4 py-3 font-medium min-w-[150px]">
                    {t("Service", "सेवा")}
                  </th>
                  <th className="px-4 py-3 font-medium min-w-[180px]">
                    {t("Sub-Service", "उप-सेवा")}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {t("Status", "स्थिति")}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {t("Raised On", "दर्ज तिथि")}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {t("Assigned Officer", "नियुक्त अधिकारी")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border whitespace-nowrap">
                {filteredComplaints.map((c, idx) => (
                  <tr
                    key={c._id || c.id || idx}
                    onClick={() => {
                      nav(`/citizen/track?complaint=${c._id || c.id}`)
                      // setSelectedId(c._id || c.id)
                    }
                    }
                    className="hover:bg-[#155DFC]/10 dark:hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs text-center">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-primary font-semibold hover:underline">
                      {c.grievanceId || "-"}
                    </td>
                    <td className="px-4 py-2.5 text-foreground">
                      {typeof c.classification?.nature === "object"
                        ? t(
                            c.classification?.nature?.title,
                            c.classification?.nature?.titleHindi,
                          )
                        : c.classification?.nature || "-"}
                    </td>
                    <td className="px-4 py-2.5 text-foreground">
                      {t(
                        c.address?.district?.name,
                        c.address?.district?.nameHindi,
                      ) || "-"}
                    </td>
                    <td className="px-4 py-2.5 text-foreground">
                      {typeof c.classification?.subService?.service
                        ?.department === "object"
                        ? t(
                            c.classification?.subService?.service?.department
                              ?.title,
                            c.classification?.subService?.service?.department
                              ?.titleHindi ||
                              c.classification?.subService?.service?.department
                                ?.title,
                          )
                        : c.classification?.subService?.service?.department ||
                          "-"}
                    </td>
                    <td className="px-4 py-2.5 text-foreground">
                      {t(
                        c.classification?.subService?.service?.title,
                        c.classification?.subService?.service?.titleHindi,
                      ) || "-"}
                    </td>
                    <td className="px-4 py-2.5 text-foreground">
                      {t(
                        c.classification?.subService?.title,
                        c.classification?.subService?.titleHindi,
                      ) || "-"}
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {c.assignedOfficer?.fullName ||
                        c.assignedOfficer?.name ||
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
