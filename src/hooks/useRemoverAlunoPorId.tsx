import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

const removerAlunoPorId = async (id: number) => {
  const response = await fetch("http://localhost:8080/alunos/" + id, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao remover o aluno com id = " +
        id +
        ". Status code: " +
        response.status
    );
  }
  // sem: return await response.json() pois o back-end retorna void.
};

const useRemoverAlunoPorId = () => {
  return useMutation({
    mutationFn: (id: number) => removerAlunoPorId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alunos"],
      });
    },
  });
};
export default useRemoverAlunoPorId;
