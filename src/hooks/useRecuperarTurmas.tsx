import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import type { Turma } from "../interfaces/Turma";

const useRecuperarTurmas = ({ nome = "" }: { nome?: string }) => {
  const api = useApi<Turma>("/turmas");

  return useQuery({
    queryKey: ["turmas", nome],
    queryFn: async () => {
      const params = nome && nome.trim() !== "" ? { nome } : {};
      return await api.listar(params);
    },
    staleTime: 10_000,
  });
};

export default useRecuperarTurmas;
