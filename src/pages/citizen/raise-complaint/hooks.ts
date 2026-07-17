
import { useGetGrievenceNatures, useGetSubservices, useGetDemographics } from "@/hooks/useGetQuery";


export const useRaiseComplaintData = (lang :any) => {

  const API_PARAMS = { page: 1, limit: 500, select: "title,titleHindi,name,nameHindi" };

  const { data: subServicesData, isLoading: subServicesLoading } =
    useGetSubservices([], API_PARAMS);

  const { data: naturesData, isLoading: naturesLoading } =
    useGetGrievenceNatures([], API_PARAMS);

  const { data: demographyData, isLoading: demographyLoading } =
    useGetDemographics([], API_PARAMS);

  const allSubServices: any[] = subServicesData?.data?.data?.docs ?? [];
  const allNatures: any[] = naturesData?.data?.data?.docs ?? [];

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
    .filter((n) => n.type === "Affected Beneficiaries")
    .map((n) => ({
      label: lang === "hi" && n.titleHindi ? n.titleHindi : n.title,
      value: n._id,
    }));

  const allDemography = (demographyData?.data?.data?.docs ?? []).map((d: any) => ({
    label: lang === "hi" && d.nameHindi ? d.nameHindi : d.name ,
    value:  d._id,
  }));

  return {
    subServicesLoading,
    naturesLoading,
    demographyLoading,

    subServiceOptions,
    grievanceNatureOptions,
    allDemography,

    frequencyOptions,
    affectedBeneficiaryOptions,
  };
};



