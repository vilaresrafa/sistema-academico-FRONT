import { useForm } from "react-hook-form";
import useUsuarioStore from "../store/InscricaoStore";
import type { TokenResponse } from "../interfaces/TokenResponse";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useEfetuarInscricao from "../hooks/useEfetuarInscricao";

interface FormInscricao {
  conta: string;
  senha: string;
}

const InscricaoForm = () => {
  const setUsuarioLogado = useUsuarioStore((s) => s.setUsuarioLogado);
  const [inscricaoInvalido, setInscricaoInvalido] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUsuarioLogado(0);
  }, []);

  const { register, handleSubmit } = useForm<FormInscricao>();
  const { mutate: efetuarInscricao, error: errorEfetuarInscricao } =
    useEfetuarInscricao();
  console.log(register("conta"));

  const submit = ({ conta, senha }: FormInscricao) => {
    const usuario: Usuario = { conta, senha };
    efetuarInscricao(usuario, {
      onSuccess: (tokenResponse: TokenResponse) => {
        if (tokenResponse.token) {
          setUsuarioLogado(tokenResponse.token);
          if (location.state?.destino) {
            navigate(location.state.destino);
          } else {
            navigate("/");
          }
        } else {
          setInscricaoInvalido(true);
        }
      },
    });
  };

  if (errorEfetuarInscricao) throw errorEfetuarInscricao;

  return (
    <form autoComplete="off" onSubmit={handleSubmit(submit)}>
      <div className="row">
        <div className="col-lg-6">
          {inscricaoInvalido && (
            <div className="alert alert-danger fw-bold" role="alert">
              Inscricao inválido!
            </div>
          )}
        </div>
      </div>
      <div className="row mb-2">
        <label htmlFor="conta" className="col-lg-1 fw-bold mb-2">
          Conta
        </label>
        <div className="col-lg-5">
          <input
            {...register("conta")}
            type="text"
            id="conta"
            className="form-control form-control-sm"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="senha" className="col-lg-1 fw-bold mb-2">
          Senha
        </label>
        <div className="col-lg-5">
          <input
            {...register("senha")}
            type="password"
            id="senha"
            className="form-control form-control-sm"
          />
        </div>
      </div>

      <div className="row">
        <div className="offset-lg-1 col-lg-5">
          <button type="submit" className="btn btn-outline-success">
            Entrar
          </button>
        </div>
      </div>
    </form>
  );
};
export default InscricaoForm;
