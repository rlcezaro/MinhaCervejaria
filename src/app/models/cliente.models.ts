export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  cpf: string;
  dataNascimento: Date;
  sexo: string;
  status: boolean;
  observacoes?: string;
}