import { ControladorService } from './servicios/controlador.service';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'cronotec';
  public datosApp:Array<any>;

  constructor(private controller:ControladorService) { 
  }

  ngOnInit(): void{
    debugger
    console.log("hola mundo acavo de nacer")
    this.datosApp = [
      {nombre: "pc1",proceso: "sistemas", fecha:"7-mayo-2021"},
      {nombre: "pc2",proceso: "sistemas", fecha:"8-mayo-2021"},
      {nombre: "pc3",proceso: "sistemas", fecha:"9-mayo-2021"},
      {nombre: "pc4",proceso: "sistemas", fecha:"10-mayo-2021"}
  ]
    this.cargarDatos()
  }


  cargarDatos(){
    debugger
    this.controller.dataSponsor.emit({
      data:this.datosApp
    })
  }

}
