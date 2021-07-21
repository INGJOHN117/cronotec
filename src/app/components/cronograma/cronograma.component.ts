import { Component, OnInit, ViewChild, enableProdMode } from '@angular/core';
import { Router } from '@angular/router';
import { ControladorService } from 'src/app/servicios/controlador.service';


@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})

export class CronogramaComponent implements OnInit {
  public listaEquipos:any = [];
  //@ViewChild("cronograma",{static: false}) cronograma:any;
  constructor(private controller:ControladorService, private router:Router) {
  }

  ngOnInit(): void {
    this. controller.post("http://cuisoft.co/api/getData.php",{
      user:localStorage.getItem('user'),
      cedula:localStorage.getItem('cedula'),
      dataNeeds:["cronograma"]
    }).subscribe(data=>{
      console.log("DATA ==>",data);
      this.listaEquipos = data[1];
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

  prinfPdf(id:string){
    //window.location.href = "http://cuisoft.co/prinfPdf2.php/?codigoActivo="+id;
    let url = "http://cuisoft.co/api/pdf/prinfPdf.php/?codigoActivo="+id;
    window.open(url);
  }
  
}
