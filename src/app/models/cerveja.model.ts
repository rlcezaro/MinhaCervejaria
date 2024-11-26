export interface Cerveja {
  id: number;
  nome: string;
  fabricante: string;
  estilo: string;
  teorAlcoolico: number;
  ibu: number;
  descricao?: string;
  estoque: number;
}
