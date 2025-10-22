import { useQuery } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Aluno";

const recuperarAlunosPorSlugTurma = async (slugTurma?: string): Promise<Aluno[]> => {
  const response = await fetch("http://localhost:8080/alunos" + (slugTurma ? "/turmas/" + slugTurma : ""));
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar o aluno com slugTurma = " + slugTurma + ". Status code: " + response.status
    );
  }
  return await response.json();
};

const useRecuperarAlunosPorSlugTurma = (slugTurma?: string) => {
  return useQuery({
    queryKey: slugTurma ? ["alunos", slugTurma] : ["alunos"],
    queryFn: () => recuperarAlunosPorSlugTurma(slugTurma),
    staleTime: 5_000
  });
};
export default useRecuperarAlunosPorSlugTurma;
