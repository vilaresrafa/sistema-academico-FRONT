import { useForm } from "react-hook-form";
import type { Aluno } from "../interfaces/Aluno";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import useCadastrarAluno from "../hooks/useCadastrarAluno";
import useAlunoStore from "../store/AlunoStore";
import { useEffect, useState } from "react";
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
  const { mutate: cadastrarAluno, error: errorCadastrarAluno } =
    useCadastrarAluno();

  // -------------------------------
  // ESTADOS PARA OS COMBOBOX
  // -------------------------------
  const [turmaId, setTurmaId] = useState<number | null>(null);
  const [alunoId, setAlunoId] = useState<number | null>(null);

  // -------------------------------
  // INICIALIZA FORMULÁRIO
  // -------------------------------
  const inicializaForm = () => {
    if (alunoSelecionado.id) {
      setValue("nome", alunoSelecionado.nome);
      setValue("email", alunoSelecionado.email);
      setValue("turma", alunoSelecionado.turma);

      // seta a turma atual
      setTurmaId(alunoSelecionado.turma?.id || null);
    } else {
      reset();
    }
  };

  useEffect(() => {
    inicializaForm();
  }, [alunoSelecionado]);

  // -------------------------------
  // SALVAR ALUNO (SE EDITAR)
  // -------------------------------
  const submit = ({ id, nome, email, turma }: FormAluno) => {
    const aluno: Aluno = {
      nome,
      email,
      slug: slugify(nome, {
        lower: true,
        strict: true,
      }),
      turma: { id: +turma } as Turma,
      id,
    };

    if (alunoSelecionado.id) {
      aluno.id = alunoSelecionado.id;
      cadastrarAluno(aluno, {
        onSuccess: (alunoCadastrado: Aluno) => {
          setMensagem("Aluno cadastrado com sucesso!");
          navigate("/alunos/" + alunoCadastrado.id);
        },
      });
    }
  };

  // -------------------------------
  // INSCRIÇÃO
  // -------------------------------
  const inscreverAluno = async () => {
    if (!turmaId || !alunoId) return;

    await fetch("http://localhost:8080/inscricoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataHora: new Date().toISOString(),
        aluno: { id: alunoId },
        turma: { id: turmaId },
      }),
    });

    alert("Aluno inscrito com sucesso!");
  };

  if (errorCadastrarAluno) throw errorCadastrarAluno;

  return (
    <form onSubmit={handleSubmit(submit)} autoComplete="off">
      <div className="row">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label className="col-xl-2 fw-bold">Disciplina</label>
            <div className="col-xl-10">
              <DisciplinaComboBox />
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="row mb-2">
            <label className="col-xl-3 fw-bold">Alunos</label>

            <div className="col-xl-9">
              {/* Alunos NÂO inscritos na turma */}
              <AlunoComboBox
                turmaId={turmaId}
                onSelect={setAlunoId}
              />

              <button
                type="button"
                className="btn btn-success btn-sm mt-2 d-flex align-items-center"
                disabled={!alunoId || !turmaId}
                onClick={inscreverAluno}
              >
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TURMA */}
      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label className="col-xl-2 fw-bold">Turma</label>
            <div className="col-xl-10">
              <TurmaComboBox onSelect={setTurmaId} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AlunoForm;
