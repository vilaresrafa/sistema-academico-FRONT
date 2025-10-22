import { useParams } from "react-router-dom";

const CardsPorSlugTurma = () => {
  const { slugTurma } = useParams();
  return (
    <>
      <h5>
        {slugTurma
          ? slugTurma.charAt(0).toUpperCase() + slugTurma.slice(1)
          : "Alunos"}
      </h5>
    </>
  );
};
export default CardsPorSlugTurma;
