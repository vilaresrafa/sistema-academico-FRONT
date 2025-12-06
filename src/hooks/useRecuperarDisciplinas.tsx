import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";

const useRecuperarDisciplinas = () => {
  const api = useApi();
  return useQuery({
    queryKey: ["disciplinas"],
    queryFn: async () => {
      const res = await api.get("/disciplinas");
      return res.data;
    },
    staleTime: 10_000,
  });
};
export default useRecuperarDisciplinas;
