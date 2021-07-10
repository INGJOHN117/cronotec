import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ControladorService } from 'src/app/servicios/controlador.service';

@Component({
  selector: 'app-hojas-de-vida',
  templateUrl: './hojas-de-vida.component.html',
  styleUrls: ['./hojas-de-vida.component.css']
})
export class HojasDeVidaComponent implements OnInit {
  data: any[] = [];
  arrayFilter:any[];
  typeFilter:string;

  constructor(private controller:ControladorService){
   }

  ngOnInit(): void {
    this. controller.post("http://cuisoft.co/api/getData.php",{
      user:localStorage.getItem('user'),
      cedula:localStorage.getItem('cedula'),
      dataNeeds:["cronograma"]
    }).subscribe(data=>{
      console.log("data==>",data);
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
    const dtf = $event.target.value;
    let num = 0;
    if(this.typeFilter){
      this.data.map(item =>{
        console.log("MAPEANDO==>",item);
        switch(this.typeFilter){
          case 'nombre':
            if(item.nombrepc.includes(dtf)){this.arrayFilter.push(item)}
            break;
          case 'proceso':
            if(item.proceso.includes(dtf)){this.arrayFilter.push(item)}
            break;
          case 'usuario':
            if(item.nombreResponsable  .includes(dtf)){this.arrayFilter.push(item)}
            break;
        }
      })
    }else{console.log("selecciona un filtro")}
    
    console.log(this.arrayFilter)
    //console.log(`[${num}] coincidencias encontradas`);
  }
  changeFilter($event){
    const value = $event.target.value;
    this.typeFilter = value;
  }
  defineClassRow(value){

  }
  registroSoporte(values){}

}
