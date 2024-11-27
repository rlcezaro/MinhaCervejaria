import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Cerveja } from '../../models/cerveja.model';
import { MatOptionModule } from '@angular/material/core';
import { Fabricante } from '../../models/fabricante.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cervejas',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
  ],
  providers: [ApiService],
  templateUrl: './cervejas.component.html',
  styleUrls: ['./cervejas.component.css'],
})
export class CervejasComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'fabricanteId', 'descricao', 'actions']; // Removed 'estoqueId'

  cervejas: Cerveja[] = [];
  fabricantes: Fabricante[] = [];

  cerveja: Cerveja = this.resetCerveja();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCervejas();
    this.getFabricantes();
  }

  loadCervejas() {
    this.apiService.getCervejas().subscribe((cervejas) => {
      this.cervejas = cervejas;
    });
  }

  resetCerveja(): Cerveja {
    return {
      id: 0,
      nome: '',
      fabricanteId: 0,
      estilo: '',
      teorAlcoolico: 0,
      ibu: 0,
      descricao: '',
    };
  }

  addCerveja() {
    this.apiService.addCerveja(this.cerveja).subscribe((newCerveja) => {
      this.cervejas.push(newCerveja);
      this.cerveja = this.resetCerveja();
    });
  }

  editCerveja(cerveja: Cerveja) {
    this.cerveja = { ...cerveja };
  }

  updateCerveja() {
    this.apiService
      .updateCerveja(this.cerveja.id.toString(), this.cerveja)
      .subscribe((updatedCerveja) => {
        const index = this.cervejas.findIndex(
          (c) => c.id === updatedCerveja.id
        );
        if (index !== -1) {
          this.cervejas[index] = updatedCerveja;
          this.cerveja = this.resetCerveja();
        }
      });
  }

  deleteCerveja(id: number) {
    this.apiService.deleteCerveja(id.toString()).subscribe(() => {
      this.cervejas = this.cervejas.filter((cerveja) => cerveja.id !== id);
    });
  }

  getFabricantes() {
    this.apiService.getFabricantes().subscribe((data: Fabricante[]) => {
      this.fabricantes = data;
    });
  }

  getFabricanteNome(fabricanteId: number): string {
    const fabricante = this.fabricantes.find((f) => f.id === fabricanteId);
    return fabricante ? fabricante.nome : 'Desconhecido';
  }
}
