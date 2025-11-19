import { create } from "zustand";

interface AlunoInscricaoStore {
  disciplinaId: number | null;
  turmaId: number | null;
  alunoId: number | null;

  setDisciplinaId: (id: number | null) => void;
  setTurmaId: (id: number | null) => void;
  setAlunoId: (id: number | null) => void;
}

const useAlunoInscricaoStore = create<AlunoInscricaoStore>((set) => ({
  disciplinaId: null,
  turmaId: null,
  alunoId: null,

  setDisciplinaId: (id) => set({ disciplinaId: id, turmaId: null, alunoId: null }),
  setTurmaId: (id) => set({ turmaId: id, alunoId: null }),
  setAlunoId: (id) => set({ alunoId: id }),
}));

export default useAlunoInscricaoStore;
