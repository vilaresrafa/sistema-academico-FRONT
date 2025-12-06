import { useQuery } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Aluno";
import useApi from "./useApi";

const useRecuperarAlunosPorSlugTurma = (slugTurma?: string) => {
  const api = useApi();
  return useQuery({
    queryKey: slugTurma ? ["alunos", slugTurma] : ["alunos"],
    queryFn: async () => {
      const path = slugTurma ? `/alunos/turmas/${slugTurma}` : `/alunos`;
      const res = await api.get(path);
      return res.data as Aluno[];
    },
    staleTime: 5_000,
  });
};
export default useRecuperarAlunosPorSlugTurma;
