import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import './Register.css';

const registerSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type RegisterData = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });
  const { register: registerUser, error } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterData) => {
    const success = await registerUser(data.nome, data.email, data.password);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <h2>Cadastro</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input id="nome" type="text" {...register('nome')} />
          {errors.nome && <p className="error-message">{errors.nome.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <button type="submit">Cadastrar</button>
        <p>
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
