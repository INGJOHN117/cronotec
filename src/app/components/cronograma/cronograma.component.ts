import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {
  public datos:string;
  @Input() dataToCronograma:Array<any>;
  constructor() { }

  ngOnInit(): void {
    console.log("SE CARGA EL CRONOGRAMA");
    console.log("datos entrantes",this.dataToCronograma);
  }

}
