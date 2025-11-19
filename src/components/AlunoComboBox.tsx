import { useState } from "react";
import useAlunoInscricaoStore from "../store/AlunoInscricaoStore";
import useRecuperarAlunosNaoInscritos from "../hooks/useRecuperarAlunosNaoInscritos";

const AlunoComboBox = () => {
  const turmaId = useAlunoInscricaoStore((s) => s.turmaId);
  const setAlunoId = useAlunoInscricaoStore((s) => s.setAlunoId);

  const [pesquisa, setPesquisa] = useState("");

  const { data: alunos = [] } = useRecuperarAlunosNaoInscritos(
    turmaId ?? 0,
    pesquisa
  );

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="Selecione um aluno"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      {pesquisa.length > 0 && alunos.length > 0 && (
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
          {alunos.map((aluno: any) => (
            <li
              key={aluno.id}
              className="list-group-item list-group-item-action"
              onClick={() => {
                setAlunoId(aluno.id);
                setPesquisa(aluno.nome);
              }}
            >
              {aluno.nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlunoComboBox;
