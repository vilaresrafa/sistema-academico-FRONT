import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import type { Turma } from "../interfaces/Turma";

export const useTurmasPorDisciplina = ({
  disciplinaId,
  nome = "",
}: {
  disciplinaId?: number | null;
  nome?: string;
}) => {
  const api = useApi();

  return useQuery<Turma[]>({
    queryKey: ["turmas", disciplinaId, nome],
    queryFn: async () => {
      const params: any = {};
      if (nome && nome.trim() !== "") params.nome = nome;
      if (disciplinaId) params.disciplinaId = disciplinaId;
      const res = await api.get("/turmas", { params });
      return res.data as Turma[];
    },
    enabled: disciplinaId != null && disciplinaId > 0,
    staleTime: 10_000,
  });
};
