import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControladorService } from './../../servicios/controlador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-registro-soporte',
  templateUrl: './registro-soporte.component.html',
  styleUrls: ['./registro-soporte.component.css']
})
export class RegistroSoporteComponent implements OnInit,AfterViewInit {
  @ViewChild('canvas',{static:false}) canvas:any;
  private ctx:CanvasRenderingContext2D;
  private points:Array<any> = [];
  
  public codigoActivo:string;
  public dataJson:any;
  registroSoporteForm:FormGroup;

  @HostListener('document:mousemove',['$event'])
  onMouseMove = (e:any) =>{
    if(e.target.id == 'canvas'){
      //console.log(e);
      this.write(e);
    }
  }
  constructor(
    private controller: ControladorService,
    private router:Router,
    private route: ActivatedRoute,
    private _builder:FormBuilder
    ) { 
    this.codigoActivo = route.snapshot.paramMap.get('codigoActivo');
    this.registroSoporteForm = _builder.group({
      fecharealizacion:["",Validators.required],
      realizo:["",Validators.required],
      observaciones:["",Validators.required],
      usrresponsable:["",Validators.required],
      dataImagen:["",Validators.required]
    })
  }

  ngOnInit(): void {
    this.controller.post("http://cuisoft.co/api/getData.php",{
      user:localStorage.getItem('user'),
      cedula:localStorage.getItem('cedula'),
      dataNeeds:["registroSoporte",this.codigoActivo,"sistemas"]
    }).subscribe(datas=>{
      this.dataJson = datas;
    })
  }

  ngAfterViewInit(){
    this.render();

  }

  render(){
    //configura el comportamiento de el canvas
    const canvasEl = this.canvas.nativeElement;
    console.log(canvasEl);
    this.ctx = canvasEl.getContext("2d");
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "#000";
  }

  write(res):any{
    const canvasEl = this.canvas.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const prevPos = {
      x: res.clientX - rect.left,
      y: res.clientY - rect.top
    }

    console.log(prevPos);

    this.writeSingle(prevPos);
  }

  writeSingle(prevPos){
    this.points.push(prevPos);
    if(this.points.length>3){
      const prevPos = this.points[this.points.length-1];
      const currentPos = this.points[this.points.length-2];  
      this.drawCanvas(prevPos, currentPos);
    }
  }

  drawCanvas(prevPos, currentPos){
    if(!this.ctx){
      return;
    }
    this.ctx.beginPath();
    if(prevPos){
      console.log(prevPos.x + "<===>"+prevPos.y)
      console.log(currentPos.x + "<===>"+currentPos.y)
      this.ctx.moveTo(prevPos.x,prevPos.y);
      this.ctx.lineTo(currentPos.x,currentPos.y);
      this.ctx.stroke();
      this.ctx.closePath();
    }


  }

  guardarRegistro(values){
    values["user"] = localStorage.getItem('user');
    values["cedula"] = localStorage.getItem('cedula');
    values["tableObjective"] = ["historialdemantenimiento"];
    this.controller.post("http://cuisoft.co/api/setData.php",values)
    .subscribe(
      response =>{
        console.log(response);
        debugger
      }
    )
    //alert("Inicio de sesion exitoso")
    //this.router.navigate(['cronograma']);
  }



}

