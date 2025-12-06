import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import type { Disciplina } from "../interfaces/Disciplina";

export const useDisciplinas = () => {
  const api = useApi();
  return useQuery<Disciplina[]>({
    queryKey: ["disciplinas"],
    queryFn: async () => {
      const res = await api.get("/disciplinas");
      return res.data as Disciplina[];
    },
    staleTime: 10_000,
  });
};

export default useDisciplinas;
