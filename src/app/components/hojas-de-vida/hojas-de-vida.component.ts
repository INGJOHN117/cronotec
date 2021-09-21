import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ControladorService } from 'src/app/servicios/controlador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hojas-de-vida',
  templateUrl: './hojas-de-vida.component.html',
  styleUrls: ['./hojas-de-vida.component.css']
})
export class HojasDeVidaComponent implements OnInit, AfterViewInit {
  public data: any[];
  public arrayFilter:any[];
  public typeFilter:string = "nombre";
  public indexClass:number = 0;

  constructor(private controller:ControladorService, private router:Router){}

  ngOnInit(): void {}

  ngAfterViewInit(){
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
    
    this.indexClass = 0;
    //dataTypeFilter dtf
    const dtf = $event.target.value;
    let num = 0;
    if(this.typeFilter){
      this.data.map(item =>{
        switch(this.typeFilter){
          case 'nombre':
            //let nombre item.nombrepc.toLowerCase
            if(item.nombrepc.toLowerCase().includes(dtf.toLowerCase())){this.arrayFilter.push(item)}
            break;
          case 'proceso':
            if(item.proceso.toLowerCase().includes(dtf.toLowerCase())){this.arrayFilter.push(item)}
            break;
          case 'usuario':
            if(item.nombreResponsable.toLowerCase().includes(dtf.toLowerCase())){this.arrayFilter.push(item)}
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
    if(value % 2 > 0){
      clase = "gris";
    }else{
      clase = "white";
    }
    return clase;
  }
  registroSoporte(values){}

  myrouter(id){
    console.log("id de la tabla",id);
    this.router.navigate([`hojaDeVida`,id]);
  }

}
