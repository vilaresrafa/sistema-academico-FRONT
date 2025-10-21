import type { Professor } from "./Professor";

export interface Turma {
  id: number;
  ano: number;
  periodo: number;
  professor: Professor;
}
