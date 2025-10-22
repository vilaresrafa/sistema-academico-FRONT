import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { useState } from "react";
import type { Aluno } from "../interfaces/Aluno";
import useRecuperarAlunosPorSlugTurma from "../hooks/useRecuperarAlunosPorSlugTurma";
 
export interface ProdCarrinho {
  idProduto: number;
  quantidade: number;
}

const CardsPorSlugCategoriaPage = () => {
  const [] = useState(() => {
    const itensDeCarrinho = localStorage.getItem("carrinho");
    return itensDeCarrinho ? JSON.parse(itensDeCarrinho) : [];
  });

  const { slugTurma } = useParams();
  const {
    data: alunos,
    isPending: recuperandoAlunosPorSlugTurma,
    error: errorRecuperarAlunosPorSlugTurma,
  } = useRecuperarAlunosPorSlugTurma(slugTurma);

  if (errorRecuperarAlunosPorSlugTurma)
    throw errorRecuperarAlunosPorSlugTurma;
  if (recuperandoAlunosPorSlugTurma)
    return <h6>Recuperando Alunos...</h6>;

  return (
    <>
      <h5>
        {slugTurma
          ? slugTurma.charAt(0).toUpperCase() + slugTurma.slice(1)
          : "Alunos"}
      </h5>
      <div className="row">
        {alunos.map((aluno: Aluno) => (
          <div key={aluno.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
            <Card
              aluno={aluno}
            />
          </div>
        ))}
      </div>
    </>
  );
};
export default CardsPorSlugCategoriaPage;
