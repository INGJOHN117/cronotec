import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hojas-de-vida',
  templateUrl: './hojas-de-vida.component.html',
  styleUrls: ['./hojas-de-vida.component.css']
})
export class HojasDeVidaComponent implements OnInit {

  public datos:string;

  constructor() { }

  ngOnInit(): void {
    console.log("SE CARGA EL HOJAS DE VIDA")
  }

}
