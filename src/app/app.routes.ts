import { Routes } from '@angular/router';
import { CervejasComponent } from './cervejas/cervejas.component';
import { FabricantesComponent } from './fabricantes/fabricantes.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VendasComponent } from './vendas/vendas.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { BuscaComponent } from './busca/busca.component';
import { NavigationComponent } from './navigation/navigation.component';

export const routes: Routes = [
  { path: '', component: NavigationComponent },
  { path: 'cervejas', component: CervejasComponent },
  { path: 'fabricantes', component: FabricantesComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'vendas', component: VendasComponent },
  { path: 'estoque', component: EstoqueComponent },
  { path: 'busca', component: BuscaComponent },
];
