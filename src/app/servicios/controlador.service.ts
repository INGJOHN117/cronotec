import { Injectable, Output, EventEmitter} from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ControladorService {
  //@Output() dataSponsor: EventEmitter<any> = new EventEmitter();
  public datosApp:Array<any> = [];
  constructor() { }

  loadData(){
    this.datosApp = [
      {nombre: "pc1",proceso: "sistemas", fecha:"7-mayo-2021"},
      {nombre: "pc2",proceso: "sistemas", fecha:"8-mayo-2021"},
      {nombre: "pc3",proceso: "sistemas", fecha:"9-mayo-2021"},
      {nombre: "pc4",proceso: "sistemas", fecha:"10-mayo-2021"}
    ]

    return this.datosApp
  }

}
