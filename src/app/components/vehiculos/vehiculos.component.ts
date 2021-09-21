import { Component, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { DinamicHostDirective } from 'src/app/directives/dinamic-host.directive';
import { ControladorService } from 'src/app/servicios/controlador.service';
import { TablaDinamicaComponent } from '../tabla-dinamica/tabla-dinamica.component';


@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit, AfterViewInit {

  public globaldata:any = [];
  public dataFilter:any = [];
  public itemfilter:string = "numero";
  public status:string = 'todos';
  public currentSection:string = "buses";
  public headersToTable:Array<object> = [];

  @ViewChild('input',{static:false}) input:any;
  @ViewChild('status',{static:false}) uistatus:any;
  @ViewChild(DinamicHostDirective) public dinamichost:DinamicHostDirective;



  constructor(
    private controller:ControladorService,
    private componentFactoryResolver:ComponentFactoryResolver) 
  {}

  ngOnInit(): void {}

  ngAfterViewInit(): void{
    try {
      this.getData();
    } catch (error) {
      console.log("CARGANDO DATOS DESDE EL SERVIDOR",error);
    }
  }

  getData(){
    const luser = localStorage.getItem('user');
    const lcedula = localStorage.getItem('cedula');
    switch(this.currentSection){
      case 'buses':
        this.controller.post('http://cuisoft.co/api/getData.php',{
          user:luser,
          cedula:lcedula,
          //dataNeeds: ['vehiculos','gps','wifi','sistemas']
          dataNeeds: ['queryvehiculos']
        }).subscribe(data =>{
          this.globaldata = data;
          this.dataFilter = data[1];
          console.log('ok datos buses', data);
          this.showTable();
        })
        break;
      case 'gps':
        this.controller.post('http://cuisoft.co/api/getData.php',{
          user:luser,
          cedula:lcedula,
          dataNeeds: ['gps']
        }).subscribe(data =>{
          this.globaldata = data;
          this.dataFilter = data[1];
          console.log('ok datos gps', data);
          this.showTable();
        })
        break;
      case 'wifi':
        this.controller.post('http://cuisoft.co/api/getData.php',{
          user:luser,
          cedula:lcedula,
          dataNeeds: ['wifi']
        }).subscribe(data =>{
          this.globaldata = data;
          this.dataFilter = data[1];
          console.log('ok datos wifi', data);
          this.showTable();
        })
        break;
    }
  }

  preparedData(dataToPrepare=null, sectionData){
    let preparedData;
    switch(sectionData){
      case 'buses':
        preparedData = this.dataFilter.map( bus => {
          return {
            BUS:bus.numero,
            PLACA:bus.placa,
            VEHICULO:['button','./assets/img/bus',bus.estado],
            GPS:['button','./assets/img/gps',bus.gps],
            WIFI:['button','./assets/img/wifi',bus.wifi]
          }
        });
        break;
      case 'gps':
        preparedData = this.dataFilter.map( gps => {
          return {
            BUS:gps.numero,
            PLACA:gps.placa,
            ESTADO:gps.estado,
            GPS:['button','./assets/img/gps',gps.estado]}
        });
        break;
      case 'wifi':
        preparedData = this.dataFilter.map( wifi => {
          return {
            BUS:wifi.numero,
            PLACA:wifi.placa,
            ESTADO:wifi.estado,
            WIFI:['button','./assets/img/wifi',wifi.estado]}
        });
        break;
      case 'internet':
        break;
    }
    return preparedData;
  }

  changeFilter($event){
    this.itemfilter = $event.target.value;
  }

  filterData(){
    const dataToFilter = this.input.nativeElement.value;
    this.status = this.uistatus.nativeElement.value;
    this.dataFilter = this.globaldata[1];
    console.log("antes",this.dataFilter);
    switch(this.itemfilter){
      case 'numero':
        this.dataFilter = this.dataFilter.filter((item) => {
          return  item.numero.toLowerCase().includes(dataToFilter.toLowerCase()) ? true : false; 
        })
        .filter((item) => {
          if(this.status.toLowerCase() == 'todos'.toLowerCase()) return true;
          if(this.status.toLowerCase() == item.estado.toLowerCase()) return true;
          else return false;
        })
        break;
      case 'placa':
        this.dataFilter = this.dataFilter.filter((item) => {
          return  item.placa.toLowerCase().includes(dataToFilter.toLowerCase()) ? true : false; 
        })
        .filter((item) => {
          if(this.status.toLowerCase() == 'todos'.toLowerCase()) return true;
          if(this.status.toLowerCase() == item.estado.toLowerCase()) return true;
          else return false;
        })
        break;
      case 'celular':
        break;
      case 'telefono':
        break;
      case 'referenciaDePago':
        break;
    }
    console.log("despues",this.dataFilter);
    this.showTable();
  }

  updateCurrentSection(sectionToShow){
    this.currentSection = sectionToShow;
    this.getData();
  }

  showTable(){
    const component = this.componentFactoryResolver.resolveComponentFactory(TablaDinamicaComponent);
    this.dinamichost.viewContainerRef.clear();
    this.controller.dataTable = this.preparedData(null, this.currentSection);
    this.dinamichost.viewContainerRef.createComponent(component);
  }

}


