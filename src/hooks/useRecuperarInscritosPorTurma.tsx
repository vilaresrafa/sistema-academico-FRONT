import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import type { Inscricao } from "../interfaces/Inscricao";

export const useRecuperarInscritosPorTurma = (turmaId?: number | null) => {
  const api = useApi();
  return useQuery({
    queryKey: ["inscritos", turmaId],
    queryFn: async () => {
      const res = await api.get("/inscricoes", { params: { turmaId } });
      return res.data as Inscricao[];
    },
    enabled: turmaId != null,
    staleTime: 10_000,
  });
};
