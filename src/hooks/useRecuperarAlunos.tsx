import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import type { Aluno } from "../interfaces/Aluno";

const useRecuperarAlunos = () => {
  const api = useApi<Aluno>("/alunos");
  return useQuery({
    queryKey: ["alunos"],
    queryFn: async () => {
      return await api.listar();
    },
    staleTime: 10_000,
  });
};
export default useRecuperarAlunos;
