import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Aluno } from "../interfaces/Aluno";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import useCadastrarAluno from "../hooks/useCadastrarAluno";
import useAtualizarAluno from "../hooks/useAtualizarAluno";
import useAlunoStore from "../store/AlunoStore";
import { alunoSchema, type AlunoFormValues } from "../util/alunoSchema";
import useRecuperarTurmas from "../hooks/useRecuperarTurmas";
import { useState } from "react";

const AlunoForm: React.FC = () => {
  const alunoSelecionado = useAlunoStore((s) => s.alunoSelecionado);
  const setMensagem = useAlunoStore((s) => s.setMensagem);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<AlunoFormValues>({
    resolver: zodResolver(alunoSchema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      email: "",
    },
  });

  const cadastrarMutation = useCadastrarAluno();
  const atualizarMutation = useAtualizarAluno();
  const { data: turmas = [] } = useRecuperarTurmas({ nome: "" });
  const [selectedTurmaId, setSelectedTurmaId] = useState<number | null>(
    alunoSelecionado?.turma?.id ?? null
  );

  // 🔥 Corrigido: alunoSelecionado pode ser null
  useEffect(() => {
    if (alunoSelecionado?.id) {
      setValue("nome", alunoSelecionado.nome ?? "");
      setValue("email", alunoSelecionado.email ?? "");
    } else {
      reset();
    }
  }, [alunoSelecionado, setValue, reset]);

  const onSubmit = (data: AlunoFormValues) => {
    console.log("AlunoForm submit", data);
    const aluno: Aluno = {
      id: alunoSelecionado?.id ?? 0,
      nome: data.nome,
      email: data.email,
      slug: slugify(data.nome, { lower: true, strict: true }),
      turma: selectedTurmaId
        ? ({ id: selectedTurmaId } as any)
        : alunoSelecionado?.turma ?? ({} as any),
    };
    console.log("selectedTurmaId", selectedTurmaId);
    console.log("payload aluno", aluno);

    if (alunoSelecionado?.id) {
      atualizarMutation.mutate(aluno, {
        onSuccess: () => {
          setMensagem("Aluno atualizado com sucesso!");
          navigate("/listar-alunos");
        },
      });
    } else {
      cadastrarMutation.mutate(aluno, {
        onSuccess: () => {
          setMensagem("Aluno cadastrado com sucesso!");
          navigate("/listar-alunos");
        },
        onError: (err: any) => {
          console.error("Cadastrar aluno erro:", err);
          const serverMsg =
            err?.response?.data || err?.message || JSON.stringify(err);
          alert(
            "Erro ao cadastrar aluno: " +
              (serverMsg?.message || JSON.stringify(serverMsg))
          );
        },
      });
    }
  };

  console.log("ERRORS:", errors);
  const cadastrarBusy =
    (cadastrarMutation as any)?.isPending ||
    (cadastrarMutation as any)?.isLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="row mb-2">
        <label className="col-xl-2 fw-bold">Turma</label>
        <div className="col-xl-10">
          <select
            className="form-select form-select-sm"
            value={selectedTurmaId ?? ""}
            onChange={(e) =>
              setSelectedTurmaId(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">-- Selecionar turma (opcional) --</option>
            {turmas.map((t: any) => (
              <option key={t.id} value={t.id}>
                {t.nome} — {t.ano} {t.periodo}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-2">
        <label className="col-xl-2 fw-bold">Nome</label>
        <div className="col-xl-10">
          <input
            {...register("nome")}
            className="form-control form-control-sm"
          />
          {errors.nome && (
            <small className="text-danger">{errors.nome.message}</small>
          )}
        </div>
      </div>

      <div className="row mb-2">
        <label className="col-xl-2 fw-bold">Email</label>
        <div className="col-xl-10">
          <input
            {...register("email")}
            className="form-control form-control-sm"
          />
          {errors.email && (
            <small className="text-danger">{errors.email.message}</small>
          )}
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-xl-10 offset-xl-2 d-flex">
          <button
            type="submit"
            className="btn btn-success btn-sm d-flex align-items-center me-3"
            disabled={!isValid || cadastrarBusy}
          >
            {alunoSelecionado?.id ? "Alterar" : "Cadastrar"}
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => reset()}
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default AlunoForm;
