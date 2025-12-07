import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import type { Inscricao } from "../interfaces/Inscricao";

export const useRecuperarInscritosPorTurma = (turmaId?: number | null) => {
  const api = useApi<Inscricao>("/inscricoes");
  return useQuery({
    queryKey: ["inscritos", turmaId],
    queryFn: async () => {
      return await api.listar({ turmaId });
    },
    enabled: turmaId != null,
    staleTime: 10_000,
  });
};
