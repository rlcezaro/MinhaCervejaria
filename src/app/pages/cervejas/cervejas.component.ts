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

@Component({
  selector: 'app-cervejas',
  imports: [
    FormsModule,
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
  displayedColumns: string[] = ['nome', 'fabricanteId', 'estoqueId', 'descricao', 'actions']; // Added 'descricao'

  cervejas: Cerveja[] = [];
  fabricantes: Fabricante[] = [];

  cerveja: Cerveja = {
    id: 0,
    nome: '',
    fabricanteId: 0,
    estoqueId: 0,
    estilo: '',
    teorAlcoolico: 0,
    ibu: 0,
    descricao: '' // Added descricao property
  };

  constructor(private apiService: ApiService) {}

  onSubmit() {
    this.apiService.addCerveja(this.cerveja).subscribe((response) => {
      console.log('Cerveja adicionada', response);
      this.getCervejas();
    });
  }

  ngOnInit() {
    this.getCervejas();
    this.getFabricantes();
  }

  getCervejas() {
    this.apiService.getCervejas().subscribe((data: Cerveja[]) => {
      this.cervejas = data;
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

  editCerveja(cerveja: Cerveja) {
    this.apiService
      .updateCerveja(cerveja.id.toString(), cerveja)
      .subscribe((response) => {
        console.log('Cerveja atualizada', response);
        this.getCervejas();
      });
  }

  deleteCerveja(id: number) {
    this.apiService.deleteCerveja(id.toString()).subscribe((response) => {
      console.log('Cerveja deletada', response);
      this.getCervejas();
    });
  }
}
