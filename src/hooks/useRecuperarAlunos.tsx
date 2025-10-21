import { useQuery } from "@tanstack/react-query";

const recuperarAlunos = async () => {
  const response = await fetch("http://localhost:8080/alunos");
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar alunos. Status code: " + response.status
    );
  }
  return await response.json();
};

const useRecuperarAlunos = () => {
  return useQuery({
    queryKey: ["alunos"],
    queryFn: () => recuperarAlunos(),
    staleTime: 10_000,
  });
};
export default useRecuperarAlunos;
