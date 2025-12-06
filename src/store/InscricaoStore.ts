// src/store/InscricaoStore.ts
import { create } from "zustand";

type InscricaoState = {
  disciplinaId: number | null;
  turmaId: number | null;
  alunoId: number | null;
  filtro: string;
  pagina: number;


  setDisciplinaId: (id: number | null) => void;
  setTurmaId: (id: number | null) => void;
  setAlunoId: (id: number | null) => void;
  setFiltro: (f: string) => void;
  setPagina: (p: number) => void;

  resetAluno: () => void;
};

export const useInscricaoStore = create<InscricaoState>((set) => ({
  disciplinaId: null,
  turmaId: null,
  alunoId: null,
  filtro: "",
  pagina: 0,

  setDisciplinaId: (id) =>
    set(() => ({
      disciplinaId: id,
      turmaId: null,
      alunoId: null,
      filtro: "",
      pagina: 0,
    })),

  setTurmaId: (id) =>
    set(() => ({
      turmaId: id,
      alunoId: null,
      filtro: "",
      pagina: 0,
    })),

  setAlunoId: (id) => set({ alunoId: id }),

  setFiltro: (f) => set({ filtro: f, pagina: 0 }),

  setPagina: (p) => set({ pagina: p }),

  resetAluno: () => set({ alunoId: null }),
}));
