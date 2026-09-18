import React from "react";
import HealthDepartmentForm from "@/pages/citizen/raise-complaint/department-forms/health-department";
import EducationDeptForm from "@/pages/citizen/raise-complaint/department-forms/education-department";
import FoodDepartmentForm from "@/pages/citizen/raise-complaint/department-forms/food-department";
import HealthDepartmentDetailView from "@/pages/citizen/track-complaint/department-views/health-department";
import EducationDepartmentDetailView from "@/pages/citizen/track-complaint/department-views/education-department";
import FoodDeptView from "@/pages/citizen/track-complaint/department-views/food-department";

export interface ExternalDepartmentRowData {
  complaintNumber?: string;
  nature?: string;
  district?: string;
  department?: string;
  service?: string;
  status?: string;
  raisedOn?: string | Date;
}

export interface ExternalDepartmentItem {
  id: number | string;
  name: string;
  nameHindi?: string;
  key: string;
  isExternal: boolean;
  isHide?: boolean;
  component: React.ComponentType<any> | null;
  listComponent?: React.ComponentType<any> | null;
  viewComponent?: React.ComponentType<any> | null;
  getTableRowData?: (
    data: any,
    t?: (en: string, hi: string) => string,
    masterData?: any,
  ) => ExternalDepartmentRowData;
}

export const departmentsList: ExternalDepartmentItem[] = [
  {
    id: 1,
    name: "CM Helpline",
    nameHindi: "मुख्यमंत्री हेल्पलाइन",
    key: "cm-helpline",
    isExternal: true,
    isHide: true,
    component: null,
    listComponent: null,
    viewComponent: null,
  },
  {
    id: 2,
    name: "Health Department",
    nameHindi: "स्वास्थ्य विभाग",
    key: "HEALTH",
    isExternal: true,
    component: HealthDepartmentForm,
    listComponent: null,
    viewComponent: HealthDepartmentDetailView,
    getTableRowData: (data: any, t?: any) => {
      const payload = data?.departmentPayload || {};
      const address = payload?.address || {};
      return {
        complaintNumber: data?.externalComplaintId || data?._id || "-",
        nature: payload?.type || (t ? t("Grievance", "शिकायत") : "COMPLAINT"),
        district: address?.district || "-",
        department: t
          ? t("Health Department", "स्वास्थ्य विभाग")
          : "Health Department",
        service: payload?.grievanceType || payload?.serviceCode || "-",
        status: data?.status || "PENDING",
        raisedOn: data?.createdAt || payload?.dateOfIncident,
      };
    },
  },
  {
    id: 3,
    name: "Education Department",
    nameHindi: "शिक्षा विभाग",
    key: "EDUCATION",
    isExternal: true,
    component: EducationDeptForm,
    listComponent: null,
    viewComponent: EducationDepartmentDetailView,
    getTableRowData: (data: any, t?: any, masterData?: any) => {
      const payload = data?.departmentPayload || {};
      const location = payload?.location || {};
      const categoryMatch = masterData?.categoryId?.find(
        (c: any) => String(c.value) === String(payload?.categoryId),
      );
      const districtMatch = masterData?.districtCode?.find(
        (d: any) => String(d.value) === String(location?.districtCode),
      );

      const categoryLabel =
        categoryMatch?.label ||
        payload?.categoryOther ||
        (payload?.categoryId ? `Category ${payload?.categoryId}` : "-");
      const districtLabel =
        districtMatch?.label ||
        (location?.districtCode ? String(location?.districtCode) : "-");

      return {
        complaintNumber:
          data?.externalComplaintId || payload?.externalRef || data?._id || "-",
        nature: payload?.type || (t ? t("Grievance", "शिकायत") : "COMPLAINT"),
        district: districtLabel,
        department: t
          ? t("Education Department", "शिक्षा विभाग")
          : "Education Department",
        service: categoryLabel,
        status: data?.status || "PENDING",
        raisedOn:  data?.createdAt,
      };
    },
  },
  {
    id: 4,
    name: "Food & Consumer Protection Department",
    nameHindi: "खाद्य एवं उपभोक्ता संरक्षण विभाग",
    key: "FOOD",
    isExternal: true,
    component: FoodDepartmentForm,
    listComponent: null,
    viewComponent: FoodDeptView,
    getTableRowData: (data: any, t?: any, masterData?: any) => {
      const payload = data?.departmentPayload || {};
      const typeMatch = masterData?.type?.find(
        (o: any) => String(o.value) === String(payload?.typeId),
      );
      const categoryMatch = masterData?.category?.find(
        (o: any) => String(o.value) === String(payload?.categoryId),
      );
      const districtMatch = masterData?.district?.find(
        (d: any) => String(d.value) === String(payload?.districtId),
      );

      const serviceLabel =
        typeMatch?.label ||
        categoryMatch?.label ||
        (payload?.typeId ? `Type ${payload?.typeId}` : "-");
      const districtLabel =
        districtMatch?.label ||
        (payload?.districtId
          ? String(payload?.districtId)
          : payload?.address || "-");

      return {
        complaintNumber:
          data?.externalComplaintId || payload?.grievanceID || data?._id || "-",
        nature: t ? t("Grievance", "शिकायत") : "COMPLAINT",
        district: districtLabel,
        department: t
          ? t(
              "Food & Consumer Protection Department",
              "खाद्य एवं उपभोक्ता संरक्षण विभाग",
            )
          : "Food & Consumer Protection Department",
        service: serviceLabel,
        status: data?.status || payload?.status || "PENDING",
        raisedOn: data?.createdAt || data?.updatedAt,
      };
    },
  },
];

export const isExternalDepartment = (keyOrId: string | number) => {
  return departmentsList.some(
    (dept) => !dept.isHide && (dept.key === keyOrId || dept.id === keyOrId),
  );
};

export const getExternalDepartment = (keyOrId: string | number) => {
  return (
    departmentsList.find(
      (dept) => dept.key === keyOrId || dept.id === keyOrId,
    ) || null
  );
};
