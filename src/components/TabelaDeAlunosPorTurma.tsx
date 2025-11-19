import useAlunoInscricaoStore from "../store/AlunoInscricaoStore";
import { useRecuperarInscritosPorTurma } from "../hooks/useRecuperarInscritosPorTurma";

const TabelaDeAlunosPorTurma = () => {
  const turmaId = useAlunoInscricaoStore((s) => s.turmaId);

  const { data: inscritos, isLoading } = useRecuperarInscritosPorTurma(turmaId);

  if (!turmaId) return null;

  if (isLoading) return <p>Carregando alunos inscritos...</p>;

  if (!inscritos || inscritos.length === 0)
    return <p>Nenhum aluno inscrito nesta turma.</p>;

  return (
    <table className="table table-bordered mt-3">
      <thead className="table-light">
        <tr>
          <th style={{ width: 80 }}>ID</th>
          <th>Nome</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        {inscritos.map((i) => (
          <tr key={i.id}>
            <td>{i.id}</td>
            <td>{i.aluno.nome}</td>
            <td>{i.aluno.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaDeAlunosPorTurma;
