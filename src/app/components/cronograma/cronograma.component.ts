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
    console.log('entramossss');
    debugger
    console.log('fsdfdsfdsfdsfsdf' , this.controller.emisor());
    

    this.controller.dataSponsor.subscribe(data =>{
      console.log("datos en cronograma ",data)
      this.dataToCronograma.push(data);
      
    })
  }

}
