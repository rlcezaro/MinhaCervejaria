import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cerveja } from '../models/cerveja.model';
import { Fabricante } from '../models/fabricante.models';
import { Cliente } from '../models/cliente.models';

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

  getEstoques(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/estoque`);
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

  // Outros métodos...
}
