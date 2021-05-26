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
    let  texto = `<tr><td valign="top">&nbsp;</td><td><a href="'n-Verlore-Verstand-%5bENG%5d%5bPLAZA%5d-(Torrent).torrent">'n-Verlore-Verstand-..&gt;</a></td><td align="right">2020-07-06 22:33  </td><td align="right"> 15K</td><td>&nbsp;</td></tr>`;
    console.log(texto.split('"'));
    //this.router.navigate(['registroSoporte',id])
  }

  
}
