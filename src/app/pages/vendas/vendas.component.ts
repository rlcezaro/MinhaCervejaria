import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Venda } from '../../models/venda.models';
import { Cliente } from '../../models/cliente.models';
import { Cerveja } from '../../models/cerveja.model';
import { Estoque } from '../../models/estoque.model';

@Component({
  selector: 'app-vendas',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    MatOptionModule,
  ],
  providers: [ApiService],
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css'],
})
export class VendasComponent implements OnInit {
  displayedColumns: string[] = ['clienteId', 'cervejaId', 'quantidade', 'dataVenda', 'valorTotal', 'status', 'observacoes', 'actions'];

  vendas: Venda[] = [];
  clientes: Cliente[] = [];
  cervejas: Cerveja[] = [];
  estoques: Estoque[] = [];

  venda: Venda = this.resetVenda();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadVendas();
    this.getClientes();
    this.getCervejas();
    this.loadEstoques();
  }

  loadVendas() {
    this.apiService.getVendas().subscribe((vendas) => {
      this.vendas = vendas;
    });
  }

  resetVenda(): Venda {
    return {
      id: 0,
      clienteId: 0,
      cervejaId: 0,
      quantidade: 0,
      dataVenda: new Date(),
      valorTotal: 0,
      status: false,
      observacoes: '',
    };
  }

  addVenda() {
    this.apiService.getEstoqueByCervejaId(this.venda.cervejaId).subscribe((estoques) => {
      const estoque = estoques.find(e => e.cervejaId === this.venda.cervejaId);
      if (estoque && estoque.quantidade >= this.venda.quantidade) {
        this.apiService.addVenda(this.venda).subscribe((newVenda) => {
          this.vendas.push(newVenda);
          this.apiService.updateEstoqueQuantidade(estoque.id, estoque.quantidade - this.venda.quantidade).subscribe(() => {
            this.loadEstoques(); // Reload the stock to ensure the latest data
          });
          this.venda = this.resetVenda();
        });
      } else {
        alert('Quantidade insuficiente no estoque.');
      }
    });
  }

  updateEstoqueQuantidade(id: number, quantidade: number) {
    const estoque = this.estoques.find(e => e.id === id);
    if (estoque) {
      estoque.quantidade = quantidade;
      this.apiService.updateEstoque(id.toString(), estoque).subscribe(() => {
        this.loadEstoques(); // Reload the stock to ensure the latest data
      });
    }
  }

  editVenda(venda: Venda) {
    this.venda = { ...venda };
  }

  updateVenda() {
    this.apiService.updateVenda(this.venda.id.toString(), this.venda).subscribe((updatedVenda) => {
      const index = this.vendas.findIndex((v) => v.id === updatedVenda.id);
      if (index !== -1) {
        this.vendas[index] = updatedVenda;
        this.venda = this.resetVenda();
      }
    });
  }

  deleteVenda(id: number) {
    this.apiService.deleteVenda(id.toString()).subscribe(() => {
      this.vendas = this.vendas.filter((venda) => venda.id !== id);
    });
  }

  getClientes() {
    this.apiService.getClientes().subscribe((data: Cliente[]) => {
      this.clientes = data;
    });
  }

  getCervejas() {
    this.apiService.getCervejas().subscribe((data: Cerveja[]) => {
      this.cervejas = data;
    });
  }

  loadEstoques() {
    this.apiService.getEstoques().subscribe((estoques) => {
      this.estoques = estoques;
    });
  }

  getClienteNome(clienteId: number): string {
    const cliente = this.clientes.find((c) => c.id === clienteId);
    return cliente ? cliente.nome : 'Desconhecido';
  }

  getCervejaNome(cervejaId: number): string {
    const cerveja = this.cervejas.find((c) => c.id === cervejaId);
    return cerveja ? cerveja.nome : 'Desconhecido';
  }
}
