import C from "./constants";
import { http } from "utils/http";
import { useQuery } from "react-query";
import { IUser } from "lib/interfaces/IUser";

const useGetUser = () =>
  useQuery(C.ALL, async (): Promise<IUser[]> => await http.get("/users"));

export { useGetUser };
