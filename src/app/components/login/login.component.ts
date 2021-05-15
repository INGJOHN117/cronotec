import { ControladorService } from 'src/app/servicios/controlador.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public datos:string;

  constructor(private mycontroller:ControladorService) { }

  public sendData(){
  
    this.mycontroller.post("http://localhost/projects/ng/cronotec/src/app/php/api.php",
    {
      datos: 'hola mundo',
    }
    )
    .subscribe(respuesta => {
      console.log(respuesta)
    })
  }


}
