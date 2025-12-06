import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";

const useRecuperarAlunos = () => {
  const api = useApi();
  return useQuery({
    queryKey: ["alunos"],
    queryFn: async () => {
      const res = await api.get("/alunos");
      return res.data;
    },
    staleTime: 10_000,
  });
};
export default useRecuperarAlunos;
