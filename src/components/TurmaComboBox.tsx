import { useState, useEffect, useRef } from "react";
import { useInscricaoStore } from "../store/InscricaoStore";
import useRecuperarTurmasDisciplina from "../hooks/useRecuperarTurmasDisciplina";

export default function TurmaComboBox() {
  const disciplinaId = useInscricaoStore((s) => s.disciplinaId);
  const turmaId = useInscricaoStore((s) => s.turmaId);
  const setTurmaId = useInscricaoStore((s) => s.setTurmaId);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  // Fecha dropdown quando clicar fora
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: turmas, isLoading } = useRecuperarTurmasDisciplina({
    nome: query,
    disciplinaId,
  });

  if (!disciplinaId) {
    return <p style={{ fontSize: 14 }}>Selecione uma disciplina primeiro</p>;
  }

  const turmaSelecionada = turmas?.find((t: any) => t.id === turmaId);

  return (
    <div style={{ position: "relative" }} ref={boxRef}>
      <label className="fw-bold">Turma</label>

      {/* Input */}
      <input
        type="text"
        className="form-control form-control-sm"
        value={turmaSelecionada ? turmaSelecionada.nome : query}
        placeholder={isLoading ? "Carregando turmas..." : "Digite para filtrar turmas"}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />

      {/* Dropdown */}
      {open && (
        <ul
          className="list-group"
          style={{
            position: "absolute",
            zIndex: 999,
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            cursor: "pointer",
          }}
        >
          {(turmas ?? []).map((t: any) => (
            <li
              key={t.id}
              className="list-group-item list-group-item-action"
              onMouseDown={() => {
                // mouseDown evita o blur antes do click
                setQuery(t.nome);
                setTurmaId(t.id);
                setOpen(false);
              }}
            >
              {t.nome}
            </li>
          ))}

          {turmas?.length === 0 && !isLoading && (
            <li className="list-group-item text-muted small">
              Nenhuma turma encontrada
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
