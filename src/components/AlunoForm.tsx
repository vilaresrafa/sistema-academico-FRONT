import { useForm } from "react-hook-form";
import type { Aluno } from "../interfaces/Aluno";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import useCadastrarAluno from "../hooks/useCadastrarAluno";
import useAlunoStore from "../store/AlunoStore";
import { useEffect } from "react";
import type { Turma } from "../interfaces/Turma";
import DisciplinaComboBox from "./DisciplinaComboBox";
import TurmaComboBox from "./TurmaComboBox";
import AlunoComboBox from "./AlunoComboBox";

interface FormAluno {
  id: number;
  nome: string;
  email: string;
  slug: string;
  turma: Turma;
  descricao: string;
}

const AlunoForm = () => {
  const setMensagem = useAlunoStore((s) => s.setMensagem);
  const alunoSelecionado = useAlunoStore((s) => s.alunoSelecionado);

  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm<FormAluno>();
  const { mutate: cadastrarAluno, error: errorCadastrarAluno } = useCadastrarAluno();

  const inicializaForm = () => {
    if (alunoSelecionado.id) {
      setValue("nome", alunoSelecionado.nome);
      setValue("email", alunoSelecionado.email);
      setValue("turma", alunoSelecionado.turma);
    } else {
      reset();
    }
  };

  useEffect(() => {
    inicializaForm();
  }, [alunoSelecionado]);

  const submit = ({
    id,
    nome,
    email,
    turma,
  }: FormAluno) => {
    const aluno: Aluno = {
      nome: nome,
      email: email,
      slug: slugify(nome, {
        lower: true,
        strict: true,
      }),
      turma: { id: +turma } as Turma,
      id: id
    };
    if (alunoSelecionado.id) {
      aluno.id = alunoSelecionado.id;  
      cadastrarAluno(aluno, {
        onSuccess: (alunoCadastrado: Aluno) => {
          setMensagem("Aluno cadastrado com sucesso!");
          navigate("/alunos/" + alunoCadastrado.id);
        }
      })
    }
  };

  if (errorCadastrarAluno) throw errorCadastrarAluno;
  
  return (
    <form onSubmit={handleSubmit(submit)} autoComplete="off">
      <div className="row">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="nome" className="col-xl-2 fw-bold">
              Disciplina
            </label>
            <div className="col-xl-10">
              <DisciplinaComboBox />
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="email" className="col-xl-3 fw-bold">
              Alunos
            </label>
            <div className="col-xl-9">
              <AlunoComboBox />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="turma" className="col-xl-2 fw-bold">
              Turma
            </label>
            <div className="col-xl-10">
              <TurmaComboBox />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-xl-6">
          <div className="row">
            <div className="col-xl-10 offset-xl-2 d-flex">
              <button
                type="submit"
                className="btn btn-success btn-sm d-flex align-items-center me-3"
              >
                {alunoSelecionado.id ? (
                  <>
                    Alterar
                  </>
                ) : (
                  <>
                    Cadastrar
                  </>
                )}
              </button>
              <button
                onClick={() => inicializaForm()}
                type="button"
                className="btn btn-secondary btn-sm d-flex align-items-center"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default AlunoForm;
