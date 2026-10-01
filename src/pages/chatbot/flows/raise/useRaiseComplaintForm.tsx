import React, { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import { useLanguage } from "@/context/LanguageContext";
import {
  useRaiseComplaintData,
  useGetAddressFields,
} from "@/pages/citizen/raise-complaint/hooks";
import { useGetServices } from "@/hooks/useGetQuery";
import {
  GrievanceFormValues,
  defaultValues,
} from "@/pages/citizen/raise-complaint/schema";
import { getFormData } from "@/pages/citizen/raise-complaint/helpers";
import { postComplaints } from "@/api/complaints.api";
import { ChatMessageInput, ChatSelectInput } from "../../components/ChatInputs";
import ChatComplaintSuccessCard from "../../components/ChatComplaintSuccessCard";
import statesCitiesData from "@/utils/states_cities.json";

interface UseRaiseComplaintFormProps {
  handleSendMessage: (msg?: string) => void;
  appendBotMessage: (msg: any) => void;
  token?: string;
  mobile?: string;
  isFlowActive: boolean;
  onResetFlow?: () => void;
}

const stateOptions = Object.keys(statesCitiesData)
  .sort()
  .map((state) => ({
    label: state,
    value: state,
  }));

export default function useRaiseComplaintForm({
  handleSendMessage,
  appendBotMessage,
  token,
  mobile = "",
  isFlowActive = false,
  onResetFlow,
}: UseRaiseComplaintFormProps) {
  const { t, lang } = useLanguage();
  const [formStep, setFormStep] = useState(0);

  // Form State initialized to standard default values
  const [complaintForm, setComplaintForm] = useState<GrievanceFormValues>(() => ({
    ...defaultValues,
    citizenInfo: {
      ...defaultValues.citizenInfo,
      mobile: mobile || "",
    },
    communication: {
      feedbackConsent: true,
    },
    isCrpEqualPerAdd: true,
    address: {
      ...defaultValues.address,
      state: "Bihar",
    },
  }));

  // Update mobile if changed from login
  useEffect(() => {
    if (mobile) {
      setComplaintForm((prev) => ({
        ...prev,
        citizenInfo: {
          ...prev.citizenInfo,
          mobile: mobile,
        },
      }));
    }
  }, [mobile]);

  // General Master Data (Departments, Grievance Natures, Affected Beneficiaries)
  const {
    departmentOptions,
    departmentsLoading,
    grievanceNatureOptions,
    naturesLoading,
    affectedBeneficiaryOptions,
  } = useRaiseComplaintData(lang);

  // ── 1. Permanent Address Cascading Data ──────────────────────────────────────
  const permAddr = complaintForm.citizenInfo.address;
  const permIsUrban = Boolean(permAddr?.isUrban);
  const permDistrictId = permAddr?.district || "";
  const permBlockId = permAddr?.block || "";
  const permPanchayatId = permAddr?.panchayat || "";
  const permUrbanPanchayatId = permAddr?.urbanPanchayat || "";

  const permAddressFields = useGetAddressFields(
    {
      lang,
      districtId: permDistrictId,
      blockId: permBlockId,
      panchayatId: permPanchayatId,
      urbanPanchayatId: permUrbanPanchayatId,
      isUrban: permIsUrban,
      enabled: isFlowActive,
    },
    { isValueId: true },
  );

  // ── 2. Correspondence Address State & Cities Data ───────────────────────────
  const selectedState = complaintForm.address.state || "Bihar";
  const isBihar = selectedState === "Bihar";

  const cityOptions = useMemo(() => {
    if (!selectedState || isBihar) return [];
    const cities =
      (statesCitiesData as Record<string, string[]>)[selectedState] || [];
    return cities.map((city: string) => ({
      label: city,
      value: city,
    }));
  }, [selectedState, isBihar]);

  // Correspondence Address Bihar Cascading Data (saves labels)
  const [corrIds, setCorrIds] = useState({
    districtId: "",
    blockId: "",
    panchayatId: "",
    urbanPanchayatId: "",
  });
  const corrAddr = complaintForm.address;
  const corrIsUrban = Boolean(corrAddr?.isUrban);

  const corrAddressFields = useGetAddressFields(
    {
      lang,
      districtId: corrIds.districtId,
      blockId: corrIds.blockId,
      panchayatId: corrIds.panchayatId,
      urbanPanchayatId: corrIds.urbanPanchayatId,
      isUrban: corrIsUrban,
      enabled: Boolean(isFlowActive && isBihar),
    },
    { isValueId: false },
  );

  // ── 3. Incident Location Cascading Data ──────────────────────────────────────
  const locAddr = complaintForm.location;
  const locIsUrban = Boolean(locAddr?.isUrban);
  const locDistrictId = locAddr?.district || "";
  const locBlockId = locAddr?.block || "";
  const locPanchayatId = locAddr?.panchayat || "";
  const locUrbanPanchayatId = locAddr?.urbanPanchayat || "";

  const locAddressFields = useGetAddressFields(
    {
      lang,
      districtId: locDistrictId,
      blockId: locBlockId,
      panchayatId: locPanchayatId,
      urbanPanchayatId: locUrbanPanchayatId,
      isUrban: locIsUrban,
      enabled: isFlowActive,
    },
    { isValueId: true },
  );

  // ── Services for Selected Department ─────────────────────────────────────────
  const selectedDeptId = complaintForm.classification.department;
  const { data: servicesData, isLoading: servicesLoading } = useGetServices(
    [selectedDeptId],
    {
      page: 1,
      limit: 500,
      select: "title,titleHindi,name,nameHindi",
      department: selectedDeptId,
    },
    Boolean(isFlowActive && selectedDeptId),
    {
      gcTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  );

  const serviceOptions = useMemo(() => {
    return (servicesData?.data?.data?.docs ?? []).map((s: any) => ({
      label:
        lang === "hi" && (s.titleHindi || s.nameHindi)
          ? s.titleHindi || s.nameHindi
          : s.title || s.name,
      value: s._id,
      title: s.title || s.name,
      titleHindi: s.titleHindi || s.nameHindi,
    }));
  }, [servicesData, lang]);

  // Vulnerability Options
  const vulnerabilityOptions = useMemo(
    () => [
      {
        label: t("Senior Citizen", "वरिष्ठ नागरिक"),
        value: "seniorCitizen",
      },
      {
        label: t("Woman", "महिला"),
        value: "woman",
      },
      {
        label: t("Person with Disability", "दिव्यांग"),
        value: "personWithDisability",
      },
      {
        label: t("Economically Weaker Section", "आर्थिक रूप से कमजोर वर्ग"),
        value: "economicallyWeakerSection",
      },
      {
        label: t("General", "सामान्य"),
        value: "general",
      },
    ],
    [t],
  );

  const loaderMessage = {
    id: "loader",
    sender: "bot" as const,
    text: "",
    timestamp: moment(),
    Component: (
      <div className="flex items-center gap-1.5 py-1 px-1">
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
      </div>
    ),
  };

  // Helper to ensure +91 prefix before sending to API
  const formatWithPlus91 = (num: string) => {
    if (!num) return "";
    const cleaned = num.trim();
    return cleaned.startsWith("+91") ? cleaned : `+91${cleaned}`;
  };

  // Submit Complaint via FormData
  const handleFinalSubmit = async (finalValues: GrievanceFormValues) => {
    appendBotMessage(loaderMessage);
    try {
      const rawMobile = finalValues.citizenInfo.mobile || mobile || "";
      const rawAltMobile = finalValues.citizenInfo.alternateMobile || "";

      const submissionData: GrievanceFormValues = {
        ...finalValues,
        citizenInfo: {
          ...finalValues.citizenInfo,
          mobile: formatWithPlus91(rawMobile),
          alternateMobile: rawAltMobile ? formatWithPlus91(rawAltMobile) : "",
        },
        communication: {
          ...finalValues.communication,
          feedbackConsent: true,
        },
        address: {
          ...finalValues.address,
          state: finalValues.address.state || "Bihar",
        },
        isCrpEqualPerAdd: true,
      };

      const formData = getFormData(submissionData, []);
      console.log("Final FormData:", Object.fromEntries(formData as any));
      const res: any = await postComplaints(formData, {isChatBot: true});
      const resData = res?.data?.data || res?.data || {};
      const generatedId =
        resData?.externalComplaintId ||
        resData?.grievanceId ||
        resData?.id ||
        resData?._id ||
        "GRIEVANCE-SUCCESS";

      const matchedDept = departmentOptions.find(
        (d: any) => d.value === finalValues.classification.department,
      );
      const matchedNature = grievanceNatureOptions.find(
        (n: any) => n.value === finalValues.classification.nature,
      );

      appendBotMessage({
        id: `raise-success-${Date.now()}`,
        sender: "bot",
        text: "",
        timestamp: moment(),
        Component: (
          <ChatComplaintSuccessCard
            grievanceId={generatedId}
            departmentName={matchedDept?.label}
            natureTitle={matchedNature?.label}
            onTrack={(gid) => {
              window.location.href = `/citizen/track?complaint=${gid}`;
            }}
            onReset={() => {
              setFormStep(0);
              setComplaintForm(defaultValues);
              setCorrIds({
                districtId: "",
                blockId: "",
                panchayatId: "",
                urbanPanchayatId: "",
              });
              onResetFlow?.();
            }}
          />
        ),
      });
      setFormStep(999); // Final step
    } catch (err: any) {
      console.error("Failed to register complaint", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        t(
          "Failed to register complaint. Please try again.",
          "शिकायत दर्ज करने में विफल। कृपया पुनः प्रयास करें।",
        );

      appendBotMessage({
        id: `raise-err-${Date.now()}`,
        sender: "bot",
        text: `⚠️ ${msg}`,
        textHindi: `⚠️ ${msg}`,
        timestamp: moment(),
        Component: (
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => handleFinalSubmit(finalValues)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs active:scale-95 transition-all"
            >
              🔄 {t("Try Again", "पुनः प्रयास करें")}
            </button>
          </div>
        ),
      });
    }
  };

  // ── Step Questions (Built Dynamically Based on State: Bihar vs Other) ────────
  const questions = useMemo(() => {
    // Basic Details
    const initialList: any[] = [
      // 0. Department Selection
      {
        id: "form-q-dept",
        text: "Please select the Department related to your complaint:",
        textHindi: "कृपया अपनी शिकायत से संबंधित विभाग चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: departmentsLoading
            ? t("Loading departments...", "विभाग लोड हो रहे हैं...")
            : t("Select Department", "विभाग चुनें"),
          options: departmentOptions,
          isLoading: departmentsLoading,
          isSearchable: true,
          required: true,
          value: complaintForm.classification.department,
          onChange: (val: string) => {
            setComplaintForm((p) => ({
              ...p,
              classification: { ...p.classification, department: val, service: "" },
            }));
          },
          onSend: (val: string) => {
            const opt = departmentOptions.find((o: any) => o.value === val);
            handleSendMessage(opt?.label || val);
            setComplaintForm((p) => ({
              ...p,
              classification: { ...p.classification, department: val, service: "" },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // 1. Citizen Full Name
      {
        id: "form-q-fullname",
        text: "Please enter your full name:",
        textHindi: "कृपया अपना पूरा नाम दर्ज करें:",
        InputComponent: ChatMessageInput,
        InputProps: {
          placeholder: t("Enter your full name", "अपना पूरा नाम दर्ज करें"),
          isLettersAllowed: true,
          maxLength: 50,
          required: true,
          value: complaintForm.citizenInfo.fullName,
          onChange: (e: any) => {
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: { ...p.citizenInfo, fullName: e.target.value },
            }));
          },
          onSend: (val: string) => {
            handleSendMessage(val);
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: { ...p.citizenInfo, fullName: val },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // 2. Alternate Mobile (Optional)
      {
        id: "form-q-altmobile",
        text: "Please enter an alternate mobile number (or skip):",
        textHindi: "कृपया वैकल्पिक मोबाइल नंबर दर्ज करें (या छोड़ें):",
        InputComponent: ChatMessageInput,
        InputProps: {
          placeholder: t("10-digit mobile number", "10 अंकों का मोबाइल नंबर"),
          isNumsOnly: true,
          maxLength: 10,
          required: false,
          value: complaintForm.citizenInfo.alternateMobile,
          onChange: (e: any) => {
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: { ...p.citizenInfo, alternateMobile: e.target.value },
            }));
          },
          onSend: (val: string) => {
            handleSendMessage(val || t("Skipped", "छोड़ दिया"));
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                alternateMobile: val || "",
              },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // 3. Email (Optional)
      {
        id: "form-q-email",
        text: "Please enter your email address (or skip):",
        textHindi: "कृपया अपना ईमेल पता दर्ज करें (या छोड़ें):",
        InputComponent: ChatMessageInput,
        InputProps: {
          placeholder: "example@email.com",
          type: "email",
          maxLength: 50,
          required: false,
          value: complaintForm.citizenInfo.email,
          onChange: (e: any) => {
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: { ...p.citizenInfo, email: e.target.value },
            }));
          },
          onSend: (val: string) => {
            handleSendMessage(val || t("Skipped", "छोड़ दिया"));
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: { ...p.citizenInfo, email: val },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },

      // ── ADDRESS 1: PERMANENT ADDRESS ────────────────────────────────────────
      // 4. Permanent Area Type
      {
        id: "perm-q-urban",
        text: "[Permanent Address] Is your permanent address in a Rural or Urban area?",
        textHindi: "[स्थायी पता] आपका स्थायी पता ग्रामीण क्षेत्र में है या शहरी?",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: t("Select Area Type", "क्षेत्र का प्रकार चुनें"),
          options: [
            { label: t("Rural", "ग्रामीण"), value: "false" },
            { label: t("Urban", "शहरी"), value: "true" },
          ],
          required: true,
          value: String(complaintForm.citizenInfo.address.isUrban),
          onChange: (val: string) => {
            const isUrb = val === "true";
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                address: { ...p.citizenInfo.address, isUrban: isUrb },
              },
            }));
          },
          onSend: (val: string) => {
            const isUrb = val === "true";
            handleSendMessage(isUrb ? t("Urban", "शहरी") : t("Rural", "ग्रामीण"));
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                address: { ...p.citizenInfo.address, isUrban: isUrb },
              },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // 5. Permanent Address Line
      {
        id: "perm-q-addrline",
        text: "[Permanent Address] Please enter your permanent address details (House no., Street, Area):",
        textHindi: "[स्थायी पता] अपना स्थायी पता विवरण (मकान संख्या, सड़क, क्षेत्र) दर्ज करें:",
        InputComponent: ChatMessageInput,
        InputProps: {
          placeholder: t("House no., Street, Area", "मकान संख्या, सड़क, क्षेत्र"),
          maxLength: 50,
          required: true,
          value: complaintForm.citizenInfo.address.addressLine,
          onChange: (e: any) => {
            const line = e.target.value;
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                address: { ...p.citizenInfo.address, addressLine: line },
              },
            }));
          },
          onSend: (val: string) => {
            handleSendMessage(val);
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                address: { ...p.citizenInfo.address, addressLine: val },
              },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // 6. Permanent District
      {
        id: "perm-q-district",
        text: "[Permanent Address] Please select your permanent District:",
        textHindi: "[स्थायी पता] अपना स्थायी ज़िला चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: permAddressFields.isDistrictsLoading
            ? t("Loading districts...", "ज़िले लोड हो रहे हैं...")
            : t("Select District", "जिला चुनें"),
          options: permAddressFields.districtOptions,
          isLoading: permAddressFields.isDistrictsLoading,
          isSearchable: true,
          required: true,
          value: complaintForm.citizenInfo.address.district,
          onChange: (val: string) => {
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                address: {
                  ...p.citizenInfo.address,
                  district: val,
                  block: "",
                  panchayat: "",
                  village: "",
                  urbanPanchayat: "",
                  ward: "",
                  thana: "",
                },
              },
            }));
          },
          onSend: (val: string) => {
            const opt = permAddressFields.districtOptions.find((d: any) => d.value === val);
            handleSendMessage(opt?.label || val);
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                address: {
                  ...p.citizenInfo.address,
                  district: val,
                  block: "",
                  panchayat: "",
                  village: "",
                  urbanPanchayat: "",
                  ward: "",
                  thana: "",
                },
              },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // 7. Permanent Block
      {
        id: "perm-q-block",
        text: "[Permanent Address] Please select your permanent Block / Subdivision:",
        textHindi: "[स्थायी पता] अपना स्थायी प्रखंड / अनुमंडल चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: permAddressFields.isBlocksLoading
            ? t("Loading blocks...", "प्रखंड लोड हो रहे हैं...")
            : t("Select Block / Subdivision", "प्रखंड / अनुमंडल चुनें"),
          options: permAddressFields.blockOptions,
          isLoading: permAddressFields.isBlocksLoading,
          isSearchable: true,
          required: true,
          value: complaintForm.citizenInfo.address.block,
          onChange: (val: string) => {
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                address: {
                  ...p.citizenInfo.address,
                  block: val,
                  panchayat: "",
                  village: "",
                },
              },
            }));
          },
          onSend: (val: string) => {
            const opt = permAddressFields.blockOptions.find((b: any) => b.value === val);
            handleSendMessage(opt?.label || val);
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                address: {
                  ...p.citizenInfo.address,
                  block: val,
                  panchayat: "",
                  village: "",
                },
              },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // 8. Permanent Panchayat / Municipal Body
      {
        id: "perm-q-body",
        text: permIsUrban
          ? "[Permanent Address] Please select Municipal Corporation / Council / Nagar Panchayat:"
          : "[Permanent Address] Please select your permanent Panchayat:",
        textHindi: permIsUrban
          ? "[स्थायी पता] स्थायी नगर निकाय (नगर निगम / परिषद / पंचायत) चुनें:"
          : "[स्थायी पता] अपनी स्थायी पंचायत चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: permIsUrban
            ? permAddressFields.isUrbanPanchayatsLoading
              ? t("Loading municipal bodies...", "नगर निकाय लोड हो रहे हैं...")
              : t("Select Municipal Body", "नगर निकाय चुनें")
            : permAddressFields.isPanchayatsLoading
            ? t("Loading panchayats...", "पंचायत लोड हो रही हैं...")
            : t("Select Panchayat name", "पंचायत का नाम चुनें"),
          options: permIsUrban
            ? permAddressFields.urbanPanchayatOptions
            : permAddressFields.panchayatOptions,
          isLoading: permIsUrban
            ? permAddressFields.isUrbanPanchayatsLoading
            : permAddressFields.isPanchayatsLoading,
          isSearchable: true,
          required: true,
          value: permIsUrban
            ? complaintForm.citizenInfo.address.urbanPanchayat
            : complaintForm.citizenInfo.address.panchayat,
          onChange: (val: string) => {
            if (permIsUrban) {
              setComplaintForm((p) => ({
                ...p,
                citizenInfo: {
                  ...p.citizenInfo,
                  address: { ...p.citizenInfo.address, urbanPanchayat: val, ward: "" },
                },
              }));
            } else {
              setComplaintForm((p) => ({
                ...p,
                citizenInfo: {
                  ...p.citizenInfo,
                  address: { ...p.citizenInfo.address, panchayat: val, village: "" },
                },
              }));
            }
          },
          onSend: (val: string) => {
            const opts = permIsUrban
              ? permAddressFields.urbanPanchayatOptions
              : permAddressFields.panchayatOptions;
            const opt = opts.find((o: any) => o.value === val);
            handleSendMessage(opt?.label || val);
            if (permIsUrban) {
              setComplaintForm((p) => ({
                ...p,
                citizenInfo: {
                  ...p.citizenInfo,
                  address: { ...p.citizenInfo.address, urbanPanchayat: val, ward: "" },
                },
              }));
            } else {
              setComplaintForm((p) => ({
                ...p,
                citizenInfo: {
                  ...p.citizenInfo,
                  address: { ...p.citizenInfo.address, panchayat: val, village: "" },
                },
              }));
            }
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // 9. Permanent Village / Ward
      {
        id: "perm-q-subbody",
        text: permIsUrban
          ? "[Permanent Address] Please select your permanent Ward:"
          : "[Permanent Address] Please select your permanent Village:",
        textHindi: permIsUrban
          ? "[स्थायी पता] अपना स्थायी वार्ड चुनें:"
          : "[स्थायी पता] अपना स्थायी गाँव चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: permIsUrban
            ? permAddressFields.isWardsLoading
              ? t("Loading wards...", "वार्ड लोड हो रहे हैं...")
              : t("Select Ward", "वार्ड चुनें")
            : permAddressFields.isVillagesLoading
            ? t("Loading villages...", "गाँव लोड हो रहे हैं...")
            : t("Select Village name", "गाँव का नाम चुनें"),
          options: permIsUrban
            ? permAddressFields.wardOptions
            : permAddressFields.villageOptions,
          isLoading: permIsUrban
            ? permAddressFields.isWardsLoading
            : permAddressFields.isVillagesLoading,
          isSearchable: true,
          required: true,
          value: permIsUrban
            ? complaintForm.citizenInfo.address.ward
            : complaintForm.citizenInfo.address.village,
          onChange: (val: string) => {
            if (permIsUrban) {
              setComplaintForm((p) => ({
                ...p,
                citizenInfo: {
                  ...p.citizenInfo,
                  address: { ...p.citizenInfo.address, ward: val },
                },
              }));
            } else {
              setComplaintForm((p) => ({
                ...p,
                citizenInfo: {
                  ...p.citizenInfo,
                  address: { ...p.citizenInfo.address, village: val },
                },
              }));
            }
          },
          onSend: (val: string) => {
            const opts = permIsUrban
              ? permAddressFields.wardOptions
              : permAddressFields.villageOptions;
            const opt = opts.find((o: any) => o.value === val);
            handleSendMessage(opt?.label || val);
            if (permIsUrban) {
              setComplaintForm((p) => ({
                ...p,
                citizenInfo: {
                  ...p.citizenInfo,
                  address: { ...p.citizenInfo.address, ward: val },
                },
              }));
            } else {
              setComplaintForm((p) => ({
                ...p,
                citizenInfo: {
                  ...p.citizenInfo,
                  address: { ...p.citizenInfo.address, village: val },
                },
              }));
            }
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // 10. Permanent Thana
      {
        id: "perm-q-thana",
        text: "[Permanent Address] Please select your permanent Thana:",
        textHindi: "[स्थायी पता] अपना स्थायी थाना चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: permAddressFields.isThanasLoading
            ? t("Loading thanas...", "थाना लोड हो रहे हैं...")
            : t("Select Thana", "थाना चुनें"),
          options: permAddressFields.thanaOptions,
          isLoading: permAddressFields.isThanasLoading,
          isSearchable: true,
          required: true,
          value: complaintForm.citizenInfo.address.thana,
          onChange: (val: string) => {
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                address: { ...p.citizenInfo.address, thana: val },
              },
            }));
          },
          onSend: (val: string) => {
            const opt = permAddressFields.thanaOptions.find((t: any) => t.value === val);
            handleSendMessage(opt?.label || val);
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                address: { ...p.citizenInfo.address, thana: val },
              },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // 11. Permanent Landmark (Optional)
      {
        id: "perm-q-landmark",
        text: "[Permanent Address] Please enter nearby landmark (or skip):",
        textHindi: "[स्थायी पता] नजदीकी लैंडमार्क दर्ज करें (या छोड़ें):",
        InputComponent: ChatMessageInput,
        InputProps: {
          placeholder: t("Enter Landmark", "लैंडमार्क दर्ज करें"),
          maxLength: 50,
          required: false,
          value: complaintForm.citizenInfo.address.landmark,
          onChange: (e: any) => {
            const mark = e.target.value;
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                address: { ...p.citizenInfo.address, landmark: mark },
              },
            }));
          },
          onSend: (val: string) => {
            handleSendMessage(val || t("Skipped", "छोड़ दिया"));
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                address: { ...p.citizenInfo.address, landmark: val },
              },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // 12. Permanent PIN Code
      {
        id: "perm-q-pincode",
        text: "[Permanent Address] Please enter 6-digit PIN Code of Bihar:",
        textHindi: "[स्थायी पता] स्थायी पते का 6 अंकों का पिन कोड दर्ज करें:",
        InputComponent: ChatMessageInput,
        InputProps: {
          placeholder: "800001",
          isNumsOnly: true,
          maxLength: 6,
          required: true,
          value: complaintForm.citizenInfo.address.pincode,
          onChange: (e: any) => {
            const pin = e.target.value;
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                address: { ...p.citizenInfo.address, pincode: pin },
              },
            }));
          },
          onSend: (val: string) => {
            handleSendMessage(val);
            setComplaintForm((p) => ({
              ...p,
              citizenInfo: {
                ...p.citizenInfo,
                address: { ...p.citizenInfo.address, pincode: val },
              },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },

      // ── ADDRESS 2: CORRESPONDENCE ADDRESS ───────────────────────────────────
      // 13. Correspondence State (gives option to select state)
      {
        id: "corr-q-state",
        text: "[Correspondence Address] Please select your State:",
        textHindi: "[पत्राचार का पता] अपना राज्य चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: t("Select State", "राज्य चुनें"),
          options: stateOptions,
          isSearchable: true,
          required: true,
          value: complaintForm.address.state,
          onChange: (val: string) => {
            setComplaintForm((p) => ({
              ...p,
              address: {
                ...p.address,
                state: val,
                city: "",
                addressLine: "",
                addressLine2: "",
                district: "",
                block: "",
                panchayat: "",
                village: "",
                urbanPanchayat: "",
                ward: "",
                thana: "",
                landmark: "",
                pincode: "",
              },
            }));
            setCorrIds({
              districtId: "",
              blockId: "",
              panchayatId: "",
              urbanPanchayatId: "",
            });
          },
          onSend: (val: string) => {
            handleSendMessage(val);
            setComplaintForm((p) => ({
              ...p,
              address: {
                ...p.address,
                state: val,
                city: "",
                addressLine: "",
                addressLine2: "",
                district: "",
                block: "",
                panchayat: "",
                village: "",
                urbanPanchayat: "",
                ward: "",
                thana: "",
                landmark: "",
                pincode: "",
              },
            }));
            setCorrIds({
              districtId: "",
              blockId: "",
              panchayatId: "",
              urbanPanchayatId: "",
            });
            setFormStep((prev) => prev + 1);
          },
        },
      },
    ];

    // Correspondence Address Branching: Bihar vs Outside Bihar
    const correspondenceList: any[] = isBihar
      ? [
          // Bihar Case: Area Type
          {
            id: "corr-q-urban",
            text: "[Correspondence Address] Is your correspondence address in a Rural or Urban area?",
            textHindi: "[पत्राचार का पता] आपका पत्राचार का पता ग्रामीण क्षेत्र में है या शहरी?",
            InputComponent: ChatSelectInput,
            InputProps: {
              placeholder: t("Select Area Type", "क्षेत्र का प्रकार चुनें"),
              options: [
                { label: t("Rural", "ग्रामीण"), value: "false" },
                { label: t("Urban", "शहरी"), value: "true" },
              ],
              required: true,
              value: String(complaintForm.address.isUrban),
              onChange: (val: string) => {
                const isUrb = val === "true";
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, isUrban: isUrb },
                }));
              },
              onSend: (val: string) => {
                const isUrb = val === "true";
                handleSendMessage(isUrb ? t("Urban", "शहरी") : t("Rural", "ग्रामीण"));
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, isUrban: isUrb },
                }));
                setFormStep((prev) => prev + 1);
              },
            },
          },
          // Bihar Case: Address Line
          {
            id: "corr-q-addrline",
            text: "[Correspondence Address] Please enter your correspondence address details (House no., Street, Area):",
            textHindi: "[पत्राचार का पता] अपना पत्राचार पता विवरण (मकान संख्या, सड़क, क्षेत्र) दर्ज करें:",
            InputComponent: ChatMessageInput,
            InputProps: {
              placeholder: t("House no., Street, Area", "मकान संख्या, सड़क, क्षेत्र"),
              maxLength: 50,
              required: true,
              value: complaintForm.address.addressLine,
              onChange: (e: any) => {
                const line = e.target.value;
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, addressLine: line },
                }));
              },
              onSend: (val: string) => {
                handleSendMessage(val);
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, addressLine: val },
                }));
                setFormStep((prev) => prev + 1);
              },
            },
          },
          // Bihar Case: District (Saves LABEL)
          {
            id: "corr-q-district",
            text: "[Correspondence Address] Please select your correspondence District:",
            textHindi: "[पत्राचार का पता] पत्राचार का ज़िला चुनें:",
            InputComponent: ChatSelectInput,
            InputProps: {
              placeholder: corrAddressFields.isDistrictsLoading
                ? t("Loading districts...", "ज़िले लोड हो रहे हैं...")
                : t("Select District", "जिला चुनें"),
              options: corrAddressFields.districtOptions,
              isLoading: corrAddressFields.isDistrictsLoading,
              isSearchable: true,
              required: true,
              value: complaintForm.address.district,
              onChange: (val: string, opt: any) => {
                const label = opt?.label || val;
                const rawId = opt?.raw?._id || opt?.value;
                setCorrIds((c) => ({
                  ...c,
                  districtId: rawId,
                  blockId: "",
                  panchayatId: "",
                  urbanPanchayatId: "",
                }));
                setComplaintForm((p) => ({
                  ...p,
                  address: {
                    ...p.address,
                    district: label,
                    block: "",
                    panchayat: "",
                    village: "",
                    urbanPanchayat: "",
                    ward: "",
                    thana: "",
                  },
                }));
              },
              onSend: (val: string) => {
                const opt = corrAddressFields.districtOptions.find(
                  (d: any) => d.value === val || d.label === val,
                );
                const label = opt?.label || val;
                const rawId = opt?.raw?._id || opt?.value;
                handleSendMessage(label);
                setCorrIds((c) => ({
                  ...c,
                  districtId: rawId,
                  blockId: "",
                  panchayatId: "",
                  urbanPanchayatId: "",
                }));
                setComplaintForm((p) => ({
                  ...p,
                  address: {
                    ...p.address,
                    district: label,
                    block: "",
                    panchayat: "",
                    village: "",
                    urbanPanchayat: "",
                    ward: "",
                    thana: "",
                  },
                }));
                setFormStep((prev) => prev + 1);
              },
            },
          },
          // Bihar Case: Block / Subdivision (Saves LABEL)
          {
            id: "corr-q-block",
            text: "[Correspondence Address] Please select your correspondence Block / Subdivision:",
            textHindi: "[पत्राचार का पता] पत्राचार का प्रखंड / अनुमंडल चुनें:",
            InputComponent: ChatSelectInput,
            InputProps: {
              placeholder: corrAddressFields.isBlocksLoading
                ? t("Loading blocks...", "प्रखंड लोड हो रहे हैं...")
                : t("Select Block / Subdivision", "प्रखंड / अनुमंडल चुनें"),
              options: corrAddressFields.blockOptions,
              isLoading: corrAddressFields.isBlocksLoading,
              isSearchable: true,
              required: true,
              value: complaintForm.address.block,
              onChange: (val: string, opt: any) => {
                const label = opt?.label || val;
                const rawId = opt?.raw?._id || opt?.value;
                setCorrIds((c) => ({
                  ...c,
                  blockId: rawId,
                  panchayatId: "",
                  urbanPanchayatId: "",
                }));
                setComplaintForm((p) => ({
                  ...p,
                  address: {
                    ...p.address,
                    block: label,
                    panchayat: "",
                    village: "",
                  },
                }));
              },
              onSend: (val: string) => {
                const opt = corrAddressFields.blockOptions.find(
                  (b: any) => b.value === val || b.label === val,
                );
                const label = opt?.label || val;
                const rawId = opt?.raw?._id || opt?.value;
                handleSendMessage(label);
                setCorrIds((c) => ({
                  ...c,
                  blockId: rawId,
                  panchayatId: "",
                  urbanPanchayatId: "",
                }));
                setComplaintForm((p) => ({
                  ...p,
                  address: {
                    ...p.address,
                    block: label,
                    panchayat: "",
                    village: "",
                  },
                }));
                setFormStep((prev) => prev + 1);
              },
            },
          },
          // Bihar Case: Panchayat OR Municipal Body (Saves LABEL)
          {
            id: "corr-q-body",
            text: corrIsUrban
              ? "[Correspondence Address] Please select Municipal Corporation / Council / Nagar Panchayat:"
              : "[Correspondence Address] Please select your correspondence Panchayat:",
            textHindi: corrIsUrban
              ? "[पत्राचार का पता] पत्राचार का नगर निकाय (निगम / परिषद / पंचायत) चुनें:"
              : "[पत्राचार का पता] पत्राचार की पंचायत चुनें:",
            InputComponent: ChatSelectInput,
            InputProps: {
              placeholder: corrIsUrban
                ? corrAddressFields.isUrbanPanchayatsLoading
                  ? t("Loading municipal bodies...", "नगर निकाय लोड हो रहे हैं...")
                  : t("Select Municipal Body", "नगर निकाय चुनें")
                : corrAddressFields.isPanchayatsLoading
                ? t("Loading panchayats...", "पंचायत लोड हो रही हैं...")
                : t("Select Panchayat name", "पंचायत का नाम चुनें"),
              options: corrIsUrban
                ? corrAddressFields.urbanPanchayatOptions
                : corrAddressFields.panchayatOptions,
              isLoading: corrIsUrban
                ? corrAddressFields.isUrbanPanchayatsLoading
                : corrAddressFields.isPanchayatsLoading,
              isSearchable: true,
              required: true,
              value: corrIsUrban
                ? complaintForm.address.urbanPanchayat
                : complaintForm.address.panchayat,
              onChange: (val: string, opt: any) => {
                const label = opt?.label || val;
                const rawId = opt?.raw?._id || opt?.value;
                if (corrIsUrban) {
                  setCorrIds((c) => ({ ...c, urbanPanchayatId: rawId }));
                  setComplaintForm((p) => ({
                    ...p,
                    address: { ...p.address, urbanPanchayat: label, ward: "" },
                  }));
                } else {
                  setCorrIds((c) => ({ ...c, panchayatId: rawId }));
                  setComplaintForm((p) => ({
                    ...p,
                    address: { ...p.address, panchayat: label, village: "" },
                  }));
                }
              },
              onSend: (val: string) => {
                const opts = corrIsUrban
                  ? corrAddressFields.urbanPanchayatOptions
                  : corrAddressFields.panchayatOptions;
                const opt = opts.find((o: any) => o.value === val || o.label === val);
                const label = opt?.label || val;
                const rawId = opt?.raw?._id || opt?.value;
                handleSendMessage(label);
                if (corrIsUrban) {
                  setCorrIds((c) => ({ ...c, urbanPanchayatId: rawId }));
                  setComplaintForm((p) => ({
                    ...p,
                    address: { ...p.address, urbanPanchayat: label, ward: "" },
                  }));
                } else {
                  setCorrIds((c) => ({ ...c, panchayatId: rawId }));
                  setComplaintForm((p) => ({
                    ...p,
                    address: { ...p.address, panchayat: label, village: "" },
                  }));
                }
                setFormStep((prev) => prev + 1);
              },
            },
          },
          // Bihar Case: Village OR Ward (Saves LABEL)
          {
            id: "corr-q-subbody",
            text: corrIsUrban
              ? "[Correspondence Address] Please select your correspondence Ward:"
              : "[Correspondence Address] Please select your correspondence Village:",
            textHindi: corrIsUrban
              ? "[पत्राचार का पता] पत्राचार का वार्ड चुनें:"
              : "[पत्राचार का पता] पत्राचार का गाँव चुनें:",
            InputComponent: ChatSelectInput,
            InputProps: {
              placeholder: corrIsUrban
                ? corrAddressFields.isWardsLoading
                  ? t("Loading wards...", "वार्ड लोड हो रहे हैं...")
                  : t("Select Ward", "वार्ड चुनें")
                : corrAddressFields.isVillagesLoading
                ? t("Loading villages...", "गाँव लोड हो रहे हैं...")
                : t("Select Village name", "गाँव का नाम चुनें"),
              options: corrIsUrban
                ? corrAddressFields.wardOptions
                : corrAddressFields.villageOptions,
              isLoading: corrIsUrban
                ? corrAddressFields.isWardsLoading
                : corrAddressFields.isVillagesLoading,
              isSearchable: true,
              required: true,
              value: corrIsUrban
                ? complaintForm.address.ward
                : complaintForm.address.village,
              onChange: (val: string, opt: any) => {
                const label = opt?.label || val;
                if (corrIsUrban) {
                  setComplaintForm((p) => ({
                    ...p,
                    address: { ...p.address, ward: label },
                  }));
                } else {
                  setComplaintForm((p) => ({
                    ...p,
                    address: { ...p.address, village: label },
                  }));
                }
              },
              onSend: (val: string) => {
                const opts = corrIsUrban
                  ? corrAddressFields.wardOptions
                  : corrAddressFields.villageOptions;
                const opt = opts.find((o: any) => o.value === val || o.label === val);
                const label = opt?.label || val;
                handleSendMessage(label);
                if (corrIsUrban) {
                  setComplaintForm((p) => ({
                    ...p,
                    address: { ...p.address, ward: label },
                  }));
                } else {
                  setComplaintForm((p) => ({
                    ...p,
                    address: { ...p.address, village: label },
                  }));
                }
                setFormStep((prev) => prev + 1);
              },
            },
          },
          // Bihar Case: Thana (Saves LABEL)
          {
            id: "corr-q-thana",
            text: "[Correspondence Address] Please select your correspondence Thana:",
            textHindi: "[पत्राचार का पता] पत्राचार का थाना चुनें:",
            InputComponent: ChatSelectInput,
            InputProps: {
              placeholder: corrAddressFields.isThanasLoading
                ? t("Loading thanas...", "थाना लोड हो रहे हैं...")
                : t("Select Thana", "थाना चुनें"),
              options: corrAddressFields.thanaOptions,
              isLoading: corrAddressFields.isThanasLoading,
              isSearchable: true,
              required: true,
              value: complaintForm.address.thana,
              onChange: (val: string, opt: any) => {
                const label = opt?.label || val;
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, thana: label },
                }));
              },
              onSend: (val: string) => {
                const opt = corrAddressFields.thanaOptions.find(
                  (t: any) => t.value === val || t.label === val,
                );
                const label = opt?.label || val;
                handleSendMessage(label);
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, thana: label },
                }));
                setFormStep((prev) => prev + 1);
              },
            },
          },
          // Bihar Case: Landmark (Optional)
          {
            id: "corr-q-landmark",
            text: "[Correspondence Address] Please enter nearby landmark (or skip):",
            textHindi: "[पत्राचार का पता] नजदीकी लैंडमार्क दर्ज करें (या छोड़ें):",
            InputComponent: ChatMessageInput,
            InputProps: {
              placeholder: t("Enter Landmark", "लैंडमार्क दर्ज करें"),
              maxLength: 50,
              required: false,
              value: complaintForm.address.landmark,
              onChange: (e: any) => {
                const mark = e.target.value;
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, landmark: mark },
                }));
              },
              onSend: (val: string) => {
                handleSendMessage(val || t("Skipped", "छोड़ दिया"));
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, landmark: val },
                }));
                setFormStep((prev) => prev + 1);
              },
            },
          },
          // Bihar Case: PIN Code
          {
            id: "corr-q-pincode",
            text: "[Correspondence Address] Please enter 6-digit PIN Code of Bihar:",
            textHindi: "[पत्राचार का पता] पत्राचार पते का 6 अंकों का पिन कोड दर्ज करें:",
            InputComponent: ChatMessageInput,
            InputProps: {
              placeholder: "800001",
              isNumsOnly: true,
              maxLength: 6,
              required: true,
              value: complaintForm.address.pincode,
              onChange: (e: any) => {
                const pin = e.target.value;
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, pincode: pin },
                }));
              },
              onSend: (val: string) => {
                handleSendMessage(val);
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, pincode: val },
                }));
                setFormStep((prev) => prev + 1);
              },
            },
          },
        ]
      : [
          // Outside Bihar Case: City
          {
            id: "corr-q-city",
            text: "[Correspondence Address] Please select or enter your City:",
            textHindi: "[पत्राचार का पता] अपना शहर चुनें या दर्ज करें:",
            InputComponent: ChatSelectInput,
            InputProps: {
              placeholder: t("Select or enter City", "शहर चुनें या दर्ज करें"),
              options: cityOptions,
              isSearchable: true,
              isCreatable: true,
              required: true,
              value: complaintForm.address.city,
              onChange: (val: string) => {
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, city: val },
                }));
              },
              onSend: (val: string) => {
                handleSendMessage(val);
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, city: val },
                }));
                setFormStep((prev) => prev + 1);
              },
            },
          },
          // Outside Bihar Case: Address Line
          {
            id: "corr-q-addrline-ext",
            text: "[Correspondence Address] Please enter your address details (House no., Street, Area):",
            textHindi: "[पत्राचार का पता] अपना पता विवरण (मकान संख्या, सड़क, क्षेत्र) दर्ज करें:",
            InputComponent: ChatMessageInput,
            InputProps: {
              placeholder: t("House no., Street, Area", "मकान संख्या, सड़क, क्षेत्र"),
              maxLength: 50,
              required: true,
              value: complaintForm.address.addressLine,
              onChange: (e: any) => {
                const line = e.target.value;
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, addressLine: line },
                }));
              },
              onSend: (val: string) => {
                handleSendMessage(val);
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, addressLine: val },
                }));
                setFormStep((prev) => prev + 1);
              },
            },
          },
          // Outside Bihar Case: Address Line 2 (Optional)
          {
            id: "corr-q-addrline2",
            text: "[Correspondence Address] Please enter Address Line 2 (Apartment, suite, landmark) or skip:",
            textHindi: "[पत्राचार का पता] पता विवरण 2 (अपार्टमेंट, सुइट, लैंडमार्क) दर्ज करें (या छोड़ें):",
            InputComponent: ChatMessageInput,
            InputProps: {
              placeholder: t(
                "Apartment, suite, landmark",
                "अपार्टमेंट, सुइट, लैंडमार्क",
              ),
              maxLength: 50,
              required: false,
              value: complaintForm.address.addressLine2,
              onChange: (e: any) => {
                const line2 = e.target.value;
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, addressLine2: line2 },
                }));
              },
              onSend: (val: string) => {
                handleSendMessage(val || t("Skipped", "छोड़ दिया"));
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, addressLine2: val },
                }));
                setFormStep((prev) => prev + 1);
              },
            },
          },
          // Outside Bihar Case: PIN Code
          {
            id: "corr-q-pincode-ext",
            text: "[Correspondence Address] Please enter 6-digit PIN Code:",
            textHindi: "[पत्राचार का पता] पत्राचार पते का 6 अंकों का पिन कोड दर्ज करें:",
            InputComponent: ChatMessageInput,
            InputProps: {
              placeholder: "800001",
              isNumsOnly: true,
              maxLength: 6,
              required: true,
              value: complaintForm.address.pincode,
              onChange: (e: any) => {
                const pin = e.target.value;
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, pincode: pin },
                }));
              },
              onSend: (val: string) => {
                handleSendMessage(val);
                setComplaintForm((p) => ({
                  ...p,
                  address: { ...p.address, pincode: val },
                }));
                setFormStep((prev) => prev + 1);
              },
            },
          },
        ];

    // Classification, Incident Location & Impact Questions
    const remainingList: any[] = [
      // ── CLASSIFICATION ───────────────────────────────────────────────────────
      // Service / Category (Department won't arrive again)
      {
        id: "form-q-service",
        text: "Please select the Service / Category:",
        textHindi: "कृपया सेवा / श्रेणी चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: servicesLoading
            ? t("Loading services...", "सेवाएं लोड हो रही हैं...")
            : t("Select service", "सेवा चुनें"),
          options: serviceOptions,
          isLoading: servicesLoading,
          isSearchable: true,
          required: true,
          value: complaintForm.classification.service,
          onChange: (val: string) => {
            setComplaintForm((p) => ({
              ...p,
              classification: { ...p.classification, service: val },
            }));
          },
          onSend: (val: string) => {
            const opt = serviceOptions.find((s: any) => s.value === val);
            handleSendMessage(opt?.label || val);
            setComplaintForm((p) => ({
              ...p,
              classification: { ...p.classification, service: val },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // Grievance Type / Nature
      {
        id: "form-q-nature",
        text: "Please select the Grievance Type / Nature:",
        textHindi: "कृपया शिकायत का प्रकार चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: naturesLoading
            ? t("Loading types...", "प्रकार लोड हो रहे हैं...")
            : t("Select type", "प्रकार चुनें"),
          options: grievanceNatureOptions,
          isLoading: naturesLoading,
          isSearchable: true,
          required: true,
          value: complaintForm.classification.nature,
          onChange: (val: string) => {
            setComplaintForm((p) => ({
              ...p,
              classification: { ...p.classification, nature: val },
            }));
          },
          onSend: (val: string) => {
            const opt = grievanceNatureOptions.find((n: any) => n.value === val);
            handleSendMessage(opt?.label || val);
            setComplaintForm((p) => ({
              ...p,
              classification: { ...p.classification, nature: val },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // Brief Description
      {
        id: "form-q-details",
        text: "Please describe your complaint in detail (up to 1000 characters):",
        textHindi: "कृपया अपनी शिकायत का विस्तार से वर्णन करें:",
        InputComponent: ChatMessageInput,
        InputProps: {
          placeholder: t(
            "Describe the issue in detail...",
            "समस्या का विस्तार से वर्णन करें...",
          ),
          maxLength: 1000,
          required: true,
          value: complaintForm.evidence.details,
          onChange: (e: any) => {
            setComplaintForm((p) => ({
              ...p,
              evidence: { ...p.evidence, details: e.target.value },
            }));
          },
          onSend: (val: string) => {
            handleSendMessage(val);
            setComplaintForm((p) => ({
              ...p,
              evidence: { ...p.evidence, details: val },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },

      // ── ADDRESS 3: INCIDENT LOCATION ─────────────────────────────────────────
      // Incident Location: Area Type
      {
        id: "loc-q-urban",
        text: "[Incident Location] Did the incident occur in a Rural or Urban area?",
        textHindi: "[घटना का स्थान] क्या घटना ग्रामीण क्षेत्र में हुई थी या शहरी?",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: t("Select Area Type", "क्षेत्र का प्रकार चुनें"),
          options: [
            { label: t("Rural", "ग्रामीण"), value: "false" },
            { label: t("Urban", "शहरी"), value: "true" },
          ],
          required: true,
          value: String(complaintForm.location.isUrban),
          onChange: (val: string) => {
            const isUrb = val === "true";
            setComplaintForm((p) => ({
              ...p,
              location: { ...p.location, isUrban: isUrb },
            }));
          },
          onSend: (val: string) => {
            const isUrb = val === "true";
            handleSendMessage(isUrb ? t("Urban", "शहरी") : t("Rural", "ग्रामीण"));
            setComplaintForm((p) => ({
              ...p,
              location: { ...p.location, isUrban: isUrb },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // Incident Location: Address Details
      {
        id: "loc-q-addrline",
        text: "[Incident Location] Please enter exact place or address details where the incident occurred:",
        textHindi: "[घटना का स्थान] घटना का सटीक स्थान या पता विवरण दर्ज करें:",
        InputComponent: ChatMessageInput,
        InputProps: {
          placeholder: t("House no., Street, Area", "मकान संख्या, सड़क, क्षेत्र"),
          maxLength: 50,
          required: true,
          value: complaintForm.location.addressLine,
          onChange: (e: any) => {
            const line = e.target.value;
            setComplaintForm((p) => ({
              ...p,
              location: { ...p.location, addressLine: line },
            }));
          },
          onSend: (val: string) => {
            handleSendMessage(val);
            setComplaintForm((p) => ({
              ...p,
              location: { ...p.location, addressLine: val },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // Incident Location: District
      {
        id: "loc-q-district",
        text: "[Incident Location] Please select the District where the incident occurred:",
        textHindi: "[घटना का स्थान] घटना से संबंधित ज़िला चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: locAddressFields.isDistrictsLoading
            ? t("Loading districts...", "ज़िले लोड हो रहे हैं...")
            : t("Select District", "जिला चुनें"),
          options: locAddressFields.districtOptions,
          isLoading: locAddressFields.isDistrictsLoading,
          isSearchable: true,
          required: true,
          value: complaintForm.location.district,
          onChange: (val: string) => {
            setComplaintForm((p) => ({
              ...p,
              location: {
                ...p.location,
                district: val,
                block: "",
                panchayat: "",
                village: "",
                urbanPanchayat: "",
                ward: "",
                thana: "",
              },
            }));
          },
          onSend: (val: string) => {
            const opt = locAddressFields.districtOptions.find((d: any) => d.value === val);
            handleSendMessage(opt?.label || val);
            setComplaintForm((p) => ({
              ...p,
              location: {
                ...p.location,
                district: val,
                block: "",
                panchayat: "",
                village: "",
                urbanPanchayat: "",
                ward: "",
                thana: "",
              },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // Incident Location: Block
      {
        id: "loc-q-block",
        text: "[Incident Location] Please select the Block / Subdivision where the incident occurred:",
        textHindi: "[घटना का स्थान] घटना से संबंधित प्रखंड / अनुमंडल चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: locAddressFields.isBlocksLoading
            ? t("Loading blocks...", "प्रखंड लोड हो रहे हैं...")
            : t("Select Block / Subdivision", "प्रखंड / अनुमंडल चुनें"),
          options: locAddressFields.blockOptions,
          isLoading: locAddressFields.isBlocksLoading,
          isSearchable: true,
          required: true,
          value: complaintForm.location.block,
          onChange: (val: string) => {
            setComplaintForm((p) => ({
              ...p,
              location: {
                ...p.location,
                block: val,
                panchayat: "",
                village: "",
              },
            }));
          },
          onSend: (val: string) => {
            const opt = locAddressFields.blockOptions.find((b: any) => b.value === val);
            handleSendMessage(opt?.label || val);
            setComplaintForm((p) => ({
              ...p,
              location: {
                ...p.location,
                block: val,
                panchayat: "",
                village: "",
              },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // Incident Location: Panchayat OR Municipal Body
      {
        id: "loc-q-body",
        text: locIsUrban
          ? "[Incident Location] Please select Municipal Corporation / Council / Nagar Panchayat:"
          : "[Incident Location] Please select the Panchayat where the incident occurred:",
        textHindi: locIsUrban
          ? "[घटना का स्थान] घटना से संबंधित नगर निकाय (निगम / परिषद / पंचायत) चुनें:"
          : "[घटना का स्थान] घटना से संबंधित पंचायत चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: locIsUrban
            ? locAddressFields.isUrbanPanchayatsLoading
              ? t("Loading municipal bodies...", "नगर निकाय लोड हो रहे हैं...")
              : t("Select Municipal Body", "नगर निकाय चुनें")
            : locAddressFields.isPanchayatsLoading
            ? t("Loading panchayats...", "पंचायत लोड हो रही हैं...")
            : t("Select Panchayat name", "पंचायत का नाम चुनें"),
          options: locIsUrban
            ? locAddressFields.urbanPanchayatOptions
            : locAddressFields.panchayatOptions,
          isLoading: locIsUrban
            ? locAddressFields.isUrbanPanchayatsLoading
            : locAddressFields.isPanchayatsLoading,
          isSearchable: true,
          required: true,
          value: locIsUrban
            ? complaintForm.location.urbanPanchayat
            : complaintForm.location.panchayat,
          onChange: (val: string) => {
            if (locIsUrban) {
              setComplaintForm((p) => ({
                ...p,
                location: { ...p.location, urbanPanchayat: val, ward: "" },
              }));
            } else {
              setComplaintForm((p) => ({
                ...p,
                location: { ...p.location, panchayat: val, village: "" },
              }));
            }
          },
          onSend: (val: string) => {
            const opts = locIsUrban
              ? locAddressFields.urbanPanchayatOptions
              : locAddressFields.panchayatOptions;
            const opt = opts.find((o: any) => o.value === val);
            handleSendMessage(opt?.label || val);
            if (locIsUrban) {
              setComplaintForm((p) => ({
                ...p,
                location: { ...p.location, urbanPanchayat: val, ward: "" },
              }));
            } else {
              setComplaintForm((p) => ({
                ...p,
                location: { ...p.location, panchayat: val, village: "" },
              }));
            }
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // Incident Location: Village OR Ward
      {
        id: "loc-q-subbody",
        text: locIsUrban
          ? "[Incident Location] Please select the Ward where the incident occurred:"
          : "[Incident Location] Please select the Village where the incident occurred:",
        textHindi: locIsUrban
          ? "[घटना का स्थान] घटना से संबंधित वार्ड चुनें:"
          : "[घटना का स्थान] घटना से संबंधित गाँव चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: locIsUrban
            ? locAddressFields.isWardsLoading
              ? t("Loading wards...", "वार्ड लोड हो रहे हैं...")
              : t("Select Ward", "वार्ड चुनें")
            : locAddressFields.isVillagesLoading
            ? t("Loading villages...", "गाँव लोड हो रहे हैं...")
            : t("Select Village name", "गाँव का नाम चुनें"),
          options: locIsUrban
            ? locAddressFields.wardOptions
            : locAddressFields.villageOptions,
          isLoading: locIsUrban
            ? locAddressFields.isWardsLoading
            : locAddressFields.isVillagesLoading,
          isSearchable: true,
          required: true,
          value: locIsUrban
            ? complaintForm.location.ward
            : complaintForm.location.village,
          onChange: (val: string) => {
            if (locIsUrban) {
              setComplaintForm((p) => ({
                ...p,
                location: { ...p.location, ward: val },
              }));
            } else {
              setComplaintForm((p) => ({
                ...p,
                location: { ...p.location, village: val },
              }));
            }
          },
          onSend: (val: string) => {
            const opts = locIsUrban
              ? locAddressFields.wardOptions
              : locAddressFields.villageOptions;
            const opt = opts.find((o: any) => o.value === val);
            handleSendMessage(opt?.label || val);
            if (locIsUrban) {
              setComplaintForm((p) => ({
                ...p,
                location: { ...p.location, ward: val },
              }));
            } else {
              setComplaintForm((p) => ({
                ...p,
                location: { ...p.location, village: val },
              }));
            }
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // Incident Location: Thana
      {
        id: "loc-q-thana",
        text: "[Incident Location] Please select the Thana where the incident occurred:",
        textHindi: "[घटना का स्थान] घटना से संबंधित थाना चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: locAddressFields.isThanasLoading
            ? t("Loading thanas...", "थाना लोड हो रहे हैं...")
            : t("Select Thana", "थाना चुनें"),
          options: locAddressFields.thanaOptions,
          isLoading: locAddressFields.isThanasLoading,
          isSearchable: true,
          required: true,
          value: complaintForm.location.thana,
          onChange: (val: string) => {
            setComplaintForm((p) => ({
              ...p,
              location: { ...p.location, thana: val },
            }));
          },
          onSend: (val: string) => {
            const opt = locAddressFields.thanaOptions.find((t: any) => t.value === val);
            handleSendMessage(opt?.label || val);
            setComplaintForm((p) => ({
              ...p,
              location: { ...p.location, thana: val },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // Incident Location: Landmark (Optional)
      {
        id: "loc-q-landmark",
        text: "[Incident Location] Please enter nearby landmark of incident location (or skip):",
        textHindi: "[घटना का स्थान] घटना स्थल का नजदीकी लैंडमार्क दर्ज करें (या छोड़ें):",
        InputComponent: ChatMessageInput,
        InputProps: {
          placeholder: t("Enter Landmark", "लैंडमार्क दर्ज करें"),
          maxLength: 50,
          required: false,
          value: complaintForm.location.landmark,
          onChange: (e: any) => {
            const mark = e.target.value;
            setComplaintForm((p) => ({
              ...p,
              location: { ...p.location, landmark: mark },
            }));
          },
          onSend: (val: string) => {
            handleSendMessage(val || t("Skipped", "छोड़ दिया"));
            setComplaintForm((p) => ({
              ...p,
              location: { ...p.location, landmark: val },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // Incident Location: PIN Code
      {
        id: "loc-q-pincode",
        text: "[Incident Location] Please enter 6-digit PIN Code of incident location:",
        textHindi: "[घटना का स्थान] घटना स्थल का 6 अंकों का पिन कोड दर्ज करें:",
        InputComponent: ChatMessageInput,
        InputProps: {
          placeholder: "800001",
          isNumsOnly: true,
          maxLength: 6,
          required: true,
          value: complaintForm.location.pincode,
          onChange: (e: any) => {
            const pin = e.target.value;
            setComplaintForm((p) => ({
              ...p,
              location: { ...p.location, pincode: pin },
            }));
          },
          onSend: (val: string) => {
            handleSendMessage(val);
            setComplaintForm((p) => ({
              ...p,
              location: { ...p.location, pincode: val },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },

      // ── IMPACT ───────────────────────────────────────────────────────────────
      // Affected Beneficiary
      {
        id: "form-q-beneficiary",
        text: "Please select the Affected Beneficiary:",
        textHindi: "कृपया प्रभावित लाभार्थी चुनें:",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: t("Select beneficiary type", "लाभार्थी प्रकार चुनें"),
          options: affectedBeneficiaryOptions,
          required: true,
          value: complaintForm.impact.affectedBeneficiary,
          onChange: (val: string) => {
            setComplaintForm((p) => ({
              ...p,
              impact: { ...p.impact, affectedBeneficiary: val },
            }));
          },
          onSend: (val: string) => {
            const opt = affectedBeneficiaryOptions.find((b: any) => b.value === val);
            handleSendMessage(opt?.label || val);
            setComplaintForm((p) => ({
              ...p,
              impact: { ...p.impact, affectedBeneficiary: val },
            }));
            setFormStep((prev) => prev + 1);
          },
        },
      },
      // Vulnerability Categories (Optional)
      {
        id: "form-q-vulnerability",
        text: "Select any vulnerability category that applies (or skip):",
        textHindi: "लागू होने वाली संवेदनशीलता श्रेणी चुनें (या छोड़ें):",
        InputComponent: ChatSelectInput,
        InputProps: {
          placeholder: t("Select categories (optional)", "श्रेणी चुनें (वैकल्पिक)"),
          options: vulnerabilityOptions,
          isMultiple: true,
          required: false,
          value: Object.keys(complaintForm.impact.vulnerability).filter(
            (k) => (complaintForm.impact.vulnerability as any)[k],
          ),
          onChange: (valArray: string[]) => {
            const vulMap = {
              seniorCitizen: valArray.includes("seniorCitizen"),
              woman: valArray.includes("woman"),
              personWithDisability: valArray.includes("personWithDisability"),
              economicallyWeakerSection: valArray.includes("economicallyWeakerSection"),
              general: valArray.includes("general"),
            };
            setComplaintForm((p) => ({
              ...p,
              impact: { ...p.impact, vulnerability: vulMap },
            }));
          },
          onSend: async (valArray: any) => {
            const arr = Array.isArray(valArray) ? valArray : [];
            const labels = arr
              .map((v) => vulnerabilityOptions.find((o) => o.value === v)?.label)
              .filter(Boolean)
              .join(", ");
            handleSendMessage(labels || t("Skipped", "छोड़ दिया"));

            const vulMap = {
              seniorCitizen: arr.includes("seniorCitizen"),
              woman: arr.includes("woman"),
              personWithDisability: arr.includes("personWithDisability"),
              economicallyWeakerSection: arr.includes("economicallyWeakerSection"),
              general: arr.includes("general"),
            };

            const finalForm: GrievanceFormValues = {
              ...complaintForm,
              impact: {
                ...complaintForm.impact,
                vulnerability: vulMap,
              },
            };

            await handleFinalSubmit(finalForm);
          },
        },
      },
    ];

    return [...initialList, ...correspondenceList, ...remainingList];
  }, [
    complaintForm,
    departmentsLoading,
    departmentOptions,
    permAddressFields,
    permIsUrban,
    corrAddressFields,
    corrIsUrban,
    isBihar,
    cityOptions,
    locAddressFields,
    locIsUrban,
    servicesLoading,
    serviceOptions,
    naturesLoading,
    grievanceNatureOptions,
    affectedBeneficiaryOptions,
    vulnerabilityOptions,
    t,
  ]);

  const activeQuestion = questions[formStep];

  // Post bot message when question changes
  useEffect(() => {
    if (isFlowActive && activeQuestion && formStep < questions.length) {
      appendBotMessage({
        id: `${activeQuestion.id}-${formStep}`,
        sender: "bot",
        text: activeQuestion.text,
        textHindi: activeQuestion.textHindi,
        timestamp: moment(),
        Component: null,
      });
    }
  }, [isFlowActive, formStep, activeQuestion?.id]);

  useEffect(() => {
    if (!isFlowActive) {
      setFormStep(0);
      setComplaintForm(defaultValues);
      setCorrIds({
        districtId: "",
        blockId: "",
        panchayatId: "",
        urbanPanchayatId: "",
      });
    }
  }, [isFlowActive]);

  return {
    InputComponent: isFlowActive && formStep < questions.length ? activeQuestion?.InputComponent : null,
    inputProps: isFlowActive && formStep < questions.length ? activeQuestion?.InputProps : null,
    formStep,
    setFormStep,
    complaintForm,
    setComplaintForm,
  };
}
