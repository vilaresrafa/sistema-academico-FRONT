import TabelaDeAlunos from "../components/TabelaDeAlunos";
import useRecuperarAlunos from "../hooks/useRecuperarAlunos";

const AlunosPage = () => {
  const {
    data: alunos,
    isPending: recuperandoAlunos,
    error: errorRecuperarAlunos,
  } = useRecuperarAlunos();

  if (errorRecuperarAlunos) throw errorRecuperarAlunos;
  if (recuperandoAlunos) return <p>Recuperando Alunos...</p>;

  return (
    <>
      <h5>Lista de Alunos</h5>
      <hr className="mt-1" />

      <TabelaDeAlunos alunos={alunos} tratarRemocao={function (id: number): void {
        throw new Error("Function not implemented.");
      } } />
    </>
  );
};
export default AlunosPage;
