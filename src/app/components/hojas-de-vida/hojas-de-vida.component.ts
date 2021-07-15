import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ControladorService } from 'src/app/servicios/controlador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hojas-de-vida',
  templateUrl: './hojas-de-vida.component.html',
  styleUrls: ['./hojas-de-vida.component.css']
})
export class HojasDeVidaComponent implements OnInit {
  data: any[] = [];
  arrayFilter:any[];
  typeFilter:string;
  indexClass:number = 0;

  constructor(private controller:ControladorService, private router:Router){
   }

  ngOnInit(): void {
    this. controller.post("http://cuisoft.co/api/getData.php",{
      user:localStorage.getItem('user'),
      cedula:localStorage.getItem('cedula'),
      dataNeeds:["cronograma"]
    }).subscribe(data=>{
      this.data = data[1];
      this.arrayFilter = this.data;
    })
  }

  filterData($event){
    /**
     * Metodo que se lanza cuando hay un cambio en el input de buscar
     */
    //data to filter
    this.arrayFilter = [];
    //dataTypeFilter dtf
    this.indexClass = 0;
    const dtf = $event.target.value;
    let num = 0;
    if(this.typeFilter){
      this.data.map(item =>{
        switch(this.typeFilter){
          case 'nombre':
            if(item.nombrepc.includes(dtf)){this.arrayFilter.push(item)}
            break;
          case 'proceso':
            if(item.proceso.includes(dtf)){this.arrayFilter.push(item)}
            break;
          case 'usuario':
            if(item.nombreResponsable.includes(dtf)){this.arrayFilter.push(item)}
            break;
        }
      })
    }
    else{
      window.alert("Selecciona un filtro");
      console.log("selecciona un filtro");
    }
  }

  changeFilter($event){
    this.indexClass = 0;
    const value = $event.target.value;
    this.typeFilter = value;
  }

  defineClassRow(value?:number){
    let clase = ""; 
    if(value){
      this.indexClass += value;
    }
    if(this.indexClass % 2 > 0){
      clase = "gris";
    }else{
      clase = "white";
    }
    this.indexClass += 1;
    console.log(this.indexClass)
    return clase;
  }
  registroSoporte(values){}

  myrouter(id){
    console.log("id de la tabla",id);
    this.router.navigate([`hojaDeVida`,id]);
  }

}
