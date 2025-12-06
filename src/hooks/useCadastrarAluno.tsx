import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Aluno";
import useApi from "./useApi";

const useCadastrarAluno = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (aluno: Aluno) => {
      const body: any = {
        nome: aluno.nome,
        slug: aluno.slug,
        email: aluno.email,
      };
      if (aluno.turma && (aluno.turma as any).id) {
        body.turma = { id: (aluno.turma as any).id };
      }
      return api.post("/alunos", body).then((response) => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alunos"],
      });
    },
  });
};

export default useCadastrarAluno;
