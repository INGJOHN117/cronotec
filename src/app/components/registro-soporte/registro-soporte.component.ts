import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControladorService } from './../../servicios/controlador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-soporte',
  templateUrl: './registro-soporte.component.html',
  styleUrls: ['./registro-soporte.component.css']
})
export class RegistroSoporteComponent implements OnInit {

  public codigoActivo:string;
  public dataJson:any;
  registroSoporteForm:FormGroup;

  constructor(private controller: ControladorService, private router:Router, private route: ActivatedRoute, private _builder:FormBuilder) { 
    this.codigoActivo = route.snapshot.paramMap.get('codigoActivo');
    this.registroSoporteForm = _builder.group({
      fecharealizacion:["",Validators.required],
      realizo:["",Validators.required],
      observaciones:["",Validators.required],
      usrresponsable:["",Validators.required],
      dataImagen:["",Validators.required]
    })
  }

  ngOnInit(): void {
    this.controller.post("http://cuisoft.co/api/getData.php",{
      user:localStorage.getItem('user'),
      cedula:localStorage.getItem('cedula'),
      dataNeeds:["registroSoporte",this.codigoActivo,"sistemas"]
    }).subscribe(datas=>{
      this.dataJson = datas;
    })
  }

  guardarRegistro(values){
    values["user"] = localStorage.getItem('user');
    values["cedula"] = localStorage.getItem('cedula');
    this.controller.post("ulr",values)
    alert("Inicio de sesion exitoso")
    this.router.navigate(['cronograma']);
  }
}
