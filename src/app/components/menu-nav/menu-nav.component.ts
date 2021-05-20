import { ControladorService } from './../../servicios/controlador.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {
  sesion:boolean = false;

  constructor(private controller:ControladorService) {
    console.log("CONSTRUCTOR NAV");
    
  }

  ngOnInit(): void {
    console.log("ngOnInit NAV");
    debugger
    this.controller.searchSession()
    .subscribe(data => {
      debugger
      if(data[0].estado){
        this.sesion = true;
      }else{
        this.sesion = false;
      }
    },error =>{
      console.log(error);
      
    })
   
  }


}
