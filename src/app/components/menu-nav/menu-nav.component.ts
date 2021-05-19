import { ControladorService } from './../../servicios/controlador.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {

  constructor(private controller:ControladorService) {
    debugger
   }

  ngOnInit(): void {
    debugger
  }
  

  sesion(){
    /*this.controller.post('http://localhost:80/projects/ng/cronotec/src/app/php/authenticate.php',
    { user : localStorage.getItem("user"),
      cedula: localStorage.getItem("cedula")
    }).subscribe(data => {
      debugger
      if(data[0].estado){
        return true;
      }else{
        return false;
      }
    })*/
    return true;
    
  }

}
