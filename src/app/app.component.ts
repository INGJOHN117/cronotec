import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'cronotec';
  sesion:boolean = false;
  constructor(private router:Router) {}

  ngOnInit(): void{
    if(localStorage.getItem("user") && localStorage.getItem("cedula")){
      /* this.controller.post("http://cuisoft.co/api/authenticate.php",values).subscribe(response =>{
      if(response[0].estado){
        this.emitSession.emit(true)
      }else{
        alert("usuario o contraseña incorrecto")
        this.emitSession.emit(false)
      }  
      }) */
      this.sesion = true;
    }else{
      this.sesion = false;
    }
  }

  updateSession(value:boolean){
    this.sesion = value;
    if(this.sesion){
      this.router.navigate(['cronograma']);
    }else{
      this.router.navigate(['']);
    }
  }

}
