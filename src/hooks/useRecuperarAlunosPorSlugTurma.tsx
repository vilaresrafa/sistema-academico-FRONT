import { useQuery } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Aluno";
import useApi from "./useApi";

const useRecuperarAlunosPorSlugTurma = (slugTurma?: string) => {
  const endpoint = slugTurma ? `/alunos/turmas/${slugTurma}` : "/alunos";
  const api = useApi<Aluno>(endpoint);
  return useQuery({
    queryKey: slugTurma ? ["alunos", slugTurma] : ["alunos"],
    queryFn: async () => {
      return await api.listar();
    },
    staleTime: 5_000,
  });
};
export default useRecuperarAlunosPorSlugTurma;
