import type { Categoria } from "./Categoria";

export interface Produto {
  id: number;
  imagem: string;
  categoria: Categoria;
  nome: string;
  slug: string;
  descricao: string;
  disponivel: boolean;
  dataCadastro: Date;
  qtdEstoque: number;
  preco: number;
}
