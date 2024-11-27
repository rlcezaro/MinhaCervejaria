import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { A } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = this.resetCliente();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.apiService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  resetCliente(): Cliente {
    return {
      id: 0,
      nome: '',
      email: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      cpf: '',
      dataNascimento: new Date(),
      sexo: '',
      status: true,
      observacoes: '',
    };
  }

  addCliente() {
    this.apiService.addCliente(this.cliente).subscribe((newCliente) => {
      this.clientes.push(newCliente);
      this.cliente = this.resetCliente();
    });
  }

  editCliente(cliente: Cliente) {
    this.cliente = { ...cliente };
  }

  updateCliente() {
    this.apiService.updateCliente(this.cliente.id, this.cliente).subscribe((updatedCliente) => {
      const index = this.clientes.findIndex((c) => c.id === updatedCliente.id);
      if (index !== -1) {
        this.clientes[index] = updatedCliente;
        this.cliente = this.resetCliente();
      }
    });
  }

  deleteCliente(id: number) {
    this.apiService.deleteCliente(id).subscribe(() => {
      this.clientes = this.clientes.filter((cliente) => cliente.id !== id);
    });
  }
}
