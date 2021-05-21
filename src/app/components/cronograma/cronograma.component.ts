import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ControladorService } from 'src/app/servicios/controlador.service';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})

export class CronogramaComponent implements OnInit {
  cronogramaHtml:string;
  //@ViewChild("cronograma",{static:false}) cronograma:HTMLDivElement;

  constructor(private controller:ControladorService) {
    this. controller.post("http://cuisoft.co/api/getData.php",{
      user:localStorage.getItem('user'),
      cedula:localStorage.getItem('cedula'),
      dataNeeds:["cronograma"]
    }).subscribe(data=>{
      //this.cronograma.innerHTML = controller.componentLibrary("cronograma",data);
      //console.log(controller.componentLibrary("cronograma",data));
      this.cronogramaHtml = controller.componentLibrary("cronograma",data);
    })
  }

  ngOnInit(): void {}

}
