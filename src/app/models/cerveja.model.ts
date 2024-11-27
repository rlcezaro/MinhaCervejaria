export interface Cerveja {
  id: number;
  nome: string;
  fabricanteId: number; // Foreign key to Fabricante
  estilo: string;
  teorAlcoolico: number;
  ibu: number;
  descricao?: string;
  // Removed estoqueId
}
