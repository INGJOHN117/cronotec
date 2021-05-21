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
    this.controller.post("http://cuisoft.co/api/authenticate.php",{
      user:localStorage.getItem('user'),
      cedula: localStorage.getItem('cedula')
    })
    .subscribe(data => {
      if(data[0].estado){
        this.sesion = true;
      }else{
        this.sesion = false;
      }
    },error =>{
      console.log(error);
    })
  }

  logout(){
    localStorage.clear();
    this.sesion=false;
    //location.href = "/login";
  }

}
