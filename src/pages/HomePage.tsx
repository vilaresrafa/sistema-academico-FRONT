import { NavLink, Outlet } from "react-router-dom";
import Pesquisa from "../components/Pesquisa";
import { useState } from "react";
import useRecuperarTurmas from "../hooks/useRecuperarTurmas";

const HomePage = () => {
  const [nome, setNome] = useState("");

  const tratarPesquisa = (texto: string) => {
    setNome(texto);
  };

  const {
    data: turmas,
    isPending,
    error,
  } = useRecuperarTurmas({ nome });

  return (
    <div className="row">
      <div className="col-lg-2">
        <h5>Turmas</h5>

        <Pesquisa tratarPesquisa={tratarPesquisa} />

        {isPending && <p>Carregando turmas...</p>}
        {error && <p className="text-danger">Erro ao carregar turmas.</p>}

        <nav className="nav nav-pills d-flex flex-column">
          {turmas?.length ? (
            turmas.map((turma: any) => (
              <NavLink
                key={turma.nome}
                className="nav-link"
                to={`/${turma.slug}`}
              >
                {turma.nome}
              </NavLink>
            ))
          ) : (
            !isPending && <p>Nenhuma turma encontrada</p>
          )}
        </nav>
      </div>

      <div className="col-lg-10">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;





/*
import { NavLink, Outlet } from "react-router-dom"
import Pesquisa from "../components/Pesquisa"
import { useState } from "react";
import useRecuperarTurmas from "../hooks/useRecuperarTurmas";

const HomePage = () => {
  const [nome, setNome] = useState("");

  const tratarPesquisa = (nome: string) => {
    setNome(nome);
  };

  const {
    data: resultadoPaginado,
    isPending: recuperandoTurmas,
    error: errorRecuperarTurma,
  } = useRecuperarTurmas({nome: nome});

  return (
    <div className="row">
      <div className="col-lg-2">
        <h5>Turmas</h5>
        <Pesquisa tratarPesquisa={tratarPesquisa} />
        <nav className="nav nav-pills d-flex flex-column">
          <NavLink className="nav-link" to="/a001">A001</NavLink>
          <NavLink className="nav-link" to="/a002">A002</NavLink>
          <NavLink className="nav-link" to="/b001">B001</NavLink>
          <NavLink className="nav-link" to="/b002">B002</NavLink>
        </nav>
      </div>
      <div className="col-lg-10">
        <Outlet />
      </div>
    </div>
  )
}
export default HomePage
*/