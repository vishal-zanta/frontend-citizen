import React from "react";
import {
  Building2,
  Tag,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  CheckCircle2,
  RotateCcw,
  Loader2,
  Users,
  Compass,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ChatRaiseSummaryCardProps {
  formData: Record<string, any>;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function ChatRaiseSummaryCard({
  formData,
  onConfirm,
  onCancel,
  isSubmitting = false,
}: ChatRaiseSummaryCardProps) {
  const { t, lang } = useLanguage();

  const deptTitle =
    lang === "hi" && formData.departmentNameHindi
      ? formData.departmentNameHindi
      : formData.departmentName || formData.departmentId || "Department";

  const serviceTitle = formData.serviceLabel || formData.service || "General";
  const natureTitle = formData.natureLabel || formData.nature || "Grievance";
  const beneficiaryTitle =
    formData.affectedBeneficiaryLabel || formData.affectedBeneficiary;
  
  // Step 1: Citizen info
  const fullName = formData.fullName || "Citizen";
  const mobile = formData.mobile || "-";
  const alternateMobile =
    formData.alternateMobile && formData.alternateMobile !== "skip"
      ? formData.alternateMobile
      : null;
  const email =
    formData.email && formData.email !== "skip" ? formData.email : null;

  // Step 2: Address info
  const isUrban =
    formData.isUrban === "true" || formData.isUrban === true;
  const areaType = isUrban
    ? t("Urban (शहरी)", "शहरी")
    : t("Rural (ग्रामीण)", "ग्रामीण");
  const district = formData.districtLabel || formData.district || "-";
  const block = formData.blockLabel || formData.block || "-";
  const localBody = isUrban
    ? formData.urbanPanchayatLabel || formData.urbanPanchayat || ""
    : formData.panchayatLabel || formData.panchayat || "";
  const wardOrVillage = isUrban
    ? formData.wardLabel || formData.ward || ""
    : formData.villageLabel || formData.village || "";
  const thana = formData.thanaLabel || formData.thana || "";
  const addressLine = formData.addressLine || "";
  const landmark =
    formData.landmark && formData.landmark !== "skip" ? formData.landmark : "";
  const pincode = formData.pincode || "";

  // Step 3: Details
  const details = formData.details || "";

  return (
    <div className="w-full mt-2.5 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 p-3 sm:p-4 text-foreground shadow-xs animate-in fade-in duration-200">
      {/* Card Header */}
      <div className="flex items-center gap-2 pb-2.5 border-b border-blue-200/60 dark:border-blue-900/40 mb-3">
        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <FileText className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-foreground">
            {t("Complaint Details Summary", "शिकायत विवरण सारांश")}
          </h4>
          <p className="text-[10px] text-muted-foreground">
            {t(
              "Please review all information before final submission",
              "कृपया अंतिम रूप से जमा करने से पूर्व सभी विवरणों की समीक्षा करें",
            )}
          </p>
        </div>
      </div>

      <div className="space-y-2.5 text-[11px]">
        {/* Step 1: Citizen Details */}
        <div className="bg-card/90 dark:bg-card/50 rounded-xl p-2.5 border border-border/60 space-y-1.5">
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold text-[10px] uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>{t("Step 1: Citizen Information", "चरण 1: नागरिक विवरण")}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-border/40">
            <div>
              <span className="text-[10px] text-muted-foreground block">
                {t("Name", "नाम")}
              </span>
              <span className="font-semibold text-foreground">{fullName}</span>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block">
                {t("Mobile Number", "मोबाइल नंबर")}
              </span>
              <span className="font-semibold text-foreground">{mobile}</span>
            </div>
            {alternateMobile && (
              <div>
                <span className="text-[10px] text-muted-foreground block">
                  {t("Alternate Mobile", "वैकल्पिक मोबाइल")}
                </span>
                <span className="font-medium text-foreground">{alternateMobile}</span>
              </div>
            )}
            {email && (
              <div>
                <span className="text-[10px] text-muted-foreground block">
                  {t("Email", "ईमेल")}
                </span>
                <span className="font-medium text-foreground truncate block">{email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Location / Address */}
        <div className="bg-card/90 dark:bg-card/50 rounded-xl p-2.5 border border-border/60 space-y-1.5">
          <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-semibold text-[10px] uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t("Step 2: Location Details", "चरण 2: स्थान एवं पता")}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/40 text-[10.5px]">
            <div>
              <span className="text-[10px] text-muted-foreground block">{t("Area Type", "क्षेत्र")}</span>
              <span className="font-medium text-foreground">{areaType}</span>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block">{t("District", "ज़िला")}</span>
              <span className="font-medium text-foreground">{district}</span>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block">{t("Block", "प्रखंड")}</span>
              <span className="font-medium text-foreground">{block}</span>
            </div>
            {localBody && (
              <div>
                <span className="text-[10px] text-muted-foreground block">
                  {isUrban ? t("Municipal Body", "नगर निकाय") : t("Panchayat", "पंचायत")}
                </span>
                <span className="font-medium text-foreground truncate block">{localBody}</span>
              </div>
            )}
            {wardOrVillage && (
              <div>
                <span className="text-[10px] text-muted-foreground block">
                  {isUrban ? t("Ward", "वार्ड") : t("Village", "गाँव")}
                </span>
                <span className="font-medium text-foreground truncate block">{wardOrVillage}</span>
              </div>
            )}
            {thana && (
              <div>
                <span className="text-[10px] text-muted-foreground block">{t("Thana", "थाना")}</span>
                <span className="font-medium text-foreground">{thana}</span>
              </div>
            )}
            <div className="col-span-2 pt-1 border-t border-border/30">
              <span className="text-[10px] text-muted-foreground block">{t("Address Line", "सटीक पता")}</span>
              <span className="font-medium text-foreground block">
                {addressLine} {landmark ? `(Near: ${landmark})` : ""} {pincode ? `• PIN: ${pincode}` : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Step 3: Complaint Details */}
        <div className="bg-card/90 dark:bg-card/50 rounded-xl p-2.5 border border-border/60 space-y-1.5">
          <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold text-[10px] uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t("Step 3: Complaint Classification", "चरण 3: शिकायत विवरण")}</span>
          </div>
          <div className="pt-1 border-t border-border/40 space-y-1.5">
            <div>
              <span className="text-[10px] text-muted-foreground block">{t("Department", "विभाग")}</span>
              <span className="font-bold text-foreground text-xs">{deptTitle}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-muted-foreground block">{t("Service", "सेवा")}</span>
                <span className="font-medium text-foreground">{serviceTitle}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block">{t("Nature", "प्रकार")}</span>
                <span className="font-medium text-foreground">{natureTitle}</span>
              </div>
            </div>
            {beneficiaryTitle && (
              <div>
                <span className="text-[10px] text-muted-foreground block">{t("Affected Beneficiary", "प्रभावित लाभार्थी")}</span>
                <span className="font-medium text-foreground">{beneficiaryTitle}</span>
              </div>
            )}
            {details && (
              <div className="pt-1 border-t border-border/30">
                <span className="text-[10px] text-muted-foreground block mb-0.5">{t("Description", "विवरण")}</span>
                <p className="text-foreground text-[11px] leading-relaxed line-clamp-3 bg-muted/40 p-2 rounded-lg">
                  "{details}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-3.5 flex items-center gap-2">
        <button
          type="button"
          onClick={onConfirm}
          disabled={isSubmitting}
          className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{t("Submitting Complaint...", "दर्ज किया जा रहा है...")}</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t("Confirm & Submit", "पुष्टि करें एवं जमा करें")}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="py-2 px-3 bg-card hover:bg-muted border border-border text-muted-foreground hover:text-foreground text-xs font-medium rounded-xl transition-all flex items-center gap-1 cursor-pointer active:scale-95 shrink-0"
          title={t("Cancel / Restart", "रद्द करें / पुनः आरंभ")}
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t("Cancel", "रद्द करें")}</span>
        </button>
      </div>
    </div>
  );
}
