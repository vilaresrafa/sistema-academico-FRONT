// src/hooks/useAtualizarAluno.ts
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import type { Aluno } from "../interfaces/Aluno";

const atualizarAlunoApi = async (aluno: Aluno) => {
  const response = await fetch(`http://localhost:8080/alunos/${aluno.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aluno),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar aluno. Status code: " + response.status);
  }
  return response.json();
};

const useAtualizarAluno = () => {
  return useMutation({
    mutationFn: (aluno: Aluno) => atualizarAlunoApi(aluno),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alunos"], exact: false });
    },
  });
};

export default useAtualizarAluno;
