import { useQuery } from "@tanstack/react-query";

const recuperarAlunosNaoInscritos = async (turmaId: number, nome: string) => {
  if (!turmaId) return [];

  let url = `http://localhost:8080/alunos/nao-inscritos?turmaId=${turmaId}`;

  if (nome.trim() !== "") {
    url += `&nome=${encodeURIComponent(nome)}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao recuperar alunos não inscritos");
  }

  return await response.json();
};

const useRecuperarAlunosNaoInscritos = (turmaId: number, nome: string) => {
  return useQuery({
    queryKey: ["alunos-nao-inscritos", turmaId, nome],
    queryFn: () => recuperarAlunosNaoInscritos(turmaId, nome),
    enabled: !!turmaId, // só busca quando houver turma
    staleTime: 5000,
  });
};

export default useRecuperarAlunosNaoInscritos;
