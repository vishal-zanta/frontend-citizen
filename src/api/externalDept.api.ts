import instance from "@/lib/axios";

export const postExternalComplaint = async (body: any) => {
  return instance.post("/external-grievances/citizen", body);
};

export const getExternalMasterData = (id: string, params: any = {}) => {
  return instance.get(`/external-grievances/citizen/master-data/${id}`, { params });
};

export const getExternalDistrictData = (id: string = "HEALTH") => {
  return instance.get(`/external-grievances/citizen/district-data/${id}`);
};

export const getExternalComplaints = async (params: any = {}) => {
  return instance.get("/external-grievances/citizen", { params });
};

export const getExternalComplaintsById = async (id: string) => {
  return instance.get(`/external-grievances/citizen/${id}`);
};
