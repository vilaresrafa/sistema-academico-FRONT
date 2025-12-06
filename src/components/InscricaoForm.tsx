import React from "react";
import DisciplinaComboBox from "./DisciplinaComboBox";
import TurmaComboBox from "./TurmaComboBox";
import AlunoComboBox from "./AlunoComboBox";
import TabelaDeAlunosPorTurma from "./TabelaDeAlunosPorTurma";
import { useInscricaoStore } from "../store/InscricaoStore";
import { useCriarInscricao } from "../hooks/useCriarInscricao";

export default function InscricaoForm() {
  const disciplinaId = useInscricaoStore(s => s.disciplinaId);
  const turmaId = useInscricaoStore(s => s.turmaId);
  const alunoId = useInscricaoStore(s => s.alunoId);
  const setAlunoId = useInscricaoStore(s => s.setAlunoId);
  const setFiltro = useInscricaoStore(s => s.setFiltro);

  const { mutate: criar, isPending } = useCriarInscricao();

  const handleInscrever = () => {
    if (!turmaId || !alunoId) return alert("Selecione turma e aluno");
    const payload = {
      dataHora: new Date().toISOString(),
      aluno: { id: alunoId },
      turma: { id: turmaId }
    };
    criar(payload, {
      onSuccess: () => {
        setAlunoId(null);  
        setFiltro(""); 
        alert("Aluno inscrito com sucesso!");
      },
      onError: (err: any) => {
        alert("Erro ao inscrever: " + (err?.message ?? "unknown"));
      }
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-xl-4"><DisciplinaComboBox /></div>
        <div className="col-xl-4"><TurmaComboBox /></div>
        <div className="col-xl-4"><AlunoComboBox /></div>
      </div>

      <div className="row mt-3">
        <div className="col-xl-12 d-flex">
          <button className="btn btn-success btn-sm me-2" onClick={handleInscrever} disabled={isPending}>
            Inscrever Aluno
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => { setAlunoId(null); setFiltro(""); }}>
            Limpar Seleção
          </button>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-xl-12">
          <TabelaDeAlunosPorTurma />
        </div>
      </div>
    </div>
  );
}
