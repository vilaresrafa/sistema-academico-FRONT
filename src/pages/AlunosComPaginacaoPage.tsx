import { useState } from "react";
import type { Aluno } from "../interfaces/Aluno";
import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import TabelaDeAlunos from "../components/TabelaDeAlunos";
import useRecuperarAlunosComPaginacao from "../hooks/useRecuperarAlunoComPaginacao";
import useRemoverAlunoPorId from "../hooks/useRemoverAlunoPorId";

const AlunosComPaginacaoPage = () => {
  const [pagina, setPagina] = useState(0);
  const [nome, setNome] = useState("");
  const tamanho: number = 5;

  const {
    data: resultadoPaginado,
    isPending: recuperandoAlunosComPaginacao,
    error: errorRecuperarAlunosComPaginacao,
  } = useRecuperarAlunosComPaginacao({pagina: pagina.toString(),
                                        tamanho: tamanho.toString(),
                                        nome: nome});

  const {
    mutate: removerAluno,
    error: errorRemocaoAluno} = useRemoverAlunoPorId(); 

  const tratarRemocao = (id: number) => {
    removerAluno(id);
    setPagina(0);
  };

  const tratarPesquisa = (nome: string) => {
    setNome(nome);
    setPagina(0);
  };

  const tratarPaginacao = (pagina: number) => {
    setPagina(pagina);
  };

  if (errorRecuperarAlunosComPaginacao) throw errorRecuperarAlunosComPaginacao;
  if (errorRemocaoAluno) throw errorRemocaoAluno;
  if (recuperandoAlunosComPaginacao) return <p>Recuperando alunos...</p>;

  const alunos: Aluno[] = resultadoPaginado.itens;
  const totalDePaginas: number = resultadoPaginado.totalDePaginas;

  return (
    <>
      <h5>Lista de Alunos</h5>
      <hr className="mt-1" />

      <Pesquisa tratarPesquisa={tratarPesquisa} />
      <TabelaDeAlunos alunos={alunos} tratarRemocao={tratarRemocao} />
      <Paginacao
        pagina={pagina}
        totalDePaginas={totalDePaginas}
        tratarPaginacao={tratarPaginacao}
      />
    </>
  );
};
export default AlunosComPaginacaoPage;
