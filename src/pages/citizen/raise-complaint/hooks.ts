import {
  useGetGrievenceNatures,
  useGetServices,
  useGetDemographics,
  useGetDepartments,
} from "@/hooks/useGetQuery";

export const useRaiseComplaintData = (lang: any) => {
  const API_PARAMS = {
    page: 1,
    limit: 500,
    select: "title,titleHindi,name,nameHindi",
  };

  const {
    data: departmentsData,
    isLoading: departmentsLoading,
    error: departmentsError,
  } = useGetDepartments([], API_PARAMS);

  // const { data: servicesData, isLoading: servicesLoading } = useGetServices(
  //   [],
  //   API_PARAMS,
  // );

  const { data: naturesData, isLoading: naturesLoading } =
    useGetGrievenceNatures([], API_PARAMS);

  const { data: demographyData, isLoading: demographyLoading } =
    useGetDemographics([], API_PARAMS);

  const allNatures: any[] = naturesData?.data?.data?.docs ?? [];

  // Filter grievance natures to only "grievanceNature" type
  const grievanceNatureOptions = allNatures
    .filter((n) => n.type === "Grievance Nature")
    .map((n) => ({
      label: lang === "hi" && n.titleHindi ? n.titleHindi : n.title,
      value: n._id,
      title: n.title,
      titleHindi: n.titleHindi,
    }));

  const departmentOptions = (departmentsData?.data?.data?.docs ?? []).map(
    (d: any) => ({
      label:
        lang === "hi" && (d.titleHindi || d.nameHindi)
          ? d.titleHindi || d.nameHindi
          : d.title || d.name,
      value: d._id,
      title: d.title || d.name,
      titleHindi: d.titleHindi || d.nameHindi,
    }),
  );

  // const servicesOptions = (servicesData?.data?.data?.docs ?? []).map(
  //   (s: any) => ({
  //     label:
  //       lang === "hi" && (s.titleHindi || s.nameHindi)
  //         ? s.titleHindi || s.nameHindi
  //         : s.title || s.name,
  //     value: s._id,
  //     title: s.title || s.name,
  //     titleHindi: s.titleHindi || s.nameHindi,
  //   }),
  // );

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

  const allDemography = (demographyData?.data?.data?.docs ?? []).map(
    (d: any) => ({
      label: lang === "hi" && d.nameHindi ? d.nameHindi : d.name,
      value: d._id,
      name: d.name,
    }),
  );

  return {
    departmentsLoading,
    departmentsError,
    departmentOptions,
    departmentsOptions: departmentOptions,

    // servicesLoading,
    // servicesOptions,
    naturesLoading,
    demographyLoading,

    grievanceNatureOptions,
    allDemography,

    frequencyOptions,
    affectedBeneficiaryOptions,
  };
};

