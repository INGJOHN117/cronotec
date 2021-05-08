import { ControladorService } from './../../servicios/controlador.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {
  public dataToCronograma:Array<any> = [];

  constructor(private controller:ControladorService) { }

  ngOnInit(): void {
    debugger
    console.log("SE CARGA EL CRONOGRAMA");
    this.controller.dataSponsor.subscribe(data =>{
      this.dataToCronograma.push(data);
      console.log(data)
    })
  }

}
