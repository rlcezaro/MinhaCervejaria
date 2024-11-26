import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  addCerveja(cerveja: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cervejas`, cerveja);
  }

  getCervejas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cervejas`);
  }

  getCervejaById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/cervejas/${id}`);
  }

  updateCerveja(id: string, cerveja: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/cervejas/${id}`, cerveja);
  }

  deleteCerveja(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cervejas/${id}`);
  }

  // Outros métodos...
}
