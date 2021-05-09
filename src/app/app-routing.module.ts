import { CronogramaComponent } from './components/cronograma/cronograma.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroEquipoComponent } from './components/registro-equipo/registro-equipo.component';
import { RegistroSoporteComponent } from './components/registro-soporte/registro-soporte.component';
import { HojasDeVidaComponent } from './components/hojas-de-vida/hojas-de-vida.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'cronograma/:id', component:CronogramaComponent},
  {path:'registroEquipo', component:RegistroEquipoComponent},
  {path:'registroSoporte', component:RegistroSoporteComponent},
  {path:'hojasDeVida', component:HojasDeVidaComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
