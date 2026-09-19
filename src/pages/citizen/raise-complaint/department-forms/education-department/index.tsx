import React, { useMemo } from "react";
import LoaderErrWrapper from "@/components/LoaderErrWrapper";
import Form from "./components/Form";
import RhfWrapper from "@/components/RhfWrapper";
import { useGetFieldsOptions } from "./hooks";
import { getFinalData } from "./helpers";
import validationSchema from "./schema";
import { useProfile } from "@/context/ProfileContext";
import { formatMobile } from "../../department-helpers";
import { useLanguage } from "@/context/LanguageContext";

const defaultValue = {
  externalRef: "",
  type: "COMPLAINT",
  categoryId: "",
  categoryOther: "",
  complaint: "",
  complainant: {
    name: "",
    mobile: "",
    shareNumberWithOfficer: false,
  },
  location: {
    districtCode: "",
    blockCode: "",
    clusterCode: "",
    panchayatCode: "",
    villageCode: "",
    schoolCode: "",
    teacherCode: "",
  },
  accused: {
    name: "",
    designation: "",
  },
  source: "HELPLINE",
  registeredAt: "",
};

interface EducationDeptFormProps {
  onSuccess: (payload: any) => void;
  isLoading?: boolean;
  selectedDept?: string;
}

const EducationDeptForm: React.FC<EducationDeptFormProps> = ({
  onSuccess,
  isLoading,
  selectedDept = "EDUCATION",
}) => {
  const {
    fields,
    error,
    isLoading: isFieldsLoading,
  } = useGetFieldsOptions(selectedDept);
  const { profile } = useProfile();
  const { t } = useLanguage();

  const formattedMobile = useMemo(() => {
    return formatMobile(profile?.mobile);
  }, [profile?.mobile]);

  const formInitialValues = useMemo(() => {
    return {
      ...defaultValue,
      complainant: {
        ...defaultValue.complainant,
        name: profile?.fullName || "",
        mobile: formattedMobile,
      },
    };
  }, [profile?.fullName, formattedMobile]);

  return (
    <LoaderErrWrapper
      isLoading={isFieldsLoading}
      error={error}
      loadingText={t("Loading form options...", "फ़ॉर्म विकल्प लोड हो रहे हैं...")}
    >
      <RhfWrapper
        key={formattedMobile + (profile?.fullName || "")}
        initialValues={formInitialValues}
        onSubmit={(data) => {
          const finalData = getFinalData(data, selectedDept);
          console.log("Education Grievance Data:", data, finalData);
          if (onSuccess) {
            onSuccess(finalData);
          }
        }}
        onError={(err) => {
          console.log("Education Form Error:", err);
        }}
        isValidation={true}
        validationSchema={validationSchema}
      >
        <Form fields={fields} isLoading={isLoading} />
      </RhfWrapper>
    </LoaderErrWrapper>
  );
};

export default EducationDeptForm;
