export interface Venda {
  id: number;
  clienteId: number; // Foreign key to Cliente
  cervejaId: number; // Foreign key to Cerveja
  quantidade: number;
  dataVenda: Date;
  valorTotal: number;
  status: boolean;
  observacoes?: string;
}