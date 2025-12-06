import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";

const useRemoverAlunoPorId = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      api.delete(`/alunos/${id}`).then((response) => response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alunos"],
      });
    },
  });
};
export default useRemoverAlunoPorId;
