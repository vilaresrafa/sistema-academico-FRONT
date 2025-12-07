import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import type { Inscricao } from "../interfaces/Inscricao";

export const useInscritosPorTurma = (turmaId?: number | null) => {
  const api = useApi<Inscricao>("/inscricoes");
  return useQuery<Inscricao[]>({
    queryKey: ["inscritos", turmaId],
    queryFn: async () => {
      return await api.listar({ turmaId });
    },
    enabled: turmaId != null && turmaId > 0,
    staleTime: 10_000,
  });
};
