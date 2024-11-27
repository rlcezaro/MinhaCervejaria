import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Fabricante } from '../../models/fabricante.models';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-fabricantes',
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
  templateUrl: './fabricantes.component.html',
  styleUrls: ['./fabricantes.component.css'],
})
export class FabricantesComponent implements OnInit {
  displayedColumns: string[] = [
    'nome',
    'cnpj',
    'endereco',
    'cidade',
    'estado',
    'cep',
    'telefone',
    'email',
    'status',
    'observacoes',
    'actions',
  ];

  fabricantes: Fabricante[] = [];

  fabricante: Fabricante = this.resetFabricante();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadFabricantes();
  }

  loadFabricantes() {
    this.apiService.getFabricantes().subscribe((fabricantes) => {
      this.fabricantes = fabricantes;
    });
  }

  resetFabricante(): Fabricante {
    return {
      id: 0,
      nome: '',
      cnpj: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      telefone: '',
      email: '',
      status: false,
      observacoes: '',
    };
  }

  addFabricante() {
    this.apiService.addFabricante(this.fabricante).subscribe((newFabricante) => {
      this.fabricantes.push(newFabricante);
      this.fabricante = this.resetFabricante();
    });
  }

  editFabricante(fabricante: Fabricante) {
    this.fabricante = { ...fabricante };
  }

  updateFabricante() {
    this.apiService
      .updateFabricante(this.fabricante.id.toString(), this.fabricante)
      .subscribe((updatedFabricante) => {
        const index = this.fabricantes.findIndex(
          (f) => f.id === updatedFabricante.id
        );
        if (index !== -1) {
          this.fabricantes[index] = updatedFabricante;
          this.fabricante = this.resetFabricante();
        }
      });
  }

  deleteFabricante(id: number) {
    this.apiService.deleteFabricante(id.toString()).subscribe(() => {
      this.fabricantes = this.fabricantes.filter((fabricante) => fabricante.id !== id);
    });
  }
}
