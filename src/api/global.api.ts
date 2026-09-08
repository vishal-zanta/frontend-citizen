import instance from "@/lib/axios";

export const getSubservices = async (params = {}) => {
  return instance.get("/services/sub", { params });
};

export const getGrievenceNatures = async (params = {}) => {
  return instance.get("/options", { params });
};

export const getComplainSources = async (params = {}) => {
  return instance.get("/complaint-sources", { params });
};

export const getDemographics = async (params = {}) => {
  return instance.get("/demography", { params });
};

export const getServices = async (params = {}) => {
  return instance.get("/services", { params });
};

export const getDepartments = async (params = {}) => {
  return instance.get("/departments", { params });
};

export const getConfig = async () => {
  return instance.get("/config");
};

export const getVisitorCount = async () => {
  return instance.get("/visitors/count");
};

export const saveVisitor = async (data = {}) => {
  return instance.post("/visitors/save", data);
};


