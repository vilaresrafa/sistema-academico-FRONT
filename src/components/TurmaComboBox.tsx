import React, { useEffect, useRef, useState } from "react";
import { useInscricaoStore } from "../store/InscricaoStore";
import { useTurmasPorDisciplina } from "../hooks/useTurmasPorDisciplina";

export default function TurmaComboBox() {
  const disciplinaId = useInscricaoStore((s) => s.disciplinaId);
  const turmaId = useInscricaoStore((s) => s.turmaId);
  const setTurmaId = useInscricaoStore((s) => s.setTurmaId);
  const setAlunoId = useInscricaoStore((s) => s.setAlunoId);
  const reset = useInscricaoStore((s) => s.reset);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const { data: turmas = [], isLoading } = useTurmasPorDisciplina({
    disciplinaId,
    nome: query,
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const exposedReset = () => {
    reset();
    setQuery("");
    setOpen(false);
  };

  (TurmaComboBox as any).reset = exposedReset;

  if (!disciplinaId)
    return <p style={{ fontSize: 14 }}>Selecione uma disciplina primeiro</p>;

  const turmaSelecionada = turmas.find((t) => t.id === turmaId);

  const inputText = turmaSelecionada ? turmaSelecionada.nome : query;

  return (
    <div ref={boxRef} style={{ position: "relative" }}>
      <label className="fw-bold">Turma</label>
      <input
        className="form-control form-control-sm"
        value={inputText}
        placeholder={
          isLoading ? "Carregando turmas..." : "Digite para filtrar turmas"
        }
        onChange={(e) => {
          const text = e.target.value;
          setQuery(text);
          setOpen(true);

          if (text === "") {
            setTurmaId(null);
            setAlunoId(null);
          }
        }}
        onFocus={() => setOpen(true)}
      />

      {open && (
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
          {(turmas ?? []).map((t) => (
            <li
              key={t.id}
              className="list-group-item list-group-item-action"
              onMouseDown={() => {
                setQuery(t.nome);
                setTurmaId(t.id); 
                setAlunoId(null);
                setOpen(false);
              }}
            >
              {t.nome} — {t.ano} {t.periodo}
            </li>
          ))}

          {turmas.length === 0 && !isLoading && (
            <li className="list-group-item text-muted small">
              Nenhuma turma encontrada
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
