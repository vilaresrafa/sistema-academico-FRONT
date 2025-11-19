import { useQuery } from "@tanstack/react-query";

const recuperarTurmas = async (nome?: string, disciplinaId?: number | null) => {
  let url = "http://localhost:8080/turmas";

  const params: string[] = [];

  if (nome && nome.trim() !== "") {
    params.push(`nome=${encodeURIComponent(nome)}`);
  }

  if (disciplinaId) {
    params.push(`disciplinaId=${disciplinaId}`);
  }

  if (params.length > 0) {
    url += "?" + params.join("&");
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      "Erro ao recuperar turmas. Status code: " + response.status
    );
  }

  return await response.json();
};

const useRecuperarTurmas = ({
  nome = "",
  disciplinaId = null,
}: {
  nome?: string;
  disciplinaId?: number | null;
}) => {
  return useQuery({
    queryKey: ["turmas", nome, disciplinaId],
    queryFn: () => recuperarTurmas(nome, disciplinaId),
    staleTime: 10_000,
    enabled: disciplinaId != undefined, // Só busca se tiver disciplina selecionada
  });
};

export default useRecuperarTurmas;
