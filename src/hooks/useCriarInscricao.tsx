import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";

type Payload = {
  dataHora: string;
  aluno: { id: number };
  turma: { id: number };
};

const criar = async (payload: Payload, api: any) => {
  const r = await api.post("/inscricoes", payload);
  return r.data;
};

export const useCriarInscricao = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Payload) => criar(payload, api),
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
