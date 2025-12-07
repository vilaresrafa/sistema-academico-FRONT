import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";

const useRemoverAlunoPorId = () => {
  const api = useApi<any>("/alunos");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.remover(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alunos"],
      });
    },
  });
};
export default useRemoverAlunoPorId;
