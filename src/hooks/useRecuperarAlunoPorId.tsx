import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";

const useRecuperarAlunoPorId = (id: number, removido: boolean = false) => {
  const api = useApi();
  return useQuery({
    queryKey: ["alunos", id],
    queryFn: async () => {
      const res = await api.get(`/alunos/${id}`);
      return res.data;
    },
    enabled: !removido,
  });
};
export default useRecuperarAlunoPorId;
