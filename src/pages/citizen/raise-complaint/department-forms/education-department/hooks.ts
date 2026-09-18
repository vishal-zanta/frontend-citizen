import { useEffect, useState } from "react";
import { checkIdbDataExpiry } from "../../department-helpers";
import { getExternalMasterData } from "@/api/externalDept.api";
import { postFormFields } from "@/lib/idb";

export const useGetFieldsOptions = (departmentCode = "EDUCATION") => {
  const isLoading = false;
  const error = null;

  const [fields, setFields] = useState<any>({});

  const types = ["categories", "districts", "sources"];

  async function getDataFromApi() {
    return Promise.all(
      types.map((t) => getExternalMasterData(departmentCode, { type: t })),
    );
  }

  useEffect(() => {
    async function getData() {
      try {
        if (!departmentCode) return;
        const { dataFromDb, isExpired } =
          await checkIdbDataExpiry(departmentCode);
        if (dataFromDb && !isExpired) {
          console.log("Using cached data");
          setFields(dataFromDb?.fields);
        } else {
          console.log("Fetching from api data");

          const data = await getDataFromApi();
          const [categoriesData, districtsData, sourcesData] = data.map(
            (d) => d.data?.data,
          );

          const mappedData = {
            categoryId: (categoriesData || []).map((c: any) => ({
              label: `${c.type}-${c.subType}`,
              value: c.categoryId,
            })),
            districtCode: (districtsData || []).map((d: any) => ({
              label: d.districtName,
              value: d.districtCode,
            })),
            source: (sourcesData || []).map((s: any) => ({
              label: s.source,
              value: s.source,
            })),
            type: ["COMPLAINT", "QUERY"].map((v) => ({
              label: v,
              value: v,
            })),
          };
          await postFormFields(departmentCode, mappedData);
          setFields(mappedData);
        }
      } catch (error) {
        console.error("Error in fields", error);
      }
    }

    getData();
  }, [departmentCode]);

  return { fields, isLoading, error };
};

export const useGetBlockOptions = (
  districtCode: any,
  departmentCode = "EDUCATION",
) => {
  const [blockOptions, setBlockOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchBlockOptions() {
      if (!districtCode) {
        setBlockOptions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await getExternalMasterData(departmentCode, {
          type: "blocks",
          districtCode,
        });

        const blocksData = response?.data?.data || [];
        const formattedBlocks = Array.isArray(blocksData)
          ? blocksData.map((b: any) => ({
              label: b.blockName,
              value: b.blockCode,
            }))
          : [];

        setBlockOptions(formattedBlocks);
      } catch (err) {
        console.error("Error in block options", err);
        setError(err);
        setBlockOptions([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlockOptions();
  }, [districtCode, departmentCode]);

  return { blockOptions, isLoading, error };
};

export const useGetPanchayatOptions = (
  blockCode: any,
  departmentCode = "EDUCATION",
) => {
  const [panchayatOptions, setPanchayatOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchPanchayatOptions() {
      if (!blockCode) {
        setPanchayatOptions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await getExternalMasterData(departmentCode, {
          type: "panchayats",
          blockCode,
        });

        const panchayatsData = response?.data?.data || [];
        const formattedPanchayats = Array.isArray(panchayatsData)
          ? panchayatsData.map((p: any) => ({
              label: p.panchayatName,
              value: p.panchayatCode,
            }))
          : [];

        setPanchayatOptions(formattedPanchayats);
      } catch (err) {
        console.error("Error in panchayat options", err);
        setError(err);
        setPanchayatOptions([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPanchayatOptions();
  }, [blockCode, departmentCode]);

  return { panchayatOptions, isLoading, error };
};

export const useGetVillageOptions = (
  blockCode: any,
  departmentCode = "EDUCATION",
) => {
  const [villageOptions, setVillageOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchVillageOptions() {
      if (!blockCode) {
        setVillageOptions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await getExternalMasterData(departmentCode, {
          type: "villages",
          blockCode,
        });

        const villagesData = response?.data?.data || [];
        const formattedVillages = Array.isArray(villagesData)
          ? villagesData.map((v: any) => ({
              label: v.villageName,
              value: v.villageCode,
            }))
          : [];

        setVillageOptions(formattedVillages);
      } catch (err) {
        console.error("Error in village options", err);
        setError(err);
        setVillageOptions([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVillageOptions();
  }, [blockCode, departmentCode]);

  return { villageOptions, isLoading, error };
};

export const useGetSchoolOptions = (
  blockCode: any,
  departmentCode = "EDUCATION",
) => {
  const [schoolOptions, setSchoolOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchSchoolOptions() {
      if (!blockCode) {
        setSchoolOptions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await getExternalMasterData(departmentCode, {
          type: "schools",
          blockCode,
        });

        const schoolsData = response?.data?.data || [];
        const formattedSchools = Array.isArray(schoolsData)
          ? schoolsData.map((s: any) => ({
              label: s.schoolName,
              value: s.schoolCode,
            }))
          : [];

        setSchoolOptions(formattedSchools);
      } catch (err) {
        console.error("Error in school options", err);
        setError(err);
        setSchoolOptions([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSchoolOptions();
  }, [blockCode, departmentCode]);

  return { schoolOptions, isLoading, error };
};
