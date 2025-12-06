import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ResultadoPaginado } from "../interfaces/ResultadoPaginado";
import type { Aluno } from "../interfaces/Aluno";

const recuperarAlunosComPaginacao = async (queryString: QueryString): Promise<ResultadoPaginado<Aluno>> => {
  
  const response = await fetch(
    "http://localhost:8080/alunos/paginacao?" + new URLSearchParams({...queryString}));
  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao recuperar alunos com paginação. Status code: " + response.status
    );
  }
  return await response.json();
};

interface QueryString {
  pagina: string;
  tamanho: string;
  nome: string;
}
const useRecuperarAlunosComPaginacao = (queryString: QueryString) => {
  return useQuery({
    queryKey: ["alunos", "paginacao", queryString],
    queryFn: () => recuperarAlunosComPaginacao(queryString),
    placeholderData: keepPreviousData
  });
};
export default useRecuperarAlunosComPaginacao;