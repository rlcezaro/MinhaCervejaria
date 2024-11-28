import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Cliente } from '../../models/cliente.models';
import { Cerveja } from '../../models/cerveja.model';
import { Estoque } from '../../models/estoque.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {
  clientes: Cliente[] = [];
  cervejas: Cerveja[] = [];
  estoques: Estoque[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadClientes();
    this.loadCervejas();
    this.loadEstoques();
  }

  loadClientes() {
    this.apiService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  loadCervejas() {
    this.apiService.getCervejas().subscribe((cervejas) => {
      this.cervejas = cervejas;
    });
  }

  loadEstoques() {
    this.apiService.getEstoques().subscribe((estoques) => {
      this.estoques = estoques;
    });
  }
}
