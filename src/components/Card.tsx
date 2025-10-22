import type { Aluno } from "../interfaces/Aluno";

interface Props {
    aluno: Aluno;
}

const Card = ({aluno}: Props) => {
  return (
    <div className="card h-100 border-0">
      <div className="card-body">
        <h5 className="card-title">{aluno.nome}</h5>
        <p className="card-text">{aluno.email}</p>
      </div>
    </div>
  )
}
export default Card