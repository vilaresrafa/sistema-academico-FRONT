import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";

const useRecuperarTurmaPorId = (id: number) => {
  const api = useApi();
  return useQuery({
    queryKey: ["turmas", id],
    queryFn: async () => {
      const res = await api.get(`/turmas/${id}`);
      return res.data;
    },
    staleTime: 10_000,
  });
};
export default useRecuperarTurmaPorId;
