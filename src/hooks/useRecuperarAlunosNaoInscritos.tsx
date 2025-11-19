import { useQuery } from "@tanstack/react-query";

const recuperarAlunosNaoInscritos = async (turmaId: number, nome: string) => {
  let url = `http://localhost:8080/alunos/nao-inscritos?turmaId=${turmaId}`;

  if (nome && nome.trim() !== "") {
    url += `&nome=${encodeURIComponent(nome)}`;
  }

  const resp = await fetch(url);
  if (!resp.ok) throw new Error("Erro ao carregar alunos");
  return resp.json();
};

export const useRecuperarAlunosNaoInscritos = (
  turmaId?: number | null,
  nome: string = ""
) => {
  return useQuery({
    queryKey: ["alunos-nao-inscritos", turmaId, nome],
    queryFn: () => recuperarAlunosNaoInscritos(turmaId!, nome),
    enabled: turmaId != null && turmaId > 0, // <--- AQUI
    staleTime: 10_000,
  });
};
