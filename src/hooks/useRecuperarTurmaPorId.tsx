import { useQuery } from "@tanstack/react-query";

const recuperarTurmaPorId = async (id: number) => {
  const response = await fetch("http://localhost:8080/turmas/" + id);
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar a turma com id = " + id + ". Status code: " + response.status
    );
  }
  return await response.json();
};

const useRecuperarTurmaPorId = (id: number) => {
  return useQuery({
    queryKey: ["turmas", id],
    queryFn: () => recuperarTurmaPorId(id),
    staleTime: 10_000,
  });
};
export default useRecuperarTurmaPorId;
