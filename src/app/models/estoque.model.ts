export interface Estoque {
  id: number;
  cervejaId: number; // Foreign key to Cerveja
  quantidade: number;
  dataEntrada: Date;
  dataValidade: Date;
  status: boolean;
  observacoes?: string;
}