import React, { useMemo } from "react";
import { Building2, AlertCircle, RefreshCw } from "lucide-react";
import { useGetDepartments } from "@/hooks/useGetQuery";
import { useLanguage } from "@/context/LanguageContext";

import { departmentsList } from "@/utils/departments";

const API_PARAMS = {
  page: 1,
  limit: 500,
  select: "title,titleHindi,name,nameHindi",
};

const AvailbleDept: React.FC = () => {
  const { lang, t } = useLanguage();

  const {
    data: departmentsData,
    isLoading: departmentsLoading,
    error: departmentsError,
    refetch,
  } = useGetDepartments([], API_PARAMS);

  // Map departments to concise single label based on language (including external departments)
  const departments = useMemo(() => {
    const docs = departmentsData?.data?.data?.docs ?? [];
    const internalList = docs
      .map((d: any, index: number) => {
        const titleEn = (d.title || d.name || "").trim();
        const titleHi = (d.titleHindi || d.nameHindi || "").trim();
        const label =
          lang === "hi" && titleHi ? titleHi : titleEn || titleHi;

        return {
          id: d._id || `dept-${index}`,
          label,
        };
      })
      .filter((dept: any) => Boolean(dept.label));

    const externalList = departmentsList
      .filter((d) => !d.isHide)
      .map((d) => ({
        id: `ext-${d.key}`,
        label: lang === "hi" && d.nameHindi ? d.nameHindi : d.name,
      }));

    return [...internalList, ...externalList];
  }, [departmentsData, lang]);

  return (
    <div className="mt-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs">
      {/* Sleek Header */}
      <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          {/* <div className="w-1.5 h-5 bg-[#00388c] dark:bg-blue-500 rounded-full shrink-0" /> */}
          <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            {t(
              "Currently, complaints can be registered for the following departments",
              "वर्तमान में निम्न विभागों से संबंधित शिकायत दर्ज कर सकते है",
            )}
          </h2>
        </div>

        {!departmentsLoading && departments.length > 0 && (
          <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-[#00388c] dark:text-blue-300 border border-blue-200/60 dark:border-blue-900 shrink-0">
            {t(`${departments.length} Departments`, `${departments.length} विभाग`)}
          </span>
        )}
      </div>

      {/* Content */}
      {departmentsLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800 animate-pulse"
            />
          ))}
        </div>
      ) : departmentsError ? (
        <div className="py-6 text-center flex items-center justify-center gap-3">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-xs text-muted-foreground">
            {t("Failed to load departments", "विभाग लोड करने में विफल")}
          </span>
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{t("Retry", "पुनः प्रयास करें")}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5">
          {departments.map((dept: any) => (
            <div
              key={dept.id}
              className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 border border-slate-200/70 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-150 shadow-2xs"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-100/70 dark:bg-blue-950 text-[#00388c] dark:text-blue-300 group-hover:bg-[#00388c] group-hover:text-white dark:group-hover:bg-blue-600 transition-colors flex items-center justify-center shrink-0">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <span
                title={dept.label}
                className="text-xs font-medium text-slate-700 dark:text-slate-200 group-hover:text-[#00388c] dark:group-hover:text-blue-300 transition-colors line-clamp-1 leading-normal"
              >
                {dept.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailbleDept;