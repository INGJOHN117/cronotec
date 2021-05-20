
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ControladorService } from 'src/app/servicios/controlador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:FormGroup;

  constructor(private _builder:FormBuilder, private controller:ControladorService) {
    this.loginForm = this._builder.group({
      user:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(values){ 
    this.controller.post("http://localhost:80/projects/ng/cronotec/src/app/php/authenticate.php",values).subscribe(response =>{
      if(response[0].estado){
        localStorage.setItem("user",response[0].nombre);
        localStorage.setItem("cedula",response[0].cedula);
        alert("Inicio de sesion exitoso")
        location.href = "/login";
      }else{
        alert("usuario o contraseña incorrecto")
        location.href = "/login";
      }  
  })

  }


}

