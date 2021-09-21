import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControladorService } from 'src/app/servicios/controlador.service';

@Component({
  selector: 'app-targeta-registro',
  templateUrl: './targeta-registro.component.html',
  styleUrls: ['./targeta-registro.component.css']
})
export class TargetaRegistroComponent implements OnInit,AfterViewInit {
  public item:any;
  public visible:boolean = true;
  public key:string;
  public switchButton:boolean = false;
  @ViewChild('tipoevento') tipoeventoo:any;
  @ViewChild('archivo') archivo:HTMLElement;
  @ViewChild('descripcion') descripcion:HTMLElement;
  

  constructor(private controller:ControladorService) { 
     [this.item, this.visible, this.key] = this.controller.dataTarget;
  }
  
  ngOnInit(): void {}

  ngAfterViewInit(){}

  cerrar(){this.visible = false}

  getText(){
    switch(this.key){
      case 'VEHICULO':
        return 'DESVINCULAR';
        break;
      case 'GPS':
        return 'RETIRAR GPS'
        break;
      case 'WIFI':
        return 'DESACTIVAR LINEA'
        break;
    }
  }

  enableButtons(){
    this.switchButton = true;
  }

  
  guardarRegistro(){
    this.controller.post("http://cuisoft.co/api/insertData.php",{
      user:localStorage.getItem('user'),
      cedula:localStorage.getItem('cedula'),
      tableObjective:"eventosFacturacion"
    })
    .subscribe(data =>{
      console.log(data);
    })
  }

}
