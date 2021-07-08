import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ControladorService } from 'src/app/servicios/controlador.service';

@Component({
  selector: 'app-hojas-de-vida',
  templateUrl: './hojas-de-vida.component.html',
  styleUrls: ['./hojas-de-vida.component.css']
})
export class HojasDeVidaComponent implements OnInit {
  formulario:FormGroup;

  constructor(private _builder:FormBuilder) {
    this.formulario = this._builder.group({
      nombre:["",Validators.required],
      proveedor:["",Validators.required],
      db:["",Validators.required]
    })
   }

  ngOnInit(): void {
  }

  enviar(value){

  }
}
