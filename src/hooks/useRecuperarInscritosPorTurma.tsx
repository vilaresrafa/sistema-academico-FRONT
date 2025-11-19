import { useQuery } from "@tanstack/react-query";
import type { Inscricao } from "../interfaces/Inscricao";

const recuperarInscritos = async (turmaId: number): Promise<Inscricao[]> => {
  const resp = await fetch(`http://localhost:8080/inscricoes?turmaId=${turmaId}`);
  if (!resp.ok) throw new Error("Erro ao recuperar inscritos");
  return resp.json();
};

export const useRecuperarInscritosPorTurma = (turmaId?: number | null) => {
  return useQuery({
    queryKey: ["inscritos", turmaId],
    queryFn: () => recuperarInscritos(turmaId!),
    enabled: turmaId != null,
    staleTime: 10_000,
  });
};
