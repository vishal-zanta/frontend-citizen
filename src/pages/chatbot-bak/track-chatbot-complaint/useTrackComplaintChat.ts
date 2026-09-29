import { useState, useCallback } from "react";
import { getCaptcha } from "@/api/auth.api";
import { getPublicComplaintStatus } from "@/api/complaints.api";
import { useLanguage } from "@/context/LanguageContext";

export interface TrackChatState {
  inputIdentifier: string;
  captchaId: string;
  captchaSvg: string;
  captchaValue: string;
  isCaptchaLoading: boolean;
  isSearching: boolean;
  error: string | null;
  complaintResult: any;
  isModalOpen: boolean;
}

export const useTrackComplaintChat = () => {
  const { t } = useLanguage();

  const [state, setState] = useState<TrackChatState>({
    inputIdentifier: "",
    captchaId: "",
    captchaSvg: "",
    captchaValue: "",
    isCaptchaLoading: false,
    isSearching: false,
    error: null,
    complaintResult: null,
    isModalOpen: false,
  });

  // Fetch a fresh captcha challenge
  const fetchNewCaptcha = useCallback(async () => {
    setState((prev) => ({ ...prev, isCaptchaLoading: true, error: null }));
    try {
      const res = await getCaptcha();
      const captchaId =
        res?.headers?.["x-captcha-id"] || res?.headers?.["X-Captcha-Id"] || "";
      const svg = res?.data || "";

      setState((prev) => ({
        ...prev,
        captchaId,
        captchaSvg: svg,
        captchaValue: "",
        isCaptchaLoading: false,
      }));

      return { captchaId, svg };
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message ||
        t(
          "Failed to load security code. Please refresh.",
          "सुरक्षा कोड लोड करने में विफल। कृपया रिफ्रेश करें।",
        );
      setState((prev) => ({
        ...prev,
        isCaptchaLoading: false,
        error: errMsg,
      }));
      throw new Error(errMsg);
    }
  }, [t]);

  // Set the phone or complaint number
  const recordPhoneOrId = useCallback((identifier: string) => {
    const cleaned = identifier.trim();
    setState((prev) => ({
      ...prev,
      inputIdentifier: cleaned,
      error: null,
    }));
    return cleaned;
  }, []);

  // Submit collected inputs (Identifier + Captcha) to API
  const executeTrackQuery = useCallback(
    async (captchaVal: string) => {
      const trimmedCaptcha = captchaVal.trim();
      const currentId = state.inputIdentifier.trim();
      const currentCaptchaId = state.captchaId;

      if (!currentId) {
        throw new Error(
          t("Complaint ID is missing.", "शिकायत संख्या मौजूद नहीं है।"),
        );
      }

      if (!trimmedCaptcha) {
        throw new Error(
          t("Please enter security code.", "कृपया सुरक्षा कोड दर्ज करें।"),
        );
      }

      setState((prev) => ({
        ...prev,
        captchaValue: trimmedCaptcha,
        isSearching: true,
        error: null,
      }));

      // Determine proper ID format
      let formattedId = currentId;
      const digitsOnly = currentId.replace(/\D/g, "");

      // If it looks like complaint number format (e.g. 2026-000031 or BR-2026-000031)
      if (
        currentId.toUpperCase().startsWith("BR-") ||
        (currentId.includes("-") && digitsOnly.length >= 6)
      ) {
        formattedId = currentId.toUpperCase().startsWith("BR-")
          ? currentId.toUpperCase()
          : `BR-${currentId.replace(/^BR-?/i, "")}`;
      }

      try {
        const res = await getPublicComplaintStatus({
          complaintId: formattedId,
          params: {
            captchaId: currentCaptchaId,
            captchaValue: trimmedCaptcha,
          },
        });

        const data = res?.data?.data || res?.data;
        const enrichedData = {
          ...data,
          grievanceId: data?.grievanceId || formattedId,
          _id: data?._id || data?.id || formattedId,
        };

        setState((prev) => ({
          ...prev,
          complaintResult: enrichedData,
          isSearching: false,
          error: null,
        }));

        return enrichedData;
      } catch (err: any) {
        const errorMsg =
          err?.response?.data?.message ||
          err?.message ||
          t(
            "Unable to find complaint or invalid security code.",
            "शिकायत खोजने में असमर्थ या अमान्य सुरक्षा कोड।",
          );

        setState((prev) => ({
          ...prev,
          isSearching: false,
          error: errorMsg,
          captchaValue: "",
        }));

        // Refresh captcha for next attempt
        fetchNewCaptcha().catch(() => {});

        throw new Error(errorMsg);
      }
    },
    [state.inputIdentifier, state.captchaId, fetchNewCaptcha, t],
  );

  const resetTrackState = useCallback(() => {
    setState({
      inputIdentifier: "",
      captchaId: "",
      captchaSvg: "",
      captchaValue: "",
      isCaptchaLoading: false,
      isSearching: false,
      error: null,
      complaintResult: null,
      isModalOpen: false,
    });
  }, []);

  const openDetailsModal = useCallback(() => {
    setState((prev) => ({ ...prev, isModalOpen: true }));
  }, []);

  const closeDetailsModal = useCallback(() => {
    setState((prev) => ({ ...prev, isModalOpen: false }));
  }, []);

  return {
    state,
    fetchNewCaptcha,
    recordPhoneOrId,
    executeTrackQuery,
    resetTrackState,
    openDetailsModal,
    closeDetailsModal,
  };
};

export default useTrackComplaintChat;
