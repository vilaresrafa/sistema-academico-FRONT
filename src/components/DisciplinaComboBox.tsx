import React, { useState, useRef, useEffect } from "react";
import { useDisciplinas } from "../hooks/useDisciplinas";
import { useInscricaoStore } from "../store/InscricaoStore";

export default function DisciplinaComboBox() {
  const setDisciplinaId = useInscricaoStore((s) => s.setDisciplinaId);
  const disciplinaId = useInscricaoStore((s) => s.disciplinaId);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const { data: disciplinas = [], isLoading } = useDisciplinas();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = disciplinas.filter((d) => d.nome.toLowerCase().includes(query.toLowerCase()));

  return (
    <div ref={boxRef} style={{ position: "relative" }}>
      <label className="fw-bold">Disciplina</label>
      <input
        className="form-control form-control-sm"
        value={disciplinas.find(d => d.id === disciplinaId)?.nome ?? query}
        placeholder={isLoading ? "Carregando..." : "Digite para filtrar disciplinas"}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <ul className="list-group" style={{ position: "absolute", zIndex: 999, width: "100%", maxHeight: 200, overflowY: "auto" }}>
          {filtered.map(d => (
            <li key={d.id} className="list-group-item list-group-item-action" onMouseDown={() => { setDisciplinaId(d.id); setOpen(false); }}>
              {d.nome}
            </li>
          ))}
          {filtered.length === 0 && <li className="list-group-item text-muted">Nenhuma disciplina</li>}
        </ul>
      )}
    </div>
  );
}
