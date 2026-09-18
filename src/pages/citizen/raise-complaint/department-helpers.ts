import { getFormsFields } from "@/lib/idb";
import moment from "moment";
import { parsePhoneNumber } from "react-phone-number-input";

export const checkIdbDataExpiry = async (departmentCode: string) => {
  const dataFromDb = await getFormsFields(departmentCode);
  const isExpired =
    dataFromDb?.cachedAt &&
    moment(dataFromDb.cachedAt).isValid() &&
    moment().diff(moment(dataFromDb.cachedAt), "hours") >= 24;

  return { dataFromDb, isExpired };
};


export const formatMobile = (mobile?: string | null): string => {
  if (!mobile) return "";
  try {
    const raw = String(mobile).trim();
    const parsed = parsePhoneNumber(raw.startsWith("+") ? raw : `+91${raw}`);
    if (parsed?.nationalNumber) {
      return parsed.nationalNumber;
    }
  } catch (e) {
    // fallback
  }
  const cleaned = String(mobile).replace(/\D/g, "");
  return cleaned.length > 10 ? cleaned.slice(-10) : cleaned;
};

export const finalMappedDataOfExternalDept = (
  departmentCode: string,
  mobile: string,
  departmentPayload: any,
) => {
  return {
    departmentCode,
    mobile,
    departmentPayload,
  };
};
