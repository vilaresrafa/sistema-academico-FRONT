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

const AlunoForm: React.FC = () => {
  const alunoSelecionado = useAlunoStore((s) => s.alunoSelecionado);
  const setMensagem = useAlunoStore((s) => s.setMensagem);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AlunoFormValues>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      nome: "",
      email: "",
    },
  });

  const cadastrarMutation = useCadastrarAluno();
  const atualizarMutation = useAtualizarAluno();

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
    const aluno: Aluno = {
      id: alunoSelecionado?.id ?? 0,
      nome: data.nome,
      email: data.email,
      slug: slugify(data.nome, { lower: true, strict: true }),
      turma: undefined as any,
    };

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
      });
    }
  };

  console.log("ERRORS:", errors);


  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

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
