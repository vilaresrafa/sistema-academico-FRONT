import { useMutation } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Aluno"

const efetuarInscricao = async (aluno: Aluno) => {
  const response = await fetch("http://localhost:8080/inscricoes", {
    method: "POST",
    headers: {
        "Content-type": "Application/json"
    },
    body: JSON.stringify(aluno)
  });
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao efetuar a inscrição. Status code: " +
        response.status
    );
  }
  return await response.json();
};

const useEfetuarInscricao = () => {
  return useMutation({
    mutationFn: (aluno: Aluno) => efetuarInscricao(aluno),
  });
};
export default useEfetuarInscricao;
