import type { Turma } from "./Turma";

export interface Aluno {
  id: number;
  nome: string;
  slug: string;
  email: string;
  turma: Turma;
}
