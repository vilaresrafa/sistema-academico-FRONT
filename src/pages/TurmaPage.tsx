import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import useRecuperarTurmaPorId from "../hooks/useRecuperarTurmaPorId";

const TurmaPage = () => {
  const { id } = useParams();
  const {
    data: turma,
    isPending: recuperandoTurma,
    error: errorRecuperarTurma,
  } = useRecuperarTurmaPorId(+id!);

  if (errorRecuperarTurma) throw errorRecuperarTurma;
  if (recuperandoTurma) return <p>Recuperando turmas...</p>;

  return (
    <>
  <div className="mb-4">
    <h5>Página da Turma</h5>
    <hr className="mt-1" />
  </div>

  <div className="row mb-3">
    <div className="col-lg-8 col-md-10">
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-5 fw-bold mb-1">Ano</div>
        <div className="col-xl-9 col-lg-8 col-7">{turma.ano}</div>

        <div className="col-xl-3 col-lg-4 col-5 fw-bold mb-1">Período</div>
        <div className="col-xl-9 col-lg-8 col-7">{turma.periodo}</div>

        <div className="col-xl-3 col-lg-4 col-5 fw-bold mb-1">Professor</div>
        <div className="col-xl-9 col-lg-8 col-7">
          {turma.professor?.nome}
        </div>

        <div className="col-xl-3 col-lg-4 col-5 fw-bold mb-1">Disciplina</div>
        <div className="col-xl-9 col-lg-8 col-7">
          {turma.nome?.nome}
        </div>
      </div>
    </div>
  </div>
</>
  );
};
export default TurmaPage;
