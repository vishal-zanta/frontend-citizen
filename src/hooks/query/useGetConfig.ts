import { useQuery } from "@tanstack/react-query";
import { getConfig } from "@/api/global.api";

export const useGetConfig = (keys: any[] = [], enabled = true) => {
  return useQuery({
    queryKey: ["config", ...keys],
    queryFn: () => getConfig(),
    enabled: enabled,
  });
};
