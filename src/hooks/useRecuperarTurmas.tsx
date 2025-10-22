import { useQuery } from "@tanstack/react-query";
/*
const recuperarTurmas = async () => {
  const response = await fetch("http://localhost:8080/turmas");
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
    queryFn: () => recuperarTurmas(),
    staleTime: 10_000,
  });
};
export default useRecuperarTurmas;

*/

const recuperarTurmas = async (nome?: string) => {
  let url = "http://localhost:8080/turmas";
  if (nome && nome.trim() !== "") {
    // ✅ usa crase e template literal corretamente
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
    // ✅ chave muda conforme o filtro
    queryKey: ["turmas", nome],
    // ✅ passa o nome para a função de busca
    queryFn: () => recuperarTurmas(nome),
    staleTime: 10_000,
  });
};

export default useRecuperarTurmas;
