import { useParams } from "react-router-dom";
import useRecuperarProdutoPorId from "../hooks/useRecuperarProdutoPorId";
import dayjs from "dayjs";

const ProdutoPage = () => {
  const { id } = useParams();
  const {
    data: produto,
    isPending: recuperandoProduto,
    error: errorRecuperarProduto,
  } = useRecuperarProdutoPorId(+id!);

  if (errorRecuperarProduto) throw errorRecuperarProduto;
  if (recuperandoProduto) return <p>Recuperando produtos...</p>;

  return (
    <>
      <div className="mb-4">
        <h5>Página de Produto</h5>
        <hr className="mt-1" />
      </div>

      <div className="row mb-3">
        <div className="col-lg-3 col-md-4">
          {/* Para chegar nessa página o url foi /produtos/:id */}
          {/* Sem a / abaixo seria enviada uma requisição para /produtos/abacate.png*/}
          <img
            src={"/" + produto.imagem}
            className="d-block d-md-none mb-3"
            style={{ width: "170px" }}
          />
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={"/" + produto.imagem}
              className="d-none d-md-block"
              style={{ width: "210px" }}
            />
          </div>
        </div>
        <div className="col-lg-9 col-md-8">
          <div className="row">
            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">
              Categoria
            </div>
            <div className="col-xl-10 col-lg-9 col-8">
              {produto.categoria.nome}
            </div>
            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">Nome</div>
            <div className="col-xl-10 col-lg-9 col-8">
              {produto.nome} ({produto.descricao})
            </div>
            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">Preço</div>
            {/*
                <div className="col-xl-10 col-lg-9 col-8">
                  {produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </div>
              */}
            <div className="col-xl-10 col-lg-9 col-8">
              {produto.preco.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true,
              })}
            </div>
            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">Estoque</div>
            <div className="col-xl-10 col-lg-9 col-8">{produto.qtdEstoque}</div>

            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">
              Data Cadastro
            </div>
            <div className="col-xl-10 col-lg-9 col-8">
              {dayjs(produto.dataCadastro).format("DD/MM/YYYY")}
            </div>

            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">
              Disponível
            </div>
            <div className="col-xl-10 col-lg-9 col-8">
              {produto.disponivel ? "Sim" : "Não"}
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6 mt-3">
          <button className="btn btn-primary btn-sm w-100" type="button">
            Editar
          </button>
        </div>
        <div className="col-lg-3 col-md-4 col-6 mt-3">
          <button className="btn btn-danger btn-sm w-100" type="button">
            Remover
          </button>
        </div>
      </div>
    </>
  );
};
export default ProdutoPage;
