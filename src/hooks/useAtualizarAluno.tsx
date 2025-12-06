import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Aluno";
import useApi from "./useApi";

const useAtualizarAluno = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (aluno: Aluno) =>
      api.put(`/alunos/${aluno.id}`, aluno).then((response) => response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alunos"], exact: false });
    },
  });
};

export default useAtualizarAluno;
