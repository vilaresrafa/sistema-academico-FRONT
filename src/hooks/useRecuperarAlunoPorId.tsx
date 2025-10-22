import { useQuery } from "@tanstack/react-query";

const recuperarAlunoPorId = async (id: number) => {
  const response = await fetch("http://localhost:8080/alunos/" + id);
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar o aluno com id = " + id + ". Status code: " + response.status
    );
  }
  return await response.json();
};

const useRecuperarAlunoPorId = (id: number, removido: boolean = false) => {
  return useQuery({
    queryKey: ["alunos", id],
    queryFn: () => recuperarAlunoPorId(id),
    enabled: !removido
  });
};
export default useRecuperarAlunoPorId;
