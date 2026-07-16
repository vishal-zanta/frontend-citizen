import { toast } from "sonner";

export const getSuccessToast = (description: string) => {
  toast.success(description);
};

export const getErrorToast = (err: any) => {
  const message =
    err?.response?.data?.message || err?.message || (typeof err === "string" ? err :  "Something went wrong!");
  toast.error(message);
};

export const getWarningToast = (description: string) => {
  toast.warning(description);
};

export const getInfoToast = (description: string) => {
  toast.info(description);
};

export function isValidNumber(value: any, min?: number, max?: number) {
  // Empty string is considered valid
  if (value === "") return true;

  const num = Number(value);

  // Not a valid number
  if (Number.isNaN(num)) return false;

  // Check minimum if provided
  if (min !== undefined && num < min) return false;

  // Check maximum if provided
  if (max !== undefined && num > max) return false;

  return true;
}
