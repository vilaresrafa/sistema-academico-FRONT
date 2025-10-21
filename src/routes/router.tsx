import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "./Layout";
import ErrorPage from "../pages/ErrorPage";
import TurmasPage from "../pages/TurmasPage";
import AlunosPage from "../pages/AlunosPage";
import TurmaPage from "../pages/TurmaPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "listar-turmas", element: <TurmasPage /> },
      { path: "listar-alunos", element: <AlunosPage />},
      { path: "turmas/:id", element: <TurmaPage /> },
    ],
  },
]);
export default router;
