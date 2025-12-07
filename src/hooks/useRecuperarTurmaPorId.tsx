import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import type { Turma } from "../interfaces/Turma";

const useRecuperarTurmaPorId = (id: number) => {
  const api = useApi<Turma>("/turmas");
  return useQuery({
    queryKey: ["turmas", id],
    queryFn: async () => {
      return await api.recuperar(id);
    },
    staleTime: 10_000,
  });
};
export default useRecuperarTurmaPorId;
