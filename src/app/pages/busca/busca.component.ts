import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Cliente } from '../../models/cliente.models';
import { Cerveja } from '../../models/cerveja.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {
  searchTerm: string = '';
  clientes: Cliente[] = [];
  cervejas: Cerveja[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  search() {
    if (this.searchTerm) {
      this.apiService.getClientes().subscribe((clientes) => {
        this.clientes = clientes.filter(cliente =>
          cliente.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });

      this.apiService.getCervejas().subscribe((cervejas) => {
        this.cervejas = cervejas.filter(cerveja =>
          cerveja.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    } else {
      this.clientes = [];
      this.cervejas = [];
    }
  }
}
