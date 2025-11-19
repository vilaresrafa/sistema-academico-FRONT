import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "./Layout";
import ErrorPage from "../pages/ErrorPage";
import TurmasPage from "../pages/TurmasPage";
import TurmaPage from "../pages/TurmaPage";
import CardsPorSlugTurma from "../components/CardsPorSlugTurma";
import AlunosComPaginacaoPage from "../pages/AlunosComPaginacaoPage";
import CardsPorSlugCategoriaPage from "../pages/CardsPorSlugDaTurmaPage";
import CardsPorSlugDaTurmaPage from "../pages/CardsPorSlugDaTurmaPage";
import GrupoPage from "../pages/GrupoPage";
import CadastrarAlunoPage from "../pages/CadastrarAlunosPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "", 
        element: <HomePage />,
        children: [
            {path: ":slugTurma?", element: <CardsPorSlugDaTurmaPage />}
        ]
      },
      { path: "listar-turmas", element: <TurmasPage /> },
      { path: "listar-alunos", element: <AlunosComPaginacaoPage />},
      { path: "grupos", element: <GrupoPage/>},
      { path: "inscricao-alunos", element: <CadastrarAlunoPage />},
      { path: "turmas/:id", element: <TurmaPage /> },
    ],
  },
]);
export default router;
