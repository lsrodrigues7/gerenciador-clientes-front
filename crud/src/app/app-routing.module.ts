import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { SobreComponent } from './sobre/sobre.component';
import { CidadeComponent } from './cidade/cidade.component';

const routes: Routes = [
  { path: 'sobre', component:  SobreComponent},
  { path: 'cliente', component:  ClienteComponent},
  { path: 'cidade', component:  CidadeComponent},
  // { path: '', component:  SobreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
