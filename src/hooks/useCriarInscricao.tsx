import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import { endpoints } from "../util/api";

type Payload = {
  dataHora: string;
  aluno: { id: number };
  turma: { id: number };
};

const criar = async (payload: Payload) => {
  const r = await fetch(endpoints.inscricoes, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!r.ok) {
    const txt = await r.text();
    throw new Error("Erro ao criar inscrição: " + txt);
  }
  return r.json();
};

export const useCriarInscricao = () =>
  useMutation({
    mutationFn: (payload: Payload) => criar(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["inscritos", variables.turma.id] });
      queryClient.invalidateQueries({ queryKey: ["alunos-nao-inscritos", variables.turma.id] });
    }
  });
