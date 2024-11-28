import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CervejasComponent } from './pages/cervejas/cervejas.component';
import { FabricantesComponent } from './pages/fabricantes/fabricantes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { BuscaComponent } from './pages/busca/busca.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'cervejas', component: CervejasComponent },
  { path: 'fabricantes', component: FabricantesComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'vendas', component: VendasComponent },
  { path: 'estoque', component: EstoqueComponent },
  { path: 'busca', component: BuscaComponent },
  { path: 'relatorios', component: RelatoriosComponent },
];
