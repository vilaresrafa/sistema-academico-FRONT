import React, { useState, useEffect, useRef } from "react";
import useRecuperarTurmas from "../hooks/useRecuperarTurmas";
import useRecuperarAlunosPorSlugTurma from "../hooks/useRecuperarAlunosPorSlugTurma";

const GrupoPage = () => {
  const [nome, setNome] = useState("");
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState<string>(""); // será o slug ou nome da turma
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hook de turmas
  const { data: turmas, isLoading, isError, error } = useRecuperarTurmas({ nome: "" });

  // Hook de alunos da turma selecionada
  const {
    data: alunos,
    isFetching: carregandoAlunos,
    isError: erroAlunos,
  } = useRecuperarAlunosPorSlugTurma(turmaSelecionada || undefined);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickFora = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMostrarDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
    setMostrarDropdown(true);
  };

  const handleSelecionar = (slugTurma: string) => {
    setTurmaSelecionada(slugTurma);
    setNome(slugTurma);
    setMostrarDropdown(false);
  };

  const turmasFiltradas = turmas?.filter((turma: any) =>
    turma.nome.toLowerCase().includes(nome.toLowerCase())
  );

  const [grupoAlunos, setGrupoAlunos] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("gruposTurmas");
    if (dadosSalvos) {
      setGrupoAlunos(JSON.parse(dadosSalvos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gruposTurmas", JSON.stringify(grupoAlunos));
  }, [grupoAlunos]);

  const handleIncluirRemover = (aluno: any) => {
    setGrupoAlunos((prev) => {
      const grupoAtual = prev[turmaSelecionada] || [];
      const existe = grupoAtual.find((a) => a.id === aluno.id);

      const novoGrupo = existe
        ? grupoAtual.filter((a) => a.id !== aluno.id)
        : [...grupoAtual, aluno];

      return { ...prev, [turmaSelecionada]: novoGrupo };
    });
  };

  const grupoAtual = grupoAlunos[turmaSelecionada] || [];

  return (
    <div style={{ padding: "20px", maxWidth: "10000px" }}>
      <h2>Selecione uma turma</h2>

      <div ref={dropdownRef} style={{ position: "relative", width: "100%" }}>
        <input
          type="text"
          value={nome}
          onChange={handleChange}
          onFocus={() => setMostrarDropdown(true)}
          placeholder="Digite ou selecione uma turma..."
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        />

        {mostrarDropdown && (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderTop: "none",
              maxHeight: "180px",
              overflowY: "auto",
              zIndex: 10,
              borderRadius: "0 0 8px 8px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            {isLoading && <li className="p-2">Carregando...</li>}
            {isError && <li className="p-2 text-danger">Erro: {error.message}</li>}

            {turmasFiltradas?.length ? (
              turmasFiltradas.map((turma: any) => (
                <li
                  key={turma.id}
                  onClick={() => handleSelecionar(turma.slug || turma.nome)}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {turma.nome}
                </li>
              ))
            ) : (
              <li className="p-2 text-muted">Nenhuma turma encontrada</li>
            )}
          </ul>
        )}
      </div>

      {turmaSelecionada && (
        <h3 style={{ marginTop: "20px" }}>
          Alunos da turma <strong>{turmaSelecionada}</strong>
        </h3>
      )}

{turmaSelecionada && (
  <>
    {carregandoAlunos ? (
      <p>Carregando alunos...</p>
    ) : erroAlunos ? (
      <p>Erro ao carregar alunos</p>
    ) : alunos && alunos.length > 0 ? (
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>id</th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Nome</th>
            <th style={{ padding: "8px", border: "1px solid #ccc" }}>Email</th>
            <th
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                textAlign: "center",
              }}
            >
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno: any) => {
            const incluso = grupoAtual.some((a) => a.id === aluno.id);
            return (
              <tr key={aluno.id}>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{aluno.id}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{aluno.nome}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{aluno.email}</td>
                <td
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={() => handleIncluirRemover(aluno)}
                    style={{
                      padding: "6px 100px",
                      borderRadius: "50px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: incluso ? "#dc3545" : "#28a745",
                      color: "white",
                    }}
                  >
                    {incluso ? "Remover" : "Incluir"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : (
      <p>Nenhum aluno encontrado para essa turma.</p>
    )}
  </>
)}

    </div>
  );
};

export default GrupoPage;
