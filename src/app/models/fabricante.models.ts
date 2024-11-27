export interface Fabricante {
  id: number;
  nome: string;
  cnpj: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
  status: boolean;
  observacoes?: string;
}