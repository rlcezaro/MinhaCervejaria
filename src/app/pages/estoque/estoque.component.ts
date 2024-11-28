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
import { Estoque } from '../../models/estoque.model';
import { Cerveja } from '../../models/cerveja.model';

@Component({
  selector: 'app-estoque',
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
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css'],
})
export class EstoqueComponent implements OnInit {
  displayedColumns: string[] = [
    'cervejaId',
    'quantidade',
    'dataEntrada',
    'dataValidade',
    'status',
    'observacoes',
    'actions',
  ];

  estoques: Estoque[] = [];
  cervejas: Cerveja[] = [];

  estoque: Estoque = this.resetEstoque();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadEstoques();
    this.getCervejas();
  }

  loadEstoques() {
    this.apiService.getEstoques().subscribe((estoques) => {
      this.estoques = estoques;
    });
  }

  resetEstoque(): Estoque {
    return {
      id: 0,
      cervejaId: 0,
      quantidade: 0,
      dataEntrada: new Date(),
      dataValidade: new Date(),
      status: false,
      observacoes: '',
    };
  }

  addEstoque() {
    this.apiService.addEstoque(this.estoque).subscribe((newEstoque) => {
      this.estoques.push(newEstoque);
      this.estoque = this.resetEstoque();
    });
  }

  editEstoque(estoque: Estoque) {
    this.estoque = { ...estoque };
  }

  updateEstoque() {
    this.apiService
      .updateEstoque(this.estoque.id.toString(), this.estoque)
      .subscribe((updatedEstoque) => {
        const index = this.estoques.findIndex(
          (e) => e.id === updatedEstoque.id
        );
        if (index !== -1) {
          this.estoques[index] = updatedEstoque;
          this.estoque = this.resetEstoque();
        }
      });
  }

  deleteEstoque(id: number) {
    this.apiService.deleteEstoque(id.toString()).subscribe(() => {
      this.estoques = this.estoques.filter((estoque) => estoque.id !== id);
    });
  }

  getCervejas() {
    this.apiService.getCervejas().subscribe((data: Cerveja[]) => {
      this.cervejas = data;
    });
  }

  getCervejaNome(cervejaId: number): string {
    const cerveja = this.cervejas.find((c) => c.id === cervejaId);
    return cerveja ? cerveja.nome : 'Desconhecido';
  }
}
