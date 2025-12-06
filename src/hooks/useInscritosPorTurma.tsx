import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import type { Inscricao } from "../interfaces/Inscricao";

export const useInscritosPorTurma = (turmaId?: number | null) => {
  const api = useApi();
  return useQuery<Inscricao[]>({
    queryKey: ["inscritos", turmaId],
    queryFn: async () => {
      const res = await api.get("/inscricoes", { params: { turmaId } });
      return res.data as Inscricao[];
    },
    enabled: turmaId != null && turmaId > 0,
    staleTime: 10_000,
  });
};
