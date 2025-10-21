import dayjs from "dayjs";
import type { Produto } from "../interfaces/Produto";
import { Link } from "react-router-dom";

interface Props {
  produtos: Produto[];
}

const TabelaDeProdutos = ({ produtos }: Props) => {
  // console.log(produtos);
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-hover table-sm">
        <thead>
          <tr>
            <th className="text-center align-middle">Id</th>
            <th className="text-center align-middle">Imagem</th>
            <th className="text-center align-middle">Categoria</th>
            <th className="text-center align-middle">Nome</th>
            <th className="text-center align-middle">Disponível</th>
            <th className="text-center align-middle">Data de Cadastro</th>
            <th className="text-center align-middle">Preço</th>
            <th className="text-center align-middle">Ação</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td className="text-center align-middle">{produto.id}</td>
              <td className="text-center align-middle"><img src={produto.imagem} width="50px" alt="produto" /></td>
              <td className="text-center align-middle">{produto.categoria.nome}</td>
              <td className="align-middle ps-3">
                <Link className="fw-bold" style={{textDecoration: "none", color: "#46860bfa"}} to={"/produtos/" + produto.id}>{produto.nome}</Link> 
              </td>
              <td className="text-center align-middle">{produto.disponivel ? "Sim" : "Não"}</td>
              <td className="text-center align-middle">{dayjs(produto.dataCadastro).format("DD/MM/YYYY")}</td>
              <td className="text-end align-middle pe-3">{produto.preco.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true
              })}</td>
              <td className="text-center align-middle"><button type="button" className="btn btn-sm btn-danger">Remover</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TabelaDeProdutos;
