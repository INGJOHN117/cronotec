import { analyzeNgModules } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ControladorService } from 'src/app/servicios/controlador.service';


@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})

export class CronogramaComponent implements OnInit {
  public listaEquipos:any;
  //@ViewChild("cronograma",{static: false}) cronograma:any;
  constructor(private controller:ControladorService, private router:Router) {
  }

  ngOnInit(): void {
    this. controller.post("http://cuisoft.co/api/getData.php",{
      user:localStorage.getItem('user'),
      cedula:localStorage.getItem('cedula'),
      dataNeeds:["cronograma"]
    }).subscribe(data=>{
      //this.cronograma.nativeElement.innerHTML = this.controller.componentLibrary("cronograma",data);
      this.listaEquipos = data[1];
      console.log(data);
    })
  }

  defineClassRow(fechap: string):string {
    let clase;
    if (fechap) {
      const fecha = new Date(fechap);
      const today = new Date();
      const diferencia = Math.abs(today.getTime() - fecha.getTime());
      const dias = (diferencia / (1000 * 60 * 60 * 24));

      if (dias > 120) {
        clase = 'rowR';
      } else if (dias <= 120 && dias > 90) {
          clase = 'rowY';
      } else if (dias <= 90) {
        clase = 'rowG';
      }
  } else {
    clase = 'rowE';
  }
    return clase;
  }

  registroSoporte(id: string){
    this.router.navigate(['registroSoporte',id])
  }

  deleteRow(id:string){
    for (let index = 0; index < this.listaEquipos.length; index++) {
      if(this.listaEquipos[index].codigoActivo == id){
        delete this.listaEquipos[index];
        @ViewChild(id) id:any;
    myobj.remove();
      }
      
    }

  }

}
