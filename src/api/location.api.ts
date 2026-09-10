import instance from "@/lib/axios";

// 1) GET divisions: /address/divisions
export const getDivisions = async (params = {}) => {
  return instance.get("/address/divisions", { params });
};

// 2) GET districts by division: /address/divisions/:divisionId/districts
export const getDistrictsByDivision = async (
  divisionId: string,
  params = {},
) => {
  return instance.get(`/address/divisions/${divisionId}/districts`, { params });
};

// 3) GET subdivisions by district: /address/districts/:districtId/subdivisions
export const getSubdivisionsByDistrict = async (
  districtId: string,
  params = {},
) => {
  return instance.get(`/address/districts/${districtId}/subdivisions`, {
    params,
  });
};

// 4) GET blocks by subdivision: /address/subdivisions/:subdivisionId/blocks
export const getBlocksBySubdivision = async (
  subdivisionId: string,
  params = {},
) => {
  return instance.get(`/address/subdivisions/${subdivisionId}/blocks`, {
    params,
  });
};
