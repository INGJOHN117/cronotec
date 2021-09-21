import { element } from 'protractor';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ControladorService } from 'src/app/servicios/controlador.service';

@Component({
  selector: 'app-registro-equipo',
  templateUrl: './registro-equipo.component.html',
  styleUrls: ['./registro-equipo.component.css']
})
export class RegistroEquipoComponent implements OnInit,AfterViewInit{

  @ViewChild('divcanvas',{static:false}) contenedor:any;
  @ViewChild('canvas',{static:false}) canvas:any;
  @ViewChild('dataImage',{static:false}) dataImage:any;
  @ViewChild('imageFirm',{static:false}) imageFirm:any;
  @ViewChild('cedula',{static:false}) cedula:any;
  @ViewChild('nombreusr',{static:false}) nombreusr:any;


  private ctx:CanvasRenderingContext2D;
  private points:Array<any> = [];
  public usuarios:any = {};
  public sistemas:any = [];
  public alto = 400;
  public divujando = false;
  public firmo = false;
  registroEquipoForm:FormGroup;
  usuario = false;

  @HostListener('document:mousedown',['$event'])
  onMouseDown = (e:any) =>{
    if(e.target.id === 'canvas'){
      this.divujando = true;
    }
  }

  @HostListener('document:touchstart',['$event'])
  onTouchStart = (e:any) =>{
    if(e.target.id === 'canvas'){
      this.divujando = true;
    }
  }

  @HostListener('document:mousemove',['$event'])
  onMouseMove = (e:any) =>{
    if(e.target.id === 'canvas'){
      if(this.divujando){
        this.write(e);
        this.pictureImage();
      }
    }
  }

  @HostListener('document:touchmove',['$event'])
  onTouchMove = (e:any) =>{
    if(e.target.id === 'canvas'){
      if(this.divujando){
        console.log(e)
        this.write(e);
      }
    }
  }

  @HostListener('document:mouseup',['$event'])
  onMouseUp = (e:any) =>{
    if(e.target.id === 'canvas'){
      this.divujando = false;
      this.pictureImage();
      if(this.points.length>10){
        this.firmo = true;
      }
      this.points = [];
    }
  }

  @HostListener('document:touchend',['$event'])
  onTouchEnd = (e:any) =>{
    if(e.target.id === 'canvas'){
      this.divujando = false;
      this.points = []
      this.pictureImage();
    }
  }

  constructor(private controller:ControladorService, private _builder:FormBuilder, private router:Router) {
    this.registroEquipoForm = _builder.group({
      nombrepc:["",Validators.required],
      marca:["",Validators.required],
      proveedor:["",Validators.required],
      modelo:["",Validators.required],
      codigoActivo:["",Validators.required],
      modeloCPU:["",Validators.required],
      serialCPU:["",Validators.required],
      procesador:["",Validators.required],
      velocidadCPU:["",Validators.required],
      ram:["",Validators.required],
      marcaDD:["",Validators.required],
      capacidadDD:["",Validators.required],
      tecnologiaDD:["",Validators.required],
      mmMonitor:["",Validators.required],
      scMonitor:["",Validators.required],
      mmTeclado:["",Validators.required],
      scTeclado:["",Validators.required],
      mmMouse:["",Validators.required],
      scMouse:["",Validators.required],
      otro:[""],
      enRed:["",Validators.required],
      ip:["",Validators.required],
      mac:["",Validators.required],
      velocidadTR:["",Validators.required],
      marcaTR:["",Validators.required],
      so:["",Validators.required],
      fechaEntrega:["",Validators.required],
      proceso:["",Validators.required],
      cedulausr:["",Validators.required],
      //nombreusr:[""],
      dataImage:[""],
      recomendaciones:[""]
    })
   }

  ngOnInit(): void {}

  ngAfterViewInit(){
    console.log("REGISTRO EQUIPO")
    this.controller.post("http://cuisoft.co/api/getData.php",{
      user:localStorage.getItem('user'),
      cedula:localStorage.getItem('cedula'),  
      dataNeeds:["usuarioslitle","sistemas"]})
    .subscribe(data =>{
      console.log(data)
      data[1].map(item => this.usuarios[item.cedula] = item);
      this.sistemas = data[2];

    })
    this.render();
  }

  render(){
    //configura el comportamiento de el canvas
    const canvasEl = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext("2d");
    canvasEl.width = this.contenedor.nativeElement.offsetWidth;
    canvasEl.height = this.alto;
    this.ctx.lineWidth = 5;
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
    //console.log(prevPos)
    this.writeSingle(prevPos);
  }

  writeSingle = (prevPos) => {
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
      this.ctx.moveTo(prevPos.x,prevPos.y);
      this.ctx.lineTo(currentPos.x,currentPos.y);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  borrarFirma(){
    const canvasEl = this.canvas.nativeElement;
    const dataImageEl = this.dataImage.nativeElement;
    const imageFirmEl = this.imageFirm.nativeElement;
    this.ctx = canvasEl.getContext("2d");
    this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    dataImageEl.innerHTML = "";
    imageFirmEl.setAttribute("src","");
    this.firmo = false;
  }

  pictureImage(){
    const canvasEl = this.canvas.nativeElement;
    const dataImageEl = this.dataImage.nativeElement;
    const imageFirmEl = this.imageFirm.nativeElement;
    dataImageEl.innerHTML = canvasEl.toDataURL();
    imageFirmEl.setAttribute("src",canvasEl.toDataURL());
  }
  
  callNodes(){
    let nodos = [];
    nodos["contenedor"] = this.contenedor.nativeElement;
    nodos["canvas"] = this.canvas.nativeElement;
    nodos["dataImage"] = this.dataImage.nativeElement;
    nodos["imageFirm"] = this.imageFirm.nativeElement;
    return nodos;
  }
  saludo(){
    console.log(this.usuarios);
  }
  
  buscarusuario($event:any){
    const ccuser =  $event.target.value;
    const nombreusr = this.nombreusr.nativeElement;
    if(this.usuarios[ccuser]){
      console.log("cedula encontrada")
      nombreusr.value = this.usuarios[ccuser].nombre;
    }else{
      console.log("cedula incorrecta");
      nombreusr.value = "cedula inexistente";
    }
    
  }

  guardarRegistro(values){
    

    let nodos = this.callNodes();
    values['dataImage'] = nodos['canvas'].toDataURL();
    values["user"] = localStorage.getItem('user');
    values["cedula"] = localStorage.getItem('cedula');
    values["tableObjective"] = ["hojadevida","inventario"];
    for (var key in values) {
      if(values[key]==""){
        alert(`debe diligenciar el campo: ${key}`)
        return;
      }
      if(!this.firmo){
        alert("la firma es elejible, por favor escribela mas grande")
        return;
      }
    }
    console.log(values)
    debugger
    this.controller.post("http://cuisoft.co/api/setData.php",values)
    .subscribe(
      response =>{
        alert("Registro Exitoso, puedes verificarlo en las hojas de vida");
        this.router.navigate(['cronograma']);
      }
    )
    debugger
  }

}
