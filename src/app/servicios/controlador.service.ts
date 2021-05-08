import { Injectable, Output, EventEmitter} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ControladorService {
  debugger
  @Output() dataSponsor: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
