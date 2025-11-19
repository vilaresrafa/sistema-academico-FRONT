import { useState, useEffect, useRef } from "react";
import useRecuperarDisciplinas from "../hooks/useRecuperarDisciplinas";
import { useInscricaoStore } from "../store/InscricaoStore";

export default function DisciplinaComboBox() {
  const { data: disciplinas } = useRecuperarDisciplinas();

  const disciplinaId = useInscricaoStore((s) => s.disciplinaId);
  const setDisciplinaId = useInscricaoStore((s) => s.setDisciplinaId);

  const [inputValue, setInputValue] = useState("");
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  // Quando seleciona disciplina via store, mostra o nome no input
  useEffect(() => {
    if (disciplinaId && disciplinas) {
      const d = disciplinas.find((x: { id: number; }) => x.id === disciplinaId);
      if (d) setInputValue(d.nome);
    }
  }, [disciplinaId, disciplinas]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropdownAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!disciplinas) return <input className="form-control form-control-sm" disabled />;

  const filtradas = disciplinas.filter((d: any) =>
    d.nome.toLowerCase().includes(inputValue.toLowerCase())
  );

  const selecionar = (disciplina: any) => {
    setDisciplinaId(disciplina.id);
    setInputValue(disciplina.nome);
    setDropdownAberto(false);
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="Selecione uma disciplina"
        value={inputValue}
        onFocus={() => setDropdownAberto(true)}
        onChange={(e) => {
          setInputValue(e.target.value);
          setDropdownAberto(true);
          setDisciplinaId(null); // se digitar algo diferente, limpa seleção
        }}
      />

      {dropdownAberto && (
        <ul
          className="list-group"
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 10,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {filtradas.length === 0 && (
            <li className="list-group-item">Nenhuma disciplina encontrada</li>
          )}

          {filtradas.map((disciplina: any) => (
            <li
              key={disciplina.id}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer" }}
              onMouseDown={() => selecionar(disciplina)}
            >
              {disciplina.nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
