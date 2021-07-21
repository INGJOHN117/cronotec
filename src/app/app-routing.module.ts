import { CronogramaComponent } from './components/cronograma/cronograma.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroEquipoComponent } from './components/registro-equipo/registro-equipo.component';
import { RegistroSoporteComponent } from './components/registro-soporte/registro-soporte.component';
import { HojasDeVidaComponent } from './components/hojas-de-vida/hojas-de-vida.component';
import { LoginComponent } from './components/login/login.component';
import { HojaDeVidaComponent } from './components/hoja-de-vida/hoja-de-vida.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';

const routes: Routes = [
  {path:'cronograma', component:CronogramaComponent},
  //{path:'login', component:LoginComponent},
  {path:'registroEquipo', component:RegistroEquipoComponent},
  {path:'registroSoporte/:codigoActivo', component:RegistroSoporteComponent},
  {path:'hojasDeVida', component:HojasDeVidaComponent},
  {path:'hojaDeVida/:codigoActivo', component:HojaDeVidaComponent},
  {path:'vehiculos', component:VehiculosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
