import type { Aluno } from "../interfaces/Aluno";
import { Link } from "react-router-dom";

interface Props {
  alunos: Aluno[];
  tratarRemocao: (id: number) => void;
}

const TabelaDeAlunos = ({ alunos, tratarRemocao }: Props) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-hover table-sm">
        <thead>
          <tr>
            <th className="text-center align-middle">Id</th>
            <th className="text-center align-middle">Nome</th>
            <th className="text-center align-middle">Email</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td className="text-center align-middle">{aluno.id}</td>
              <td className="align-middle ps-3">
                <Link
                  className="fw-bold"
                  style={{ textDecoration: "none", color: "#46860bfa" }}
                  to={"/alunos/" + aluno.id}
                >
                  {aluno.nome}
                </Link>
              </td>
              <td className="text-center align-middle">{aluno.email}</td>
              <td width="13%" className="text-center align-middle">
                <button
                  onClick={() => tratarRemocao(aluno.id)}
                  type="button"
                  className="btn btn-sm btn-danger"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TabelaDeAlunos;
