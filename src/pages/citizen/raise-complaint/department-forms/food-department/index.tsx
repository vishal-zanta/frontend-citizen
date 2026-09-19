import React, { useMemo } from "react";
import LoaderErrWrapper from "@/components/LoaderErrWrapper";
import RhfWrapper from "@/components/RhfWrapper";
import Form from "./components/Form";
import { useGetFoodOptions } from "./hooks";
import validationSchema from "./schema";
import { getFinalFoodData } from "./helpers";
import { useProfile } from "@/context/ProfileContext";
import { formatMobile } from "../../department-helpers";
import { useLanguage } from "@/context/LanguageContext";

const defaultValues = {
  name: "",
  mobileNo: "",
  typeId: "",
  categoryId: "",
  stateId: "10",
  districtId: "",
  blockId: "",
  panchayatId: "",
  villageId: "",
  address: "",
  grievancesDescription: "",
};

interface FoodDepartmentFormProps {
  onSuccess: (payload: any) => void;
  isLoading?: boolean;
  selectedDept?: string;
}

const FoodDepartmentForm: React.FC<FoodDepartmentFormProps> = ({
  onSuccess,
  isLoading,
  selectedDept = "FOOD",
}) => {
  const { t } = useLanguage();
  const {
    options,
    error,
    loading: isOptionsLoading,
  } = useGetFoodOptions(selectedDept);
  const { profile } = useProfile();

  const formattedMobile = useMemo(() => {
    return formatMobile(profile?.mobile);
  }, [profile?.mobile]);

  const formInitialValues = useMemo(() => {
    return {
      ...defaultValues,
      name: profile?.fullName || "",
      mobileNo: formattedMobile,
    };
  }, [profile?.fullName, formattedMobile]);

  return (
    <LoaderErrWrapper
      isLoading={isOptionsLoading}
      error={error}
      loadingText={t("Loading form options...", "फ़ॉर्म विकल्प लोड हो रहे हैं...")}
    >
      <RhfWrapper
        key={formattedMobile + (profile?.fullName || "")}
        initialValues={formInitialValues}
        onSubmit={(data) => {
          const finalData = getFinalFoodData(data, selectedDept);
          console.log("Food Grievance Data:", data, finalData);
          if (onSuccess) {
            onSuccess(finalData);
          }
        }}
        onError={(err) => {
          console.log("Food Form Error:", err);
        }}
        isValidation={true}
        validationSchema={validationSchema}
      >
        <Form options={options} isLoading={isLoading} />
      </RhfWrapper>
    </LoaderErrWrapper>
  );
};

export default React.memo(FoodDepartmentForm);
