import TabelaDeProdutos from "../components/TabelaDeProdutos";
import useRecuperarProdutos from "../hooks/useRecuperarProdutos";

const ProdutosPage = () => {
  const {
    data: produtos,
    isPending: recuperandoProdutos,
    error: errorRecuperarProdutos,
  } = useRecuperarProdutos();

  if (errorRecuperarProdutos) throw errorRecuperarProdutos;
  if (recuperandoProdutos) return <p>Recuperando produtos...</p>;

  return (
    <>
      <h5>Lista de Produtos</h5>
      <hr className="mt-1" />

      <TabelaDeProdutos produtos={produtos} />
    </>
  );
};
export default ProdutosPage;
