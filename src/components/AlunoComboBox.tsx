import { useState, useRef, useEffect } from "react";
import { useInscricaoStore } from "../store/InscricaoStore";
import { useRecuperarAlunosNaoInscritos } from "../hooks/useRecuperarAlunosNaoInscritos";

const AlunoComboBox = () => {
  const turmaId = useInscricaoStore((s) => s.turmaId);     // <-- store CORRETO
  const setAlunoId = useInscricaoStore((s) => s.setAlunoId);

  const [pesquisa, setPesquisa] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const caixaRef = useRef<HTMLDivElement>(null);

  const { data: alunos = [] } = useRecuperarAlunosNaoInscritos(
    turmaId ?? null,
    pesquisa
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (caixaRef.current && !caixaRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative" }} ref={caixaRef}>
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder={
            turmaId
            ? "Selecione um aluno"
            : "Selecione uma turma primeiro..."
        }
        disabled={!turmaId}
        value={pesquisa}
        onChange={(e) => {
            setPesquisa(e.target.value);
            setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}   // <-- abre ao focar
        onClick={() => setIsOpen(true)}   // <-- abre ao clicar
        />

      {isOpen && alunos.length > 0 && (
        <ul
          className="list-group"
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 10,
            maxHeight: "200px",
            overflowY: "auto",
            cursor: "pointer",
          }}
        >
          {alunos.map((aluno: any) => (
            <li
              key={aluno.id}
              className="list-group-item list-group-item-action"
              onClick={() => {
                setAlunoId(aluno.id);
                setPesquisa(aluno.nome);
                setIsOpen(false);
              }}
            >
              {aluno.nome}
            </li>
          ))}
        </ul>
      )}

      {isOpen && pesquisa.length > 0 && alunos.length === 0 && (
        <div
          className="list-group-item"
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 10,
            background: "#fff",
          }}
        >
          Nenhum aluno encontrado
        </div>
      )}
    </div>
  );
};

export default AlunoComboBox;
