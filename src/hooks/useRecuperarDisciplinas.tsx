import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import type { Disciplina } from "../interfaces/Disciplina";

const useRecuperarDisciplinas = () => {
  const api = useApi<Disciplina>("/disciplinas");
  return useQuery({
    queryKey: ["disciplinas"],
    queryFn: async () => {
      return await api.listar();
    },
    staleTime: 10_000,
  });
};
export default useRecuperarDisciplinas;
