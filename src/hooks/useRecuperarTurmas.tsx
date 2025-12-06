import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";

const useRecuperarTurmas = ({ nome = "" }: { nome?: string }) => {
  const api = useApi();

  return useQuery({
    queryKey: ["turmas", nome],
    queryFn: async () => {
      const response = await api.get("/turmas", {
        params: nome && nome.trim() !== "" ? { nome } : {},
      });
      return response.data;
    },
    staleTime: 10_000,
  });
};

export default useRecuperarTurmas;
