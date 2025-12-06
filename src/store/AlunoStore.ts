import { create } from "zustand";
import type { Aluno } from "../interfaces/Aluno";

interface AlunoStore {
  pagina: number;
  tamanho: number;
  nome: string;
  mensagem: string;
  alunoSelecionado: Aluno | null;

  setPagina: (novaPagina: number) => void;
  setNome: (novoNome: string) => void;
  setMensagem: (msg: string) => void;
  setAlunoSelecionado: (aluno: Aluno | null) => void;
}

const useAlunoStore = create<AlunoStore>((set) => ({
  pagina: 0,
  tamanho: 5,
  nome: "",
  mensagem: "",
  alunoSelecionado: null,

  setPagina: (p) => set({ pagina: p }),
  setNome: (n) => set({ nome: n }),
  setMensagem: (m) => set({ mensagem: m }),
  setAlunoSelecionado: (a) => set({ alunoSelecionado: a }),
}));

export default useAlunoStore;
