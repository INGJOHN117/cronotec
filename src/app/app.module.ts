import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { CronogramaComponent } from './components/cronograma/cronograma.component';
import { RegistroSoporteComponent } from './components/registro-soporte/registro-soporte.component';
import { RegistroEquipoComponent } from './components/registro-equipo/registro-equipo.component';
import { LoginComponent } from './components/login/login.component';
import { HojasDeVidaComponent } from './components/hojas-de-vida/hojas-de-vida.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HojaDeVidaComponent } from './components/hoja-de-vida/hoja-de-vida.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { TargetaRegistroComponent } from './components/targeta-registro/targeta-registro.component';
import { TablaDinamicaComponent } from './components/tabla-dinamica/tabla-dinamica.component';
import { DinamicHostDirective } from './directives/dinamic-host.directive';


@NgModule({
  declarations: [
    AppComponent,
    MenuNavComponent,
    CronogramaComponent,
    RegistroSoporteComponent,
    RegistroEquipoComponent,
    LoginComponent,
    HojasDeVidaComponent,
    HojaDeVidaComponent,
    VehiculosComponent,
    TargetaRegistroComponent,
    TablaDinamicaComponent,
    DinamicHostDirective
  ],
  entryComponents: [TablaDinamicaComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
