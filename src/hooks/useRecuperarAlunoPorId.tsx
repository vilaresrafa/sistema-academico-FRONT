import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import type { Aluno } from "../interfaces/Aluno";

const useRecuperarAlunoPorId = (id: number, removido: boolean = false) => {
  const api = useApi<Aluno>("/alunos");
  return useQuery({
    queryKey: ["alunos", id],
    queryFn: async () => {
      return await api.recuperar(id);
    },
    enabled: !removido,
  });
};
export default useRecuperarAlunoPorId;
