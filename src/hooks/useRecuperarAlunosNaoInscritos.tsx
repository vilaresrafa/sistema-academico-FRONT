import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../util/api";
import type { Aluno } from "../interfaces/Aluno";

const fetchAlunosNaoInscritos = async (turmaId: number, nome = ""): Promise<Aluno[]> => {
  let url = `${endpoints.alunosNaoInscritos}?turmaId=${turmaId}`;
  if (nome && nome.trim() !== "") url += `&nome=${encodeURIComponent(nome)}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("Erro ao carregar alunos não inscritos");
  return r.json();
};

export const useAlunosNaoInscritos = (turmaId?: number | null, nome = "") =>
  useQuery<Aluno[]>({
    queryKey: ["alunos-nao-inscritos", turmaId, nome],
    queryFn: () => fetchAlunosNaoInscritos(turmaId!, nome),
    enabled: turmaId != null && turmaId > 0,
    staleTime: 10_000
  });
