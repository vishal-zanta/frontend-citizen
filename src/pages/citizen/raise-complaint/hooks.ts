import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWatch, Control, UseFormSetValue } from "react-hook-form";
import {
  useGetGrievenceNatures,
  useGetServices,
  useGetDepartments,
} from "@/hooks/useGetQuery";
import {
  getDistricts,
  getBlocks,
  getPanchayats,
  getThanas,
} from "@/api/address.api";
import {
  getDivisions,
  getDistrictsByDivision,
  getSubdivisionsByDistrict,
  getBlocksBySubdivision,
} from "@/api/location.api";

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

  return {
    departmentsLoading,
    departmentsError,
    departmentOptions,
    departmentsOptions: departmentOptions,

    // servicesLoading,
    // servicesOptions,
    naturesLoading,

    grievanceNatureOptions,

    frequencyOptions,
    affectedBeneficiaryOptions,
  };
};

interface UseGetAddressFieldsProps {
  districtId?: string;
  blockId?: string;
  lang?: any;
  enabled?: boolean;
}

export const useGetAddressFields = (
  {
    districtId = "",
    blockId = "",
    lang = "en",
    enabled = true,
  }: UseGetAddressFieldsProps = {},
  { isValueId = true }: any,
) => {
  const CACHE_TIME = 5 * 60 * 1000;
  const {
    data: districtsData,
    isLoading: isDistrictsLoading,
    error: districtsError,
    refetch: refetchDistricts,
  } = useQuery({
    queryKey: ["address-districts"],
    queryFn: () => getDistricts(),
    enabled,
    gcTime: CACHE_TIME,
    staleTime: CACHE_TIME,
  });

  const {
    data: blocksData,
    isLoading: isBlocksLoading,
    error: blocksError,
    refetch: refetchBlocks,
  } = useQuery({
    queryKey: ["address-blocks", districtId],
    queryFn: () => getBlocks(districtId),
    enabled: Boolean(enabled && districtId),
    gcTime: CACHE_TIME,
    staleTime: CACHE_TIME,
  });

  const {
    data: panchayatsData,
    isLoading: isPanchayatsLoading,
    error: panchayatsError,
    refetch: refetchPanchayats,
  } = useQuery({
    queryKey: ["address-panchayats", blockId],
    queryFn: () => getPanchayats(blockId),
    enabled: Boolean(enabled && blockId),
    gcTime: CACHE_TIME,
    staleTime: CACHE_TIME,
  });

  const {
    data: thanasData,
    isLoading: isThanasLoading,
    error: thanasError,
    refetch: refetchThanas,
  } = useQuery({
    queryKey: ["address-thanas", blockId],
    queryFn: () => getThanas(blockId),
    enabled: Boolean(enabled && blockId),
    gcTime: CACHE_TIME,
    staleTime: CACHE_TIME,
  });

  // useEffect(() => {
  //   if (districtsData) {
  //     console.log(
  //       "Districts API Data:",
  //       districtsData?.data?.data || districtsData?.data || districtsData,
  //     );
  //   }
  // }, [districtsData]);

  // useEffect(() => {
  //   if (blocksData) {
  //     console.log(
  //       `Blocks API Data (districtId: ${districtId}):`,
  //       blocksData?.data?.data || blocksData?.data || blocksData,
  //     );
  //   }
  // }, [blocksData, districtId]);

  // useEffect(() => {
  //   if (panchayatsData) {
  //     console.log(
  //       `Panchayats API Data (blockId: ${blockId}):`,
  //       panchayatsData?.data?.data || panchayatsData?.data || panchayatsData,
  //     );
  //   }
  // }, [panchayatsData, blockId]);

  // useEffect(() => {
  //   if (thanasData) {
  //     console.log(
  //       `Thanas API Data (blockId: ${blockId}):`,
  //       thanasData?.data?.data || thanasData?.data || thanasData,
  //     );
  //   }
  // }, [thanasData, blockId]);

  const getList = (res: any) => {
    if (Array.isArray(res?.data?.data?.docs)) return res.data.data.docs;
    if (Array.isArray(res?.data?.data)) return res.data.data;
    if (Array.isArray(res?.data?.docs)) return res.data.docs;
    if (Array.isArray(res?.data)) return res.data;
    return [];
  };

  const districts = getList(districtsData);
  const blocks = getList(blocksData);
  const panchayats = getList(panchayatsData);
  const thanas = getList(thanasData);
  const mapOptions = (arr = []) => {
    return arr.map((item: any) => ({
      label: lang == "hi" ? item.name_local : item.name_en,
      // labelHindi: item.name_local,
      value: isValueId
        ? item._id
        : lang == "hi"
          ? item.name_local
          : item.name_en,
      raw: item,
    }));
  };

  const districtOptions = mapOptions(districts);
  const blockOptions = mapOptions(blocks);
  const panchayatOptions = mapOptions(panchayats);
  const thanaOptions = mapOptions(thanas);

  return {
    districtsData,
    blocksData,
    panchayatsData,
    thanasData,

    districts,
    blocks,
    panchayats,
    thanas,

    districtOptions,
    blockOptions,

    panchayatOptions,
    thanaOptions,

    isDistrictsLoading,
    isBlocksLoading,
    isPanchayatsLoading,
    isThanasLoading,
    isLoading:
      isDistrictsLoading ||
      isBlocksLoading ||
      isPanchayatsLoading ||
      isThanasLoading,

    districtsError,
    blocksError,
    panchayatsError,
    thanasError,

    refetchDistricts,
    refetchBlocks,
    refetchPanchayats,
    refetchThanas,
  };
};

interface UseClearAddressFieldsProps {
  control: Control<any>;
  prefix: string;
  setValue: UseFormSetValue<any>;
}

export const useClearAddressFields = ({
  control,
  prefix,
  setValue,
}: UseClearAddressFieldsProps) => {
  const district = useWatch({
    control,
    name: `${prefix}.district`,
  });

  const subdivision = useWatch({
    control,
    name: `${prefix}.subdivision`,
  });

  const prevDistrictRef = useRef(district);
  const prevSubdivisionRef = useRef(subdivision);

  // When district changes, clear subdivision, panchayat, and thana
  useEffect(() => {
    if (
      prevDistrictRef.current !== undefined &&
      prevDistrictRef.current !== district
    ) {
      setValue(`${prefix}.subdivision`, "", {
        // shouldDirty: true,
        // shouldValidate: true,
      });
      setValue(`${prefix}.panchayat`, "", {
        // shouldDirty: true,
        // shouldValidate: true,
      });
      setValue(`${prefix}.thana`, "", {
        // shouldDirty: true,
        // shouldValidate: true,
      });
    }
    prevDistrictRef.current = district;
  }, [district, prefix, setValue]);

  // When subdivision changes, clear panchayat and thana
  useEffect(() => {
    if (
      prevSubdivisionRef.current !== undefined &&
      prevSubdivisionRef.current !== subdivision
    ) {
      setValue(`${prefix}.panchayat`, "", {
        // shouldDirty: true,
        // shouldValidate: true,
      });
      setValue(`${prefix}.thana`, "", {
        // shouldDirty: true,
        // shouldValidate: true,
      });
    }
    prevSubdivisionRef.current = subdivision;
  }, [subdivision, prefix, setValue]);
};


// location 

interface UseGetLocationAddressFieldsProps {
  divisionId?: string;
  districtId?: string;
  subdivisionId?: string;
  blockId?: string;
  lang?: any;
  enabled?: boolean;
}

export const useGetLocationAddressFields = (
  {
    divisionId = "",
    districtId = "",
    subdivisionId = "",
    blockId = "",
    lang = "en",
    enabled = true,
  }: UseGetLocationAddressFieldsProps = {},
  { isValueId = true }: { isValueId?: boolean } = {},
) => {
  const CACHE_TIME = 5 * 60 * 1000;

  const {
    data: divisionsData,
    isLoading: isDivisionsLoading,
    error: divisionsError,
  } = useQuery({
    queryKey: ["divisions"],
    queryFn: () => getDivisions(),
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
    enabled,
  });

  const {
    data: districtsData,
    isLoading: isDistrictsLoading,
    error: districtsError,
  } = useQuery({
    queryKey: ["districtsByDivision", divisionId],
    queryFn: () => getDistrictsByDivision(divisionId),
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
    enabled: Boolean(divisionId) && enabled,
  });

  const {
    data: subdivisionsData,
    isLoading: isSubdivisionsLoading,
    error: subdivisionsError,
  } = useQuery({
    queryKey: ["subdivisionsByDistrict", districtId],
    queryFn: () => getSubdivisionsByDistrict(districtId),
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
    enabled: Boolean(districtId) && enabled,
  });

  const {
    data: blocksData,
    isLoading: isBlocksLoading,
    error: blocksError,
  } = useQuery({
    queryKey: ["blocksBySubdivision", subdivisionId],
    queryFn: () => getBlocksBySubdivision(subdivisionId),
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
    enabled: Boolean(subdivisionId) && enabled,
  });

  const {
    data: panchayatsData,
    isLoading: isPanchayatsLoading,
    error: panchayatsError,
  } = useQuery({
    queryKey: ["panchayats", blockId],
    queryFn: () => getPanchayats(blockId),
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
    enabled: Boolean(blockId) && enabled,
  });

  const getList = (res: any) => {
    if (Array.isArray(res?.data?.data?.docs)) return res.data.data.docs;
    if (Array.isArray(res?.data?.data)) return res.data.data;
    if (Array.isArray(res?.data?.docs)) return res.data.docs;
    if (Array.isArray(res?.data)) return res.data;
    return [];
  };

  const divisions = getList(divisionsData);
  const districts = getList(districtsData);
  const subdivisions = getList(subdivisionsData);
  const blocks = getList(blocksData);
  const panchayats = getList(panchayatsData);

  const mapOptions = (arr = []) => {
    return arr.map((item: any) => ({
      label: lang == "hi" ? item.name_local : item.name_en,
      value: isValueId
        ? item._id
        : lang == "hi"
          ? item.name_local
          : item.name_en,
      raw: item,
    }));
  };

  const divisionOptions = mapOptions(divisions);
  const districtOptions = mapOptions(districts);
  const subdivisionOptions = mapOptions(subdivisions);
  const blockOptions = mapOptions(blocks);
  const panchayatOptions = mapOptions(panchayats);

  return {
    divisionsData,
    districtsData,
    subdivisionsData,
    blocksData,
    panchayatsData,

    divisions,
    districts,
    subdivisions,
    blocks,
    panchayats,

    divisionOptions,
    districtOptions,
    subdivisionOptions,
    blockOptions,
    panchayatOptions,

    isDivisionsLoading,
    isDistrictsLoading,
    isSubdivisionsLoading,
    isBlocksLoading,
    isPanchayatsLoading,

    divisionsError,
    districtsError,
    subdivisionsError,
    blocksError,
    panchayatsError,
  };
};

interface UseClearLocationFieldsProps {
  control: Control<any>;
  setValue: (name: string, value: any, options?: any) => void;
}

export const useClearLocationFields = ({
  control,
  setValue,
}: UseClearLocationFieldsProps) => {
  const division = useWatch({
    control,
    name: "location.division",
  });

  const district = useWatch({
    control,
    name: "location.district",
  });

  const subdivision = useWatch({
    control,
    name: "location.subdivision",
  });

  const block = useWatch({
    control,
    name: "location.block",
  });

  const prevDivisionRef = useRef(division);
  const prevDistrictRef = useRef(district);
  const prevSubdivisionRef = useRef(subdivision);
  const prevBlockRef = useRef(block);

  // When division changes, clear district, subdivision, block, panchayat
  useEffect(() => {
    if (
      prevDivisionRef.current !== undefined &&
      prevDivisionRef.current !== division
    ) {
      setValue("location.district", "");
      setValue("location.subdivision", "");
      setValue("location.block", "");
      setValue("location.panchayat", "");
    }
    prevDivisionRef.current = division;
  }, [division, setValue]);

  // When district changes, clear subdivision, block, panchayat
  useEffect(() => {
    if (
      prevDistrictRef.current !== undefined &&
      prevDistrictRef.current !== district
    ) {
      setValue("location.subdivision", "");
      setValue("location.block", "");
      setValue("location.panchayat", "");
    }
    prevDistrictRef.current = district;
  }, [district, setValue]);

  // When subdivision changes, clear block, panchayat
  useEffect(() => {
    if (
      prevSubdivisionRef.current !== undefined &&
      prevSubdivisionRef.current !== subdivision
    ) {
      setValue("location.block", "");
      setValue("location.panchayat", "");
    }
    prevSubdivisionRef.current = subdivision;
  }, [subdivision, setValue]);

  // When block changes, clear panchayat
  useEffect(() => {
    if (
      prevBlockRef.current !== undefined &&
      prevBlockRef.current !== block
    ) {
      setValue("location.panchayat", "");
    }
    prevBlockRef.current = block;
  }, [block, setValue]);
};
