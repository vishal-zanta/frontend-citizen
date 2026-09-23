import React, { useState, useEffect } from "react";
import { StatusBadge } from "@/components/Badges";
import { ComplaintDetailDialog } from "@/components/ComplaintDetailDialog";
import LoaderErrWrapper from "@/components/LoaderErrWrapper";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { getEntityLabel } from "@/utils/helpers";
import { getExternalDepartment } from "@/utils/departments";
import { getFormsFields } from "@/lib/idb";

interface PreviousComplaintsTableProps {
  filteredComplaints: any[];
  t: any;
  Pagination: React.ReactNode;
  isLoading: boolean;
  error: any;
  sortBy?: string;
  sortOrder?: "asc" | "desc" | string;
  onSortChange?: (sortBy?: string, sortOrder?: string) => void;
}

export default function PreviousComplaintsTable({
  filteredComplaints,
  t,
  Pagination,
  isLoading,
  error,
  sortBy,
  sortOrder,
  onSortChange,
}: PreviousComplaintsTableProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [masterDataMap, setMasterDataMap] = useState<Record<string, any>>({});
  const nav = useNavigate();

  const handleSortRaisedOn = () => {
    const isRaisedOn = sortBy === "createdAt";

    if (!isRaisedOn || !sortOrder) {
      // Stage 1: default -> asc
      onSortChange?.("createdAt", "asc");
    } else if (sortOrder === "asc") {
      // Stage 2: asc -> desc
      onSortChange?.("createdAt", "desc");
    } else {
      // Stage 3: desc -> default
      onSortChange?.(undefined, undefined);
    }
  };

  useEffect(() => {
    async function loadMasterData() {
      try {
        const [edu, food, health] = await Promise.all([
          getFormsFields("EDUCATION"),
          getFormsFields("FOOD"),
          getFormsFields("HEALTH"),
        ]);
        setMasterDataMap({
          EDUCATION: edu?.fields,
          FOOD: food?.fields,
          HEALTH: health?.fields,
        });
      } catch (err) {
        console.error("Error loading cached master data:", err);
      }
    }
    loadMasterData();
  }, []);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden mb-6 no-print">
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
                    {t("Complaint Number", "शिकायत संख्या")}
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
                  <th className="px-4 py-3 font-medium">
                    {t("Status", "स्थिति")}
                  </th>
                  <th
                    onClick={handleSortRaisedOn}
                    className="px-4 py-3 font-medium cursor-pointer select-none hover:text-foreground transition-colors group"
                    title={t("Click to sort by date", "दिनांक अनुसार क्रमबद्ध करने के लिए क्लिक करें")}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{t("Raised On", "दर्ज तिथि")}</span>
                      {( sortBy === "createdAt") ? (
                        sortOrder === "asc" ? (
                          <ArrowUp className="w-3.5 h-3.5 text-primary" />
                        ) : (
                          <ArrowDown className="w-3.5 h-3.5 text-primary" />
                        )
                      ) : (
                        <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border whitespace-nowrap">
                {filteredComplaints.map((c, idx) => {
                  const isExternal =
                    c.grievanceType === "EXTERNAL" ||
                    c.isExternal === true ||
                    Boolean(c.departmentCode);
                  const grievanceType = isExternal
                    ? "EXTERNAL"
                    : c.grievanceType || "INTERNAL";
                  const departmentCode =
                    c.departmentCode ||
                    c.classification?.departmentCode ||
                    (isExternal ? c.classification?.department : undefined);

                  const externalDept = departmentCode
                    ? getExternalDepartment(departmentCode)
                    : null;
                  const externalRowData = externalDept?.getTableRowData?.(
                    c,
                    t,
                    masterDataMap[departmentCode || ""],
                  );

                  const complaintNumber =
                    isExternal && externalRowData?.complaintNumber
                      ? externalRowData.complaintNumber
                      : c.grievanceId || "-";

                  const nature =
                    isExternal && externalRowData?.nature
                      ? externalRowData.nature
                      : getEntityLabel(c.classification?.nature, t) || "-";

                  const district =
                    isExternal && externalRowData?.district
                      ? externalRowData.district
                      : getEntityLabel(
                          c?.location?.district ||
                            c?.citizenInfo?.address?.district ||
                            c?.address?.district ||
                            c?.districtName,
                          t,
                        ) || "-";

                  const department =
                    isExternal && externalRowData?.department
                      ? externalRowData.department
                      : getEntityLabel(c.classification?.department, t) || "-";

                  const service =
                    isExternal && externalRowData?.service
                      ? externalRowData.service
                      : getEntityLabel(
                          c.classification?.service ||
                            c.service ||
                            c.classification?.subService,
                          t,
                        ) || "-";

                  const status =
                    isExternal && externalRowData?.status
                      ? externalRowData.status
                      : c.status || "PENDING";

                  const raisedOn =
                    isExternal && externalRowData?.raisedOn
                      ? externalRowData.raisedOn
                      : c.createdAt;

                  return (
                    <tr
                      key={c._id || c.id || idx}
                      onClick={() => {
                        const params = new URLSearchParams();
                        const complaintId = c._id || c.id;
                        if (complaintId) {
                          params.set("complaint", complaintId);
                        }
                        params.set("grievanceType", grievanceType);
                        if (isExternal && departmentCode) {
                          params.set("departmentCode", departmentCode);
                        }

                        nav(`/citizen/track?${params.toString()}`);
                      }}
                      className="hover:bg-[#155DFC]/10 dark:hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs text-center">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-primary font-semibold hover:underline">
                        {complaintNumber}
                      </td>
                      <td className="px-4 py-2.5 text-foreground">{nature}</td>
                      <td className="px-4 py-2.5 text-foreground">{district}</td>
                      <td className="px-4 py-2.5 text-foreground">
                        {department}
                      </td>
                      <td className="px-4 py-2.5 text-foreground truncate max-w-100">
                        {service}
                      </td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={status} />
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {raisedOn
                          ? new Date(raisedOn).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "-"}
                      </td>
                    </tr>
                  );
                })}
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
