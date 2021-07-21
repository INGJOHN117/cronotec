import { ControladorService } from './../../servicios/controlador.service';
import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {
  sesion:boolean = false;
  @Output() emitSession = new EventEmitter<boolean>();

  constructor(private controller:ControladorService) {

  }

  ngOnInit(): void {
    this.controller.post("http://cuisoft.co/api/authenticate.php",{
      user:localStorage.getItem('user'),
      cedula: localStorage.getItem('cedula')
    })
    .subscribe(data => {
      if(data[0].estado){
        this.sesion = data[0].estado;

      }else{
        this.sesion = data[0].estado;
      }
    },error =>{
      console.log(error);
    })
  }

  logout(){
    localStorage.clear();
    this.sesion=false;
    this.emitSession.emit(false);
  }

}
