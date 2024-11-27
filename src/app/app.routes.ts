import { Routes } from '@angular/router';
import { CervejasComponent } from './pages/cervejas/cervejas.component';
import { FabricantesComponent } from './pages/fabricantes/fabricantes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { BuscaComponent } from './pages/busca/busca.component';
import { NavigationComponent } from './pages/navigation/navigation.component';

export const routes: Routes = [
  { path: '', component: NavigationComponent },
  { path: 'cervejas', component: CervejasComponent },
  { path: 'fabricantes', component: FabricantesComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'vendas', component: VendasComponent },
  { path: 'estoque', component: EstoqueComponent },
  { path: 'busca', component: BuscaComponent },
];
