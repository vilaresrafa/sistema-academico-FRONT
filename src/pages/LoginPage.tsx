import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import { useMutation } from "@tanstack/react-query";
import "./Login.css";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const { login, error, setError } = useAuthStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: LoginData) => login(data.email, data.password),
    onSuccess: (ok: any) => {
      if (ok) {
        setError(null);
        navigate("/");
      }
    },
  });

  const onSubmit = (data: LoginData) => {
    mutation.mutate(data);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>Login</h2>
        {(error || (mutation.isError && (mutation.error as any)?.message)) && (
          <p className="error-message">
            {error || (mutation.error as any)?.message}
          </p>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Entrando..." : "Entrar"}
        </button>
        <p>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
