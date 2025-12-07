import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import type { Disciplina } from "../interfaces/Disciplina";

export const useDisciplinas = () => {
  const api = useApi<Disciplina>("/disciplinas");
  return useQuery<Disciplina[]>({
    queryKey: ["disciplinas"],
    queryFn: async () => {
      return await api.listar();
    },
    staleTime: 10_000,
  });
};

export default useDisciplinas;
