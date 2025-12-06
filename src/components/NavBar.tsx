import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import useAuthStore from "../store/AuthStore";

const NavBar = () => {
  const { isAuthenticated, user, logout, hasRole } = useAuthStore();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Sistema Acadêmico
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/listar-turmas">
                    <i className="bi bi-journal-text me-1"></i>
                    Turmas
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/listar-alunos">
                    <i className="bi bi-people me-1"></i>
                    Alunos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/grupos">
                    <i className="bi me-1"></i>
                    Grupos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/inscricao-alunos">
                    <i className="bi me-1"></i>
                    Inscrição em turmas
                  </NavLink>
                </li>
                {hasRole("ADMIN") && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/cadastro-alunos">
                        <i className="bi me-1"></i>
                        Inscrição de Novos Alunos
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/admin/user-management">
                        <i className="bi me-1"></i>
                        Gerenciar Usuários
                      </NavLink>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Olá, {user?.nome}</span>
                </li>
                {user?.roles && (
                  <li className="nav-item">
                    <small className="nav-link text-muted">
                      {user.roles.join(", ")}
                    </small>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
