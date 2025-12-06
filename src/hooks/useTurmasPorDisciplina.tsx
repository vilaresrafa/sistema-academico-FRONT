import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../util/api";
import type { Turma } from "../interfaces/Turma";

const fetchTurmas = async (disciplinaId?: number | null, nome = ""): Promise<Turma[]> => {
  let url = endpoints.turmas;
  const params: string[] = [];
  if (nome && nome.trim() !== "") params.push(`nome=${encodeURIComponent(nome)}`);
  if (disciplinaId) params.push(`disciplinaId=${disciplinaId}`);
  if (params.length) url += "?" + params.join("&");
  const r = await fetch(url);
  if (!r.ok) throw new Error("Erro ao carregar turmas");
  return r.json();
};

export const useTurmasPorDisciplina = ({ disciplinaId, nome = "" }: { disciplinaId?: number | null; nome?: string }) =>
  useQuery<Turma[]>({
    queryKey: ["turmas", disciplinaId, nome],
    queryFn: () => fetchTurmas(disciplinaId, nome),
    enabled: disciplinaId != null && disciplinaId > 0,
    staleTime: 10_000
  });
