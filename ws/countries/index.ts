import C from "./constants";
import { http } from "utils/http";
import { useQuery } from "react-query";
import { ICountry } from "lib/interfaces/ICountry";

const useGetCountiryById = (id: string) =>
  useQuery(
    C.BY_ID,
    async (): Promise<ICountry[]> => await http.get(`/countries?id=${id}`),
    { enabled: !!id, cacheTime: 0, staleTime: 0 }
  );

export { useGetCountiryById };
