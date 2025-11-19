import { useQuery } from "@tanstack/react-query";

const recuperarDisciplinas = async () => {
  const response = await fetch("http://localhost:8080/disciplinas");
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar disciplinas. Status code: " + response.status
    );
  }
  return await response.json();
};

const useRecuperarDisciplinas = () => {
  return useQuery({
    queryKey: ["disciplinas"],
    queryFn: () => recuperarDisciplinas(),
    staleTime: 10_000,
  });
};
export default useRecuperarDisciplinas;
