import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { DinamicHostDirective } from 'src/app/directives/dinamic-host.directive';
import { ControladorService } from 'src/app/servicios/controlador.service';
import { TargetaRegistroComponent } from '../targeta-registro/targeta-registro.component';


@Component({
  selector: 'app-tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrls: ['./tabla-dinamica.component.css']
})
export class TablaDinamicaComponent implements OnInit, AfterViewInit {
  public dataTable:any;
  public keys:Array<string> = [];

  @ViewChild('bodyTable',{static:false}) bodyTable:any;
  @ViewChild(DinamicHostDirective) dinamichost:DinamicHostDirective;
  
  constructor(
    private renderer2:Renderer2,
    public controller:ControladorService,
    public componentFactoryResolver:ComponentFactoryResolver) 
  {
    this.dataTable = this.controller.dataTable;
    this.extracKeys();
  }
  
  ngOnInit(): void { }
  ngAfterViewInit(){
    this.makeBodyTable();
  }
  
  extracKeys(){
    //console.log("HIJO",this.dataTable)
      try {
        this.keys = [];
        Object.keys(this.dataTable[0]).map(key => 
        this.keys.push(key));
      } catch (error) {
        console.log(error);
      }
    
  }

  makeBodyTable(){
    let tbody = this.bodyTable.nativeElement;
    this.dataTable.map((item, i) => {
      let tr = document.createElement('tr');
      this.keys.map((key, j)=>{
        let td = document.createElement('td');
        this.renderer2.setStyle(td,'background', i % 2 > 0 ? 'rgb(217, 247, 162)' : 'rgb(f,f,f)' );
        this.renderer2.listen(tr,"mouseover",(event)=>{
          this.renderer2.setStyle( td,'transition', '0.6s')
          this.renderer2.setStyle( td,'background',  'rgb(201, 191, 191)' );
        });

        this.renderer2.listen(tr,"mouseout",(event)=>{
          this.renderer2.setStyle(td,'background', i % 2 > 0 ? 'rgb(217, 247, 162)' : 'rgb(255,255,255)' );
        });
        if( item[key][0] === 'button'){
          let img = document.createElement('img');
          //this.renderer2.addClass(img,`imgEdit`);
          this.renderer2.setStyle(img,'width','3vw');
          this.renderer2.setStyle(img,'height','3vw');
          this.renderer2.setStyle(img,'margin','0%');
          this.renderer2.setStyle(img,'padding','0%');
          this.renderer2.setAttribute(img,"src",this.defineColor(item[key]));
          this.renderer2.listen(img,"mouseover",(event)=>{});
          this.renderer2.appendChild(td,img);
          this.renderer2.appendChild(tr,td);
          this.renderer2.listen(img, "click",( e ) => {
            const component = this.componentFactoryResolver.resolveComponentFactory(TargetaRegistroComponent);
            this.dinamichost.viewContainerRef.clear();
            this.controller.dataTarget = [item,true, key]
            this.dinamichost.viewContainerRef.createComponent(component)
          });

        }else if(item[key] != 'button'){
          td.innerHTML =  item[key];
          this.renderer2.appendChild(tr,td);

        }
      });
      this.renderer2.appendChild(tbody,tr);
    }) 
  }

  defineColor(status){
    switch(status[2].toLowerCase()) {
      case 'activo':
        status[1] = status[1] + '-activo.svg';
        break;
      case 'inactivo':
        status[1] = status[1] + '-inactivo.svg';
        break;
      case 'desvinculado':
        status[1] = status[1] + '-desvinculado.svg';
        break;
      case 'pendiente':
        status[1] = status[1] + '-pendiente.svg';
        break;
      default:
        status[1] = './assets/img/nulo.svg';
        break;
    }
    return status[1];
  }
  defineClassRow(value?:number){
    return  value % 2 > 0 ? 'gris' : 'white';
  }
  functioneditar(){
    alert("saludo");
  }
   /* //SALE
   openEdit(bus){
    this.ews = bus;
    this.showEdit = true;
  }
  //SALE
  closeEdit(e){
    this.showEdit = e;
  } */
}
