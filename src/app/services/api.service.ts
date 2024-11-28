import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cerveja } from '../models/cerveja.model';
import { Fabricante } from '../models/fabricante.models';
import { Cliente } from '../models/cliente.models';
import { Estoque } from '../models/estoque.model';
import { Venda } from '../models/venda.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  addCerveja(cerveja: Cerveja): Observable<Cerveja> {
    return this.http.post<Cerveja>(`${this.baseUrl}/cervejas`, cerveja);
  }

  getCervejas(): Observable<Cerveja[]> {
    return this.http.get<Cerveja[]>(`${this.baseUrl}/cervejas`);
  }

  getCervejaById(id: string): Observable<Cerveja> {
    return this.http.get<Cerveja>(`${this.baseUrl}/cervejas/${id}`);
  }

  updateCerveja(id: string, cerveja: Cerveja): Observable<Cerveja> {
    return this.http.put<Cerveja>(`${this.baseUrl}/cervejas/${id}`, cerveja);
  }

  deleteCerveja(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cervejas/${id}`);
  }

  getFabricantes(): Observable<Fabricante[]> {
    return this.http.get<Fabricante[]>(`${this.baseUrl}/fabricantes`);
  }

  addFabricante(fabricante: Fabricante): Observable<Fabricante> {
    return this.http.post<Fabricante>(`${this.baseUrl}/fabricantes`, fabricante);
  }

  updateFabricante(id: string, fabricante: Fabricante): Observable<Fabricante> {
    return this.http.put<Fabricante>(`${this.baseUrl}/fabricantes/${id}`, fabricante);
  }

  deleteFabricante(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/fabricantes/${id}`);
  }

  getEstoques(): Observable<Estoque[]> {
    return this.http.get<Estoque[]>(`${this.baseUrl}/estoques`);
  }

  addEstoque(estoque: Estoque): Observable<Estoque> {
    return this.http.post<Estoque>(`${this.baseUrl}/estoques`, estoque);
  }

  updateEstoque(id: string, estoque: Estoque): Observable<Estoque> {
    return this.http.put<Estoque>(`${this.baseUrl}/estoques/${id}`, estoque);
  }

  deleteEstoque(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/estoques/${id}`);
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/clientes`, cliente);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/clientes`);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/clientes/${id}`);
  }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/clientes/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/clientes/${id}`);
  }

  getVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(`${this.baseUrl}/vendas`);
  }

  addVenda(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(`${this.baseUrl}/vendas`, venda);
  }

  updateVenda(id: string, venda: Venda): Observable<Venda> {
    return this.http.put<Venda>(`${this.baseUrl}/vendas/${id}`, venda);
  }

  deleteVenda(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/vendas/${id}`);
  }

  // Outros métodos...
}
