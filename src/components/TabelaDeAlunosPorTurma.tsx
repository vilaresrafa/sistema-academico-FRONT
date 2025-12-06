import React from "react";
import { useInscritosPorTurma } from "../hooks/useInscritosPorTurma";
import { useInscricaoStore } from "../store/InscricaoStore";
import Pesquisa from "../components/Pesquisa";
import Paginacao from "../components/Paginacao";

export default function TabelaDeAlunosPorTurma() {
  const turmaId = useInscricaoStore((s) => s.turmaId);
  const filtro = useInscricaoStore((s) => s.filtro);
  const pagina = useInscricaoStore((s) => s.pagina);
  const setFiltro = useInscricaoStore((s) => s.setFiltro);
  const setPagina = useInscricaoStore((s) => s.setPagina);

  const tamanhoPagina = 5;

  const { data: inscritos = [], isLoading } = useInscritosPorTurma(turmaId ?? null);

  if (!turmaId) return <p style={{ fontSize: 14 }}>Selecione uma turma para ver os inscritos</p>;
  if (isLoading) return <p>Carregando inscritos...</p>;
  if (!inscritos || inscritos.length === 0) return <p>Nenhum inscrito nesta turma</p>;

  const filtrados = inscritos.filter((i) =>
    i.aluno.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const inicio = pagina * tamanhoPagina;
  const fim = inicio + tamanhoPagina;
  const paginaAtual = filtrados.slice(inicio, fim);
  const totalDePaginas = Math.ceil(filtrados.length / tamanhoPagina);

  return (
    <div>
      <Pesquisa tratarPesquisa={setFiltro} />

      <table className="table table-striped mt-3">
        <thead> ... </thead>
        <tbody>
          {paginaAtual.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.aluno.nome}</td>
              <td>{i.aluno.email}</td>
              <td>{new Date(i.dataHora).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Paginacao
        pagina={pagina}
        totalDePaginas={totalDePaginas}
        tratarPaginacao={(p) => setPagina(Math.max(0, Math.min(p, Math.max(0, totalDePaginas - 1))))}
      />
    </div>
  );
}
