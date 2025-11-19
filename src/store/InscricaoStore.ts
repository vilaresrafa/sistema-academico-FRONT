// src/store/inscricaoStore.ts
import { create } from "zustand";

type InscricaoState = {
  disciplinaId: number | null;
  turmaId: number | null;
  alunoId: number | null;
  filtro: string; // usado pela Pesquisa

  // setters
  setDisciplinaId: (id: number | null) => void;
  setTurmaId: (id: number | null) => void;
  setAlunoId: (id: number | null) => void;
  setFiltro: (f: string) => void;

  // função utilitária usada pelo InscricaoForm ao inscrever um aluno
  resetAluno: () => void;
};

export const useInscricaoStore = create<InscricaoState>((set) => ({
  disciplinaId: null,
  turmaId: null,
  alunoId: null,
  filtro: "",

  setDisciplinaId: (id) =>
    set(() => ({
      disciplinaId: id,
      // se mudar disciplina → limpa tudo que depende dela
      turmaId: null,
      alunoId: null,
      filtro: "",
    })),

  setTurmaId: (id) =>
    set(() => ({
      turmaId: id,
      // se mudar turma → limpa aluno selecionado e filtro
      alunoId: null,
      filtro: "",
    })),

  setAlunoId: (id) => set({ alunoId: id }),
  setFiltro: (f) => set({ filtro: f }),

  resetAluno: () => set({ alunoId: null }),
}));
