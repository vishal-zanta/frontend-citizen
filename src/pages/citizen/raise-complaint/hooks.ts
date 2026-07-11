
import { useGetGrievenceNatures, useGetSubservices } from "@/hooks/useGetQuery";


export const useRaiseComplaintData = (lang :any) => {

  const API_PARAMS = { page: 1, limit: 100 };

  const { data: subServicesData, isLoading: subServicesLoading } =
    useGetSubservices([], API_PARAMS);

  const { data: naturesData, isLoading: naturesLoading } =
    useGetGrievenceNatures([], API_PARAMS);

    // const {  data: complaintSourceData, isLoading: complaintSourceLoading } = useGetComplaintResources([], API_PARAMS)

  const allSubServices: any[] = subServicesData?.data?.data?.docs ?? [];
  const allNatures: any[] = naturesData?.data?.data?.docs ?? [];
  // const complaintSource: any[] = complaintSourceData?.data?.data?.docs ?? [];

  // Filter grievance natures to only "grievanceNature" type
  const grievanceNatureOptions = allNatures
    .filter((n) => n.type === "Grievance Nature")
    .map((n) => ({
      label: lang === "hi" && n.titleHindi ? n.titleHindi : n.title,
      value: n._id,
    }));

  const subServiceOptions = allSubServices.map((s) => ({
    label: lang === "hi" && s.titleHindi ? s.titleHindi : s.title,
    value: s._id,
  }));

  const frequencyOptions = allNatures
    .filter((n) => n.type === "Evidence Frequency")
    .map((n) => ({
      label: lang === "hi" && n.titleHindi ? n.titleHindi : n.title,
      value: n._id,
    }));

  const affectedBeneficiaryOptions = allNatures
    .filter((n) => n.type === "Public Impact")
    .map((n) => ({
      label: lang === "hi" && n.titleHindi ? n.titleHindi : n.title,
      value: n._id,
    }));

  // const preferredModeOptions = complaintSource.map((n) => ({
  //     label:  n.title,
  //     value: n._id,
  //   }));


 
  return {
    subServicesLoading,
    naturesLoading,
    // complaintSourceLoading,

    subServiceOptions,
    grievanceNatureOptions,
    // complaintSource,

    frequencyOptions,
    affectedBeneficiaryOptions,
    // preferredModeOptions,
  };
};



