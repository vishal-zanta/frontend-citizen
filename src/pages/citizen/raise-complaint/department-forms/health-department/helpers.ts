import moment from "moment";

export const getMappedMasterData = (res: any) => {
  const obj = {
    institutionName: (res?.["common-masters"]?.["InstitutionName"] || [])
      .filter((v: any) => v.active == true)
      .map((v: any) => ({ label: v.name, value: v.name })),
    institutionType: (res?.["common-masters"]?.["InstitutionType"] || [])
      .filter((v: any) => v.active == true)
      .map((v: any) => ({ label: v.name, value: v.name })),
    gender: (res?.["common-masters"]?.["GenderType"] || [])
      .filter((v: any) => v.active == true)
      .map((v: any) => ({ label: v.name, value: v.code })),
    complainantType: (res?.["common-masters"]?.["ComplainantType"] || [])
      .filter((v: any) => v.active == true)
      .map((v: any) => ({ label: v.name, value: v.name })),
    grievanceType: (res?.["RAINMAKER-PGR"]?.["ServiceDefs"] || [])
      .filter((v: any) => v.active == true)
      .map((v: any) => ({
        label: v.name,
        value: v.name,
        subType: v.serviceCode,
      })),
  };

  return obj;
};

export const getDistrictMappedData = (res: any) => {
  const nested =
    res?.MdmsRes?.["egov-location"]?.["TenantBoundary"]?.[1]?.boundary
      ?.children || [];
  const obj = {
    division: nested.map((v: any) => ({
      label: v.name,
      value: v.name,
      code: v.code,
    })),
    district: nested
      .map((division: any) => {
        return (division?.children || []).map((district: any) => ({
          label: district.name,
          value: district.name,
          division: division.name,
        }));
      })
      .flat(4),
    block: nested
      .map((division: any) => {
        return (division?.children || []).map((district: any) => {
          return (district?.children || []).map((block: any) => ({
            label: block.name,
            value: block.name,
            district: district.name,
            division: division.name,
          }));
        });
      })
      .flat(4),
    village: nested
      .map((division: any) => {
        return (division?.children || []).map((district: any) => {
          return (district?.children || []).map((block: any) => {
            return (block?.children || []).map((village: any) => ({
              label: village.name,
              value: village.name,
              block: block.name,
              district: district.name,
              division: division.name,
            }));
          });
        });
      })
      .flat(5),
  };

  return obj;
};

export const getFinalFormData = (
  data: any,
  fields: any,
  departmentCode = "HEALTH",
) => {
  const updatedData = { ...data };

  updatedData.dateOfIncident = String(
    moment(updatedData.dateOfIncident).valueOf(),
  );
  updatedData.serviceCode = (fields?.grievanceType || []).find(
    (o: any) => o.value === data?.grievanceType,
  )?.subType;
  const division = (fields?.district || []).find(
    (o: any) => o.value === data?.address?.district,
  )?.division;
  const divisionName =
    (fields?.division || []).find((o: any) => o.value === division)?.label ||
    "";

  updatedData.address.division = String(divisionName).toUpperCase();
  updatedData.address.region = String(divisionName).toUpperCase();
  updatedData.address.locality = updatedData.address.locality || {};
  updatedData.address.locality.code = String(divisionName).toUpperCase();
  updatedData.address.locality.name = String(divisionName);

  const payload = {
    departmentCode,
    mobile: updatedData.citizen?.mobileNumber,
    departmentPayload: updatedData,
  };
  return payload;
};
