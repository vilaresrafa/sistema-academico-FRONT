import { useQuery } from "@tanstack/react-query";

const recuperarTurmas = async (nome?: string) => {
  let url = "http://localhost:8080/turmas";
  if (nome && nome.trim() !== "") {
    url += `?nome=${encodeURIComponent(nome)}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar turmas. Status code: " + response.status
    );
  }

  return await response.json();
};

const useRecuperarTurmas = ({ nome = "" }: { nome?: string }) => {
  return useQuery({
    queryKey: ["turmas", nome],
    queryFn: () => recuperarTurmas(nome),
    staleTime: 10_000,
  });
};

export default useRecuperarTurmas;