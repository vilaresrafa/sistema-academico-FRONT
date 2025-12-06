import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import type { Aluno } from "../interfaces/Aluno";

const cadastrarAluno = async (aluno: Aluno) => {
  const response = await fetch("http://localhost:8080/alunos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: aluno.nome,
      slug: aluno.slug,
      email: aluno.email,
      // ❗ NÃO ENVIE TURMA AQUI
      // turma: null
      // turma: {}
      // turma: aluno.turma
    }),
  });

  if (!response.ok) {
    const erro = await response.text();
    console.error("Erro ao cadastrar aluno:", erro);
    throw new Error("Falha ao cadastrar aluno");
  }

  return response.json();
};

const useCadastrarAluno = () => {
  return useMutation({
    mutationFn: cadastrarAluno,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alunos"],
      });
    },
  });
};

export default useCadastrarAluno;
