import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import type { Aluno } from "../interfaces/Aluno";

export const useAlunosNaoInscritos = (turmaId?: number | null, nome = "") => {
  const api = useApi<Aluno>("/alunos/nao-inscritos");
  return useQuery<Aluno[]>({
    queryKey: ["alunos-nao-inscritos", turmaId, nome],
    queryFn: async () => {
      const params: any = { turmaId };
      if (nome && nome.trim() !== "") params.nome = nome;
      return await api.listar(params);
    },
    enabled: turmaId != null && turmaId > 0,
    staleTime: 10_000,
  });
};
