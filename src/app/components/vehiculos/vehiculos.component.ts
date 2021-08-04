import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ControladorService } from 'src/app/servicios/controlador.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit, AfterViewInit {

  public globaldata:any = [];
  public buses:any = [];
  public gps:any = [];
  public wifi:any = [];
  public sistemas:any = [];
  public itemfilter:string = "numero";
  public status:string = 'todos';
  //edit windows status o estado de la ventana de edicion esta variable objeto 
  //controla los datos y el estado de visibilizacion de la ventana de editar
  public ews:object = {numero:'1000',placa:'XYZ125', estado:false};
  @ViewChild('divedit',{static:false}) divedit:any;
  public showEdit = false;


  constructor(private controller:ControladorService) {   }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.controller.post('http://cuisoft.co/api/getData.php',{
      user:localStorage.getItem('user'),
      cedula:localStorage.getItem('cedula'),
      dataNeeds: ['vehiculos','gps','wifi','sistemas']
    }).subscribe(data =>{
      console.log(data);
      this.globaldata = data;
      this.buses = data[1];
      this.gps = data[2];
      this.wifi = data[3];
      this.sistemas = data[4];
    })
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

  changeFilter($event){
    this.itemfilter = $event.target.value;
  }

  changeStatus($event){
    this.buses = [];
    this.status = $event.target.value;
    this.globaldata[1].map(bus =>{
      if(this.status == 'todos'){
        this.buses.push(bus);
      }else if(this.status == bus.estado){
        this.buses.push(bus);
      }
    })
    console.log(this.buses)
  }


  filterData($event){
    /**
     * Metodo que se lanza cuando hay un cambio en el input de buscar
     */
    //data to filter
    
    //dataTypeFilter dtf
    const dtf = $event.target.value;
    this.buses = [];
    this.globaldata[1].map(item =>{
      switch(this.itemfilter){
        case 'numero':
          if(item.numero.toLowerCase().includes(dtf.toLowerCase())){
            if(this.status == 'todos'){
              this.buses.push(item);
            }else if(this.status == item.estado){
              this.buses.push(item);
            }
          }
          break;
        case 'placa':
          if(item.placa.toLowerCase().includes(dtf.toLowerCase())){
            if(this.status == 'todos'){
              this.buses.push(item);
            }else if(this.status == item.estado){
              this.buses.push(item);
            }
          }
          break;
      }
    })
  }

  openEdit(bus){
    this.ews = bus;
    this.showEdit = true;
  }
  closeEdit(e){
    this.showEdit = e;
  }


}


