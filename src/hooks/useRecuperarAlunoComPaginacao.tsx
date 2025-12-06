import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ResultadoPaginado } from "../interfaces/ResultadoPaginado";
import type { Aluno } from "../interfaces/Aluno";
import useApi from "./useApi";

const recuperarAlunosComPaginacao = async (
  queryString: QueryString,
  api: any
): Promise<ResultadoPaginado<Aluno>> => {
  const response = await api.get("/alunos/paginacao", {
    params: { ...queryString },
  });
  return response.data as ResultadoPaginado<Aluno>;
};

interface QueryString {
  pagina: string;
  tamanho: string;
  nome: string;
}
const useRecuperarAlunosComPaginacao = (queryString: QueryString) => {
  const api = useApi();
  return useQuery({
    queryKey: ["alunos", "paginacao", queryString],
    queryFn: () => recuperarAlunosComPaginacao(queryString, api),
    placeholderData: keepPreviousData,
  });
};
export default useRecuperarAlunosComPaginacao;
