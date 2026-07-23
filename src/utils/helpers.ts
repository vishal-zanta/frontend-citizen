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


export const getFirstErrorEl = (errors :any, prefix : any = "") => {
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

    // Nested error group — recurse.
    const result = getFirstErrorEl(node, path);
    if (result.path !== null) return result;
  }

  return { el: null, path: null };
};


export const focusErrorElement = (methods :any, err :any=null)=> {
  let errors = err? err : methods.formState.errors;
      if (!Object.keys(errors).length) return;
    
 const { el, path } = getFirstErrorEl(errors);
    // console.log({el, path, errors});
    if (el ) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
     
    }
    if (path) {
      // setFocus expects the registered field name (dot-path for nested fields)
      try { methods.setFocus(path); } catch (_) {}
    }
}
