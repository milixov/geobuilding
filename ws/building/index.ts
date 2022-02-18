import C from "./constants";
import { http } from "utils/http";
import { useQuery } from "react-query";
import { IBuilding } from "lib/interfaces/IBuilding";

const useGetBuildingsByUser = (username: string) =>
  useQuery(
    C.BY_USER,
    async (): Promise<IBuilding[]> =>
      await http.get(`/buildings?user=${username}`),
    { enabled: !!username, cacheTime: 0, staleTime: 0 }
  );

export { useGetBuildingsByUser };
