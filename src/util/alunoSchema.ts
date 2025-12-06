import { z } from "zod";

export const alunoSchema = z.object({
  matricula: z.string().min(1, "Matrícula obrigatória"),
  nome: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Email inválido"), 
  curso: z.string().min(1, "Curso obrigatório"),
});

export type AlunoFormValues = z.infer<typeof alunoSchema>;
