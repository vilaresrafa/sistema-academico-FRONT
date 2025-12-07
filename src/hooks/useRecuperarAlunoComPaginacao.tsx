import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ResultadoPaginado } from "../interfaces/ResultadoPaginado";
import type { Aluno } from "../interfaces/Aluno";
import useApi from "./useApi";

interface QueryString {
  pagina: string;
  tamanho: string;
  nome: string;
}
const useRecuperarAlunosComPaginacao = (queryString: QueryString) => {
  const api = useApi<Aluno>("/alunos");
  return useQuery({
    queryKey: ["alunos", "paginacao", queryString],
    queryFn: () => api.recuperarComPaginacao(queryString),
    placeholderData: keepPreviousData,
  });
};
export default useRecuperarAlunosComPaginacao;
