import { getComplaints, getComplaintById } from "@/api/complaints.api";
import { getComplainSources, getGrievenceNatures, getSubservices } from "@/api/global.api";

import { useQuery } from "@tanstack/react-query";

export const useGetGrievenceNatures = (
  keys = [],
  params = {},
  enabled = true,
) => {
  return useQuery({
    queryKey: ["grievance-nature", ...keys],
    queryFn: () => getGrievenceNatures(params),
    enabled: enabled,
  });
};

export const useGetSubservices = (keys = [], params = {}, enabled = true) => {
  return useQuery({
    queryKey: ["sub-services", ...keys],
    queryFn: () => getSubservices(params),
    enabled: enabled,
  });
};

export const useGetComplaints = (keys = [], params = {}, enabled = true) => {
  return useQuery({
    queryKey: ["grievance", ...keys],
    queryFn: () => getComplaints(params),
    enabled: enabled,
  });
};
export const useGetComplaintById = (keys = [], params :any = {}, enabled = true)  => {
  return useQuery({
    queryKey: ["grievance", params?._id ,  ...keys],
    queryFn: () => getComplaintById(params),
    enabled: enabled,
  });
};



// export const useGetComplaintResources = (keys = [], params = {}, enabled = true) => {
//   return useQuery({
//     queryKey: ["complain-sources", ...keys],
//     queryFn: () => getComplainSources(params),
//     enabled: enabled,
//   });
// };




