import moment from "moment";
import React, { useEffect, useState } from "react";
import ChatMessageInput from "../../components/ChatMessageInput";
import ChatCaptchaPrompt from "../../components/ChatCaptchaPrompt";
import ChatComplaintCard from "../../components/ChatComplaintCard";
import ChatComplaintDetailsModal from "../../components/ChatComplaintDetailsModal";
import { getPublicComplaintStatus } from "@/api/complaints.api";

const initialFormState = {
  complaintId: "",
  captcha: "",
  captchaId: "",
  captchaSvg: "",
};

const useTrackQuestions = (
  { handleSendMessage, appendBotMessage }: any,
  isFlowEnabled = false,
) => {
  const [currentBotQuestion, setCurrentBotQuestion] = useState(0);
  const [formState, setFormState] = useState(initialFormState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);

  const loaderMessage = {
    id: "loader",
    sender: "bot" as const,
    text: "",
    timestamp: moment(),
    Component: (
      <div className="flex items-center gap-1.5 py-1 px-1">
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
      </div>
    ),
  };

  async function getComplaintDetails(idToTrack?: string, captchaToVerify?: string) {
    const id = (idToTrack || formState.complaintId).trim();
    const captcha = (captchaToVerify || formState.captcha).trim();

    let formattedId = id;
    const digitsOnly = id.replace(/\D/g, "");
    if (
      id.toUpperCase().startsWith("BR-") ||
      (id.includes("-") && digitsOnly.length >= 6)
    ) {
      formattedId = id.toUpperCase().startsWith("BR-")
        ? id.toUpperCase()
        : `BR-${id.replace(/^BR-?/i, "")}`;
    }

    try {
      const res = await getPublicComplaintStatus({
        complaintId: formattedId,
        params: {
          captchaId: formState.captchaId,
          captchaValue: captcha,
        },
      });

      const data = res?.data?.data || res?.data;
      const complaint = {
        ...data,
        grievanceId: data?.grievanceId || formattedId,
        _id: data?._id || data?.id || formattedId,
      };

      setSelectedComplaint(complaint);
      setCurrentBotQuestion(2); // done with questions, hide input

      // On success: replace loader with complaint card
      appendBotMessage({
        id: `track-result-${Date.now()}`,
        sender: "bot",
        text: "✅ We found your complaint details! Here is the summary:",
        textHindi: "✅ हमें आपकी शिकायत का विवरण मिल गया है!",
        timestamp: moment(),
        Component: (
          <ChatComplaintCard
            complaint={complaint}
            onViewFullDetails={() => {
              setSelectedComplaint(complaint);
              setIsModalOpen(true);
            }}
            onTrackAnother={() => {
              setCurrentBotQuestion(0);
              setFormState(initialFormState);
              // appendBotMessage({
              //   id: "track-bot-1",
              //   sender: "bot",
              //   text: "Please enter your Complaint ID (e.g. BR-2026-000031):",
              //   textHindi: "कृपया अपनी शिकायत आईडी दर्ज करें (उदाहरण: बीआर-2026-000031):",
              //   timestamp: moment(),
              //   Component: null,
              // });
            }}
          />
        ),
      });
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to find complaint or invalid security code. Please check and try again.";

      // Reset captchaId and captcha on failure
      setFormState((prev) => ({
        ...prev,
        captchaId: "",
        captcha: "",
      }));

      // On error: replace loader with error message and retry button
      appendBotMessage({
        id: `track-error-${Date.now()}`,
        sender: "bot",
        text: `⚠️ ${errMsg}`,
        textHindi: `⚠️ ${errMsg}`,
        timestamp: moment(),
        Component: (
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => {
                setCurrentBotQuestion(0);
                setFormState(initialFormState);
                // appendBotMessage({
                //   id: "track-bot-1",
                //   sender: "bot",
                //   text: "Please enter your Complaint ID (e.g. BR-2026-000031):",
                //   textHindi: "कृपया अपनी शिकायत आईडी दर्ज करें (उदाहरण: बीआर-2026-000031):",
                //   timestamp: moment(),
                //   Component: null,
                // });
              }}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs active:scale-95 transition-all"
            >
              🔄 Try Again
            </button>
          </div>
        ),
      });
    }
  }

  const botQuestions = [
    {
      id: "track-bot-1",
      sender: "bot" as const,
      text: "Please enter your Complaint ID (e.g. BR-2026-000031):",
      textHindi: "कृपया अपनी शिकायत आईडी दर्ज करें (उदाहरण: बीआर-2026-000031):",
      timestamp: moment(),
      Component: null,
      InputComponent: ChatMessageInput,
      InputProps: {
        onChange: (e: any) =>
          setFormState((prev) => ({ ...prev, complaintId: e.target.value })),
        value: formState.complaintId,
        onSend: (value: string) => {
          handleSendMessage(value);
          setFormState((prev) => ({ ...prev, complaintId: value }));
          setCurrentBotQuestion(1);
        },
        placeholder: "BR-2026-000031",
          required: true

      },
    },
    {
      id: "track-bot-2",
      sender: "bot" as const,
      text: "Please enter the security code shown below:",
      textHindi: "कृपया नीचे दिखाया गया सुरक्षा कोड दर्ज करें:",
      timestamp: moment(),
      Component: (
        <ChatCaptchaPrompt
          svgContent={formState.captchaSvg}
          onCaptchaLoaded={(cid, svg) => {
            setFormState((prev) => ({
              ...prev,
              captchaId: cid,
              captchaSvg: svg,
              captcha: "",
            }));
          }}
        />
      ),
      InputComponent: ChatMessageInput,
      InputProps: {
        onChange: (e: any) =>
          setFormState((prev) => ({ ...prev, captcha: e.target.value })),
        value: formState.captcha,
        onSend: (value: string) => {
          handleSendMessage(value);
          setFormState((prev) => ({ ...prev, captcha: value }));
          appendBotMessage(loaderMessage);
          getComplaintDetails(formState.complaintId, value);
        },
        placeholder: "Enter security code...",
          required: true

      },
    },
    {
      id: "track-bot-3",
      sender: "bot" as const,
      text: "",
      textHindi: "",
      timestamp: moment(),
      Component: null,
      InputComponent: null,
      InputProps: {},
    },
  ];

  const activeBotQuestion = botQuestions[currentBotQuestion];

  useEffect(() => {
    if (isFlowEnabled && activeBotQuestion && currentBotQuestion < 2) {
      appendBotMessage({
        id: activeBotQuestion.id,
        sender: activeBotQuestion.sender,
        text: activeBotQuestion.text,
        textHindi: activeBotQuestion.textHindi,
        timestamp: moment(),
        Component: activeBotQuestion.Component,
      });
    }
  }, [isFlowEnabled, currentBotQuestion]);

  useEffect(() => {
    if (!isFlowEnabled) {
      setCurrentBotQuestion(0);
      setFormState(initialFormState);
      setIsModalOpen(false);
      setSelectedComplaint(null);
    }
  }, [isFlowEnabled]);

  return {
    InputComponent: isFlowEnabled ? activeBotQuestion?.InputComponent : null,
    inputProps: isFlowEnabled ? activeBotQuestion?.InputProps : null,
    currentBotQuestion,
    setCurrentBotQuestion,
    formState,
    setFormState,
    isModalOpen,
    setIsModalOpen,
    selectedComplaint,
    ModalComponent: (
      <ChatComplaintDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        complaint={selectedComplaint}
      />
    ),
  };
};

export default useTrackQuestions;
