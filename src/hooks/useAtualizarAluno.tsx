import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Aluno";
import useApi from "./useApi";

const useAtualizarAluno = () => {
  const api = useApi<Aluno>("/alunos");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (aluno: Aluno) => api.alterar(aluno, (aluno as any).id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alunos"], exact: false });
    },
  });
};

export default useAtualizarAluno;
