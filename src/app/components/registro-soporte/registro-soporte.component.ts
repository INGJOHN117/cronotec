import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-soporte',
  templateUrl: './registro-soporte.component.html',
  styleUrls: ['./registro-soporte.component.css']
})
export class RegistroSoporteComponent implements OnInit {

  public codigoActivo:string;

  constructor(private router:Router, private route: ActivatedRoute) { 
    this.codigoActivo = route.snapshot.paramMap.get('codigoActivo');
  }

  ngOnInit(): void {
    console.log("SE CARGA EL REGISTRO SOPORTE")
  }

  guardarRegistro(){
    this.router.navigate(['cronograma']);
  }
}
