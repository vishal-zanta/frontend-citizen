import React, { useMemo } from "react";
import RhfWrapper from "@/components/RhfWrapper";
import Form from "./components/Form";
import schema from "./schema";
import { usePostPreCall } from "./hooks";
import { getFinalFormData } from "./helpers";
import LoaderErrWrapper from "@/components/LoaderErrWrapper";
import { useProfile } from "@/context/ProfileContext";
import { formatMobile } from "../../department-helpers";

const defaultValues = {
  tenantId: "bh.health",
  dateOfIncident: "",
  locationOfIncident: "",
  complainantType: "",
  grievanceType: "",
  serviceCode: "",
  institutionType: "",
  institutionName: "",
  grievanceAgainstWhom: "",
  description: "",
  additionalDetail: {},
  source: "web",
  address: {
    state: "BH",
    division: "",
    region: "",
    district: "",
    block: "",
    village: "",
    locality: {
      code: "",
      name: "",
    },
    geoLocation: {},
  },
  citizen: {
    name: "",
    type: "CITIZEN",
    emailId: null,
    locale: null,
    mobileNumber: "",
    gender: "",
    roles: [
      {
        id: null,
        name: "Citizen",
        code: "CITIZEN",
        tenantId: "bh.health",
      },
    ],
    active: true,
    tenantId: "bh.health",
    permanentCity: null,
  },
};

interface HealthDeptFormProps {
  onSuccess: (payload: any) => void;
  isLoading?: boolean;
  selectedDept?: string;
}

const HealthDepartmentForm: React.FC<HealthDeptFormProps> = ({
  onSuccess,
  isLoading,
}) => {
  const {
    fields,
    isLoading: isFormOptionsLoading,
    error,
  } = usePostPreCall("HEALTH");
  const { profile } = useProfile();

  const formattedMobile = useMemo(() => {
    return formatMobile(profile?.mobile);
  }, [profile?.mobile]);

  const formInitialValues = useMemo(() => {
    return {
      ...defaultValues,
      citizen: {
        ...defaultValues.citizen,
        name: profile?.fullName || "",
        mobileNumber: formattedMobile,
      },
    };
  }, [profile?.fullName, formattedMobile]);

  return (
    <LoaderErrWrapper
      isLoading={isFormOptionsLoading}
      error={error}
      loadingText={"Loading fields options...."}
    >
      <RhfWrapper
        key={formattedMobile + (profile?.fullName || "")}
        initialValues={formInitialValues}
        isValidation
        validationSchema={schema}
        validationOn="onChange"
        onSubmit={(data) => {
          const finalData = getFinalFormData(data, fields, "HEALTH");
          console.log({ data, finalData });
          onSuccess(finalData);
        }}
        className="!space-y-4 !sm:space-y-6"
      >
        <Form fields={fields} isLoading={isLoading} />
      </RhfWrapper>
    </LoaderErrWrapper>
  );
};

export default React.memo(HealthDepartmentForm);
