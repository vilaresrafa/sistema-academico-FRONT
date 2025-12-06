import { Link } from "react-router-dom";
import type { Turma } from "../interfaces/Turma";
//import { Link } from "react-router-dom";

interface Props {
  turmas: Turma[];
}

const TabelaDeTurma = ({ turmas }: Props) => {
  // console.log(produtos);
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-hover table-sm">
        <thead>
          <tr>
            <th className="text-center align-middle">Id</th>
            <th className="text-center align-middle">Ano</th>
            <th className="text-center align-middle">Periodo</th>
            <th className="text-center align-middle">Professor</th>
          </tr>
        </thead>
        <tbody>
          {turmas.map((turma) => (
            <tr key={turma.id}>
              <td className="align-middle ps-3">
                <Link className="fw-bold" style={{textDecoration: "none", color: "#46860bfa"}} to={"/turmas/" + turma.id}>{turma.id}</Link> 
              </td>
              <td className="text-center align-middle">{turma.ano}</td>
              <td className="text-center align-middle">{turma.periodo}</td>
              <td className="text-center align-middle">{turma.professor?.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TabelaDeTurma;
