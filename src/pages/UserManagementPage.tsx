import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useApi from "../hooks/useApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const userSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  role: z.enum(["USER", "ADMIN"]),
});

type UserData = z.infer<typeof userSchema>;

const UserManagementPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });

  const api = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser: UserData) => {
      const body: any = {
        nome: newUser.nome,
        email: newUser.email,
        // backend expects Portuguese field name 'senha'
        senha: newUser.password,
      };
      if (newUser.role) {
        // include both forms to maximize compatibility: single role and roles array
        body.role = newUser.role;
        body.roles = [newUser.role];
      }
      return api.post("/auth/register", body).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
      alert("Usuário cadastrado com sucesso!");
    },
  });

  const onSubmit = (data: UserData) => {
    mutation.mutate(data);
  };

  return (
    <div className="container">
      <h2>Gerenciamento de Usuários</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Cadastrar Novo Usuário</h3>
        {mutation.isError && (
          <p className="error-message">
            {JSON.stringify(
              (mutation.error as any)?.response?.data ??
                (mutation.error as any)?.message ??
                "Erro desconhecido"
            )}
          </p>
        )}
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input id="nome" type="text" {...register("nome")} />
          {errors.nome && (
            <p className="error-message">{errors.nome.message}</p>
          )}
        </div>
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
        <div className="form-group">
          <label htmlFor="role">Perfil</label>
          <select id="role" {...register("role")}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          {errors.role && (
            <p className="error-message">{errors.role.message}</p>
          )}
        </div>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Cadastrando..." : "Cadastrar Usuário"}
        </button>
      </form>
    </div>
  );
};

export default UserManagementPage;
