import { Component, OnInit } from '@angular/core';
import { ControladorService } from 'src/app/servicios/controlador.service';

@Component({
  selector: 'app-hojas-de-vida',
  templateUrl: './hojas-de-vida.component.html',
  styleUrls: ['./hojas-de-vida.component.css']
})
export class HojasDeVidaComponent implements OnInit {
  public datosApp:any = [];
  constructor(private mycontroller:ControladorService) { }

  ngOnInit(): void {
    this.cargarDatos()
  }

  cargarDatos(){
    this.mycontroller.get('http://localhost/projects/ng/cronotec/src/app/php/api.php').subscribe(data=>{
      console.log(data);
      this.datosApp = data;
    })    
  }
}
