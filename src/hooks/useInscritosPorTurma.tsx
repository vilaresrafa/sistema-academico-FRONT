import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../util/api";
import type { Inscricao } from "../interfaces/Inscricao";

const fetchInscritos = async (turmaId: number): Promise<Inscricao[]> => {
  const url = `${endpoints.inscricoes}?turmaId=${turmaId}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("Erro ao carregar inscritos");
  return r.json();
};

export const useInscritosPorTurma = (turmaId?: number | null) =>
  useQuery<Inscricao[]>({
    queryKey: ["inscritos", turmaId],
    queryFn: () => fetchInscritos(turmaId!),
    enabled: turmaId != null && turmaId > 0,
    staleTime: 10_000
  });
