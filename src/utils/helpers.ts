import { toast } from "sonner";
import { IMG_BASE_URL } from "./constants";

export const getSuccessToast = (description: string) => {
  toast.success(description);
};

export const getErrorToast = (err: any) => {
  const message =
    err?.response?.data?.message ||
    err?.message ||
    (typeof err === "string" ? err : "Something went wrong!");
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

export const getFirstErrorEl = (errors: any, prefix: any = "") => {
  if (!errors || typeof errors !== "object") return { el: null, path: null };

  for (const key of Object.keys(errors)) {
    const node = errors[key];
    const path = prefix ? `${prefix}.${key}` : key;

    if (!node || typeof node !== "object") continue;

    // A FieldError leaf has a `message` string.
    if (typeof node.message === "string") {
      // Try querying by name attribute first (covers inputs rendered with that name),
      // then fall back to getElementById for react-select inputs (inputId === name).
      const el =
        document.querySelector(`[name="${path}"]`) ??
        document.getElementById(path) ??
        // react-select sets inputId; also try the last segment for flat ids.
        document.getElementById(key);
      return { el, path };
    }

    // Nested error group - recurse.
    const result = getFirstErrorEl(node, path);
    if (result.path !== null) return result;
  }

  return { el: null, path: null };
};

export const focusErrorElement = (methods: any, err: any = null) => {
  let errors = err ? err : methods.formState.errors;
  if (!Object.keys(errors).length) return;

  const { el, path } = getFirstErrorEl(errors);
  // console.log({el, path, errors});
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  if (path) {
    // setFocus expects the registered field name (dot-path for nested fields)
    try {
      methods.setFocus(path);
    } catch (_) {}
  }
};

export const getImageUrl = (url: string) => {
  if (!url) return "";
  const combined = IMG_BASE_URL + url;
  // collapse multiple slashes, but skip the "://" after the protocol
  return combined.replace(/([^:]\/)\/+/g, "$1");
};

/**
 * Extracts standard English and Hindi name labels from a string or populated object.
 * Handles demographic address models (name_en, name_local), services/departments (title, titleHindi),
 * standard labels (name, nameHindi), etc.
 */
export const getEntityName = (item: any): { name: string; nameHindi: string } => {
  if (!item) return { name: "", nameHindi: "" };
  if (typeof item === "string") {
    return { name: item, nameHindi: item };
  }
  if (typeof item === "object") {
    const name =
      item.name_en ||
      item.title ||
      item.name ||
      item.title_en ||
      item.label ||
      item.designationLabel ||
      "";
    const nameHindi =
      item.name_local ||
      item.titleHindi ||
      item.nameHindi ||
      item.name_hi ||
      item.title_hi ||
      item.labelHindi ||
      name;

    return { name, nameHindi };
  }
  return { name: String(item), nameHindi: String(item) };
};

/**
 * Returns the localized label for a string or populated entity using the translation function `t`.
 */
export const getEntityLabel = (item: any, t?: (en: string, hi: string) => string) => {
  if (!item) return "";
  const { name, nameHindi } = getEntityName(item);
  if (t) {
    return t(name, nameHindi || name) || name || nameHindi || "";
  }
  return name || nameHindi || "";
};

