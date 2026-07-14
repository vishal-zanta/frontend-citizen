import instance from "@/lib/axios";

export const getDashboardAnalytics = () => {
  return instance.get("/citizen/dashboard-analytics");
};
