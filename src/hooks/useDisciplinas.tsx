import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../util/api";
import type { Disciplina } from "../interfaces/Disciplina";

const fetchDisciplinas = async (): Promise<Disciplina[]> => {
  const r = await fetch(endpoints.disciplinas);
  if (!r.ok) throw new Error("Erro ao carregar disciplinas");
  return r.json();
};

export const useDisciplinas = () =>
  useQuery<Disciplina[]>({ queryKey: ["disciplinas"], queryFn: fetchDisciplinas, staleTime: 10_000 });
