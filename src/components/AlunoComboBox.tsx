import React, { useEffect, useRef, useState } from "react";
import { useInscricaoStore } from "../store/InscricaoStore";
import { useAlunosNaoInscritos } from "../hooks/useRecuperarAlunosNaoInscritos";
import type { Aluno } from "../interfaces/Aluno";

export default function AlunoComboBox() {
  const turmaId = useInscricaoStore((s) => s.turmaId);
  const alunoId = useInscricaoStore((s) => s.alunoId);
  const setAlunoId = useInscricaoStore((s) => s.setAlunoId);
  const filtro = useInscricaoStore((s) => s.filtro);
  const setFiltro = useInscricaoStore((s) => s.setFiltro);

  const [open, setOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState(""); 
  const boxRef = useRef<HTMLDivElement>(null);

  const { data: alunos = [] } = useAlunosNaoInscritos(turmaId ?? null, filtro);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const alunoSelecionado = alunos.find((a: Aluno) => a.id === alunoId);

 
  useEffect(() => {
    if (alunoSelecionado) {
      setDisplayValue(alunoSelecionado.nome);
    }
  }, [alunoSelecionado]);

  return (
    <div ref={boxRef} style={{ position: "relative" }}>
      <label className="fw-bold">Aluno</label>

      <input
        className="form-control form-control-sm"
        placeholder={
          turmaId ? "Selecione um aluno" : "Selecione uma turma primeiro..."
        }
        disabled={!turmaId}
        value={open ? filtro : displayValue} 
        onChange={(e) => {
          setFiltro(e.target.value);
          setDisplayValue(e.target.value);
          setOpen(true);
        }}
        onClick={() => setOpen(true)}
        onFocus={() => setOpen(true)}
      />

      {open && turmaId && alunos.length > 0 && (
        <ul
          className="list-group"
          style={{
            position: "absolute",
            zIndex: 999,
            width: "100%",
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {alunos.map((a: Aluno) => (
            <li
              key={a.id}
              className="list-group-item list-group-item-action"
              onMouseDown={() => {
                setAlunoId(a.id);
                setDisplayValue(a.nome);
                setFiltro(""); 
                setOpen(false);
              }}
            >
              {a.nome} — {a.email}
            </li>
          ))}
        </ul>
      )}

      {open && filtro.length > 0 && turmaId && alunos.length === 0 && (
        <div
          className="list-group-item text-muted"
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 999,
            background: "#fff",
          }}
        >
          Nenhum aluno encontrado
        </div>
      )}
    </div>
  );
}
