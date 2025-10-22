import type { Professor } from "./Professor";

export interface Turma {
  id: number;
  nome: string;
  slug: string;
  ano: number;
  periodo: number;
  professor: Professor;
}
