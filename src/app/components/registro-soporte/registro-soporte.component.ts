import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControladorService } from './../../servicios/controlador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-registro-soporte',
  templateUrl: './registro-soporte.component.html',
  styleUrls: ['./registro-soporte.component.css']
})
export class RegistroSoporteComponent implements OnInit {
  @ViewChild('canvas',{static:true}) canvas:ElementRef<HTMLCanvasElement>;
  private ctx:CanvasRenderingContext2D;

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
    this.ctx = this.canvas.nativeElement.getContext("2d");
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
    values["tableObjective"] = ["historialdemantenimiento"];
    this.controller.post("http://cuisoft.co/api/setData.php",values)
    .subscribe(
      response =>{
        console.log(response);
        debugger
      }
    )
    //alert("Inicio de sesion exitoso")
    //this.router.navigate(['cronograma']);
  }


}
