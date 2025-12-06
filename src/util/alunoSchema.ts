import { z } from "zod";

export const alunoSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email obrigatório"),
  matricula: z.string().optional(),
  curso: z.string().optional(),
});

export type AlunoFormValues = z.infer<typeof alunoSchema>;
