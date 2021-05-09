import { Injectable, Output, EventEmitter} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ControladorService {
  @Output() dataSponsor: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log("entro a servicio0");
   }

   emisor = () => {
     return this.dataSponsor

   }
}
