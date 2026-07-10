import instance from "@/lib/axios";


export const getSubservices = async (params = {}) => {
  return instance.get("/services/sub", { params });
};

export const getGrievenceNatures= async (params = {})=> {
    return instance.get("/options", { params });
}

export const getComplainSources = async(params = {})=> {
    return instance.get("/complaint-sources", {params});

}