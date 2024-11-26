import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Cerveja } from '../models/cerveja.model';

@Component({
  selector: 'app-cervejas',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
  ],
  providers: [ApiService],
  templateUrl: './cervejas.component.html',
  styleUrls: ['./cervejas.component.css'],
})


export class CervejasComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'fabricante', 'estoque', 'actions'];

  cervejas: Cerveja[] = [];

  cerveja: Cerveja = {
    id: 0,
    nome: '',
    fabricante: '',
    estoque: 0,
    estilo: '',
    teorAlcoolico: 0,
    ibu: 0,
  };

  constructor(private apiService: ApiService) {}

  onSubmit() {
    this.apiService.addCerveja(this.cerveja).subscribe((response) => {
      console.log('Cerveja adicionada', response);
    });
  }

  ngOnInit() {
    this.getCervejas();
  }

  getCervejas() {
    this.apiService.getCervejas().subscribe((data: any[]) => {
      this.cervejas = data;
    });
  }

  editCerveja(cerveja: any) {
    this.apiService.updateCerveja(cerveja.id, cerveja).subscribe((response) => {
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
