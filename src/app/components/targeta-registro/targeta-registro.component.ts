import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControladorService } from 'src/app/servicios/controlador.service';

@Component({
  selector: 'app-targeta-registro',
  templateUrl: './targeta-registro.component.html',
  styleUrls: ['./targeta-registro.component.css']
})
export class TargetaRegistroComponent implements OnInit,AfterViewInit {
  @Input() id:any;
  @Input() open:any;
  @Output() emitClose = new EventEmitter<boolean>();


  constructor(private controller:ControladorService) { 
    //this.showCard = this.id.estado
  }
  
  ngOnInit(): void {}

  ngAfterViewInit(){

  }

  cerrar(){
    this.emitClose.emit(false);
  }

  abrir(){
  }

}
