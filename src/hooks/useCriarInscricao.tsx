import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";
import type { Inscricao } from "../interfaces/Inscricao";

type Payload = {
  dataHora: string;
  aluno: { id: number };
  turma: { id: number };
};

export const useCriarInscricao = () => {
  const api = useApi<Inscricao>("/inscricoes");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Payload) => api.criar(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["inscritos", variables.turma.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["alunos-nao-inscritos", variables.turma.id],
      });
    },
  });
};
