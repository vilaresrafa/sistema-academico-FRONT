import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "./Layout";
import ErrorPage from "../pages/ErrorPage";
import TurmasPage from "../pages/TurmasPage";
import TurmaPage from "../pages/TurmaPage";
import AlunosComPaginacaoPage from "../pages/AlunosComPaginacaoPage";
import CardsPorSlugDaTurmaPage from "../pages/CardsPorSlugDaTurmaPage";
import GrupoPage from "../pages/GrupoPage";
import CadastrarAlunoPage from "../pages/CadastrarAlunosPage";
import InscricaoPage from "../pages/InscricaoPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import UserManagementPage from "../pages/UserManagementPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <HomePage />,
            children: [{ path: ":slugTurma?", element: <CardsPorSlugDaTurmaPage /> }],
          },
          { path: "listar-turmas", element: <TurmasPage /> },
          { path: "listar-alunos", element: <AlunosComPaginacaoPage /> },
          { path: "grupos", element: <GrupoPage /> },
          { path: "inscricao-alunos", element: <InscricaoPage /> },
          { path: "turmas/:id", element: <TurmaPage /> },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
        children: [
          { path: "cadastro-alunos", element: <CadastrarAlunoPage /> },
          { path: "admin/user-management", element: <UserManagementPage /> },
        ],
      },
    ],
  },
]);
export default router;
