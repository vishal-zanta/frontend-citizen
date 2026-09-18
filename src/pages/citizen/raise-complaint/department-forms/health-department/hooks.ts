import { useEffect, useState } from "react";
import { getMappedMasterData, getDistrictMappedData } from "./helpers";
import { postFormFields } from "@/lib/idb";
import { checkIdbDataExpiry } from "../../department-helpers";
import {
  getExternalMasterData,
  getExternalDistrictData,
} from "@/api/externalDept.api";

const getMasterData = async (departmentCode = "HEALTH") => {
  const res = await getExternalMasterData(departmentCode);
  return res.data?.data;
};

const getDistrictData = async (departmentCode = "HEALTH") => {
  const res = await getExternalDistrictData(departmentCode);
  return res.data?.data;
};

export const usePostPreCall = (departmentCode = "HEALTH") => {
  const [fields, setFields] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  async function getDataFromApis() {
    const [masterRes, districtRes] = await Promise.all([
      getMasterData(departmentCode),
      getDistrictData(departmentCode),
    ]);

    const mappedMasterData = getMappedMasterData(masterRes);
    const mappedDistrictData = getDistrictMappedData(districtRes);
    return { ...mappedDistrictData, ...mappedMasterData };
  }

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { dataFromDb, isExpired } = await checkIdbDataExpiry(departmentCode);

        if (!dataFromDb || isExpired) {
          console.log("Fetching Data from server");
          const mappedData = await getDataFromApis();
          await postFormFields(departmentCode, mappedData);
          setFields(mappedData);
        } else {
          console.log("Using cached data");
          setFields(dataFromDb?.fields || {});
        }
      } catch (err) {
        console.error("Error fetching external grievance data:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [departmentCode]);

  return {
    fields,
    isLoading,
    error,
  };
};
