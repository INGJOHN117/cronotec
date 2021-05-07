import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-soporte',
  templateUrl: './registro-soporte.component.html',
  styleUrls: ['./registro-soporte.component.css']
})
export class RegistroSoporteComponent implements OnInit {

  public datos:string;

  constructor() { }

  ngOnInit(): void {
    console.log("SE CARGA EL REGISTRO SOPORTE")
  }

}
