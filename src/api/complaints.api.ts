import instance from "@/lib/axios";

export const getComplaints = (params = {}) => {
  return instance.get("/grievances/citizen", { params });
};
export const getComplaintById = (params: any) => {
  return instance.get(`/grievances/citizen/${params?._id}`, { params });
};

export const postComplaints = (data: any) => {
  return instance.post("/grievances/citizen", data);
};

export const postComplaintFeedback = ({
  id,
  data,
}: {
  id: string;
  data: { rating: number; feedbackText: string };
}) => {
  return instance.post(`/grievances/citizen/${id}/feedback`, data);
};

export const reopenComplaint = ({
  id,
  data,
}: {
  id: string;
  data: { reOpenReason: string };
}) => {
  return instance.post(`/grievances/citizen/${id}/reopen`, data);
};

export const resolveComplaint = ({
  id,
  data,
}: {
  id: string;
  data?: { remarks?: string };
}) => {
  return instance
    .post(`/grievances/citizen/${id}/resolve`, data || {})
    .catch((err) => {
      if (err?.response?.status === 404) {
        return instance.post(`/grievance/citizen/${id}/resolve`, data || {});
      }
      throw err;
    });
};

export const getPublicComplaintStatus = ({
  complaintId,
  params,
}: {
  complaintId: string;
  params: { captchaId: string; captchaValue: string };
}) => {
  return instance.get(`/grievances/citizen/public/status/${complaintId}`, {
    params,
  });
};
