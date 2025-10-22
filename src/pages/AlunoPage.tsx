import { useParams } from "react-router-dom";
import { useState } from "react";
import useRemoverAlunoPorId from "../hooks/useRemoverAlunoPorId";
import useRecuperarAlunoPorId from "../hooks/useRecuperarAlunoPorId";

const AlunoPage = () => {
  const [removido] = useState(false);

  const { id } = useParams();
  
  const {
    data: aluno,
    isPending: recuperandoAluno,
    error: errorRecuperarAluno,
  } = useRecuperarAlunoPorId(+id!, removido);

  const { error: errorRemocaoAluno } = useRemoverAlunoPorId();


  if (errorRecuperarAluno) throw errorRecuperarAluno;
  if (errorRemocaoAluno) throw errorRemocaoAluno;
  if (recuperandoAluno) return <p>Recuperando alunos...</p>;

  return (
    <>
      <div className="mb-4">
        <h5>Página de Aluno</h5>
        <hr className="mt-1" />
      </div>

      {removido && (
        <div className="alert alert-success fw-bold" role="alert">
          Aluno removido com sucesso!
        </div>
      )}

      <div className="row mb-3">
        <div className="col-lg-9 col-md-8">
          <div className="row">
            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">
              Turma
            </div>
            <div className="col-xl-10 col-lg-9 col-8">
              {aluno.turma.nome}
            </div>
            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">Nome</div>
            <div className="col-xl-10 col-lg-9 col-8">
              {aluno.nome}
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6 mt-3">
          <button disabled={removido} className="btn btn-primary btn-sm w-100" type="button">
            Editar
          </button>
        </div>
      </div>
    </>
  );
};
export default AlunoPage;
