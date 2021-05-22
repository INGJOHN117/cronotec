import { Component, OnInit, ViewChild } from '@angular/core';
import { ControladorService } from 'src/app/servicios/controlador.service';


@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})

export class CronogramaComponent implements OnInit {
  public listaEquipos:any;
  //@ViewChild("cronograma",{static: false}) cronograma:any;
  constructor(private controller:ControladorService) {
  }

  ngOnInit(): void {
    this. controller.post("http://cuisoft.co/api/getData.php",{
      user:localStorage.getItem('user'),
      cedula:localStorage.getItem('cedula'),
      dataNeeds:["cronograma"]
    }).subscribe(data=>{
      //this.cronograma.nativeElement.innerHTML = this.controller.componentLibrary("cronograma",data);
      this.listaEquipos = data[1];
      console.log(this.listaEquipos);
    })
  }

  defineClassRow(fecha:string):string {
    console.log(fecha);
    let clase = "rowG";
    return clase;
  }

}
