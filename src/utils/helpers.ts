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
export const isAlpha = (value: any) => {
  // empty value is valid
  if (value === "") return true;

  // only English letters, Hindi (Devanagari) letters, and spaces
  if (!/^[A-Za-z\p{Script=Devanagari} ]*$/u.test(value)) return false;

  // must contain at least one English or Hindi letter
  if (!/[A-Za-z\p{Script=Devanagari}]/u.test(value)) return false;

  // no more than 2 trailing spaces allowed
  const trailingSpaces = value.match(/ *$/)?.[0].length ?? 0;
  if (trailingSpaces > 2) return false;

  return true;
};