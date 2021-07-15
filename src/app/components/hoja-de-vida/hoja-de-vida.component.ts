import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hoja-de-vida',
  templateUrl: './hoja-de-vida.component.html',
  styleUrls: ['./hoja-de-vida.component.css']
})
export class HojaDeVidaComponent implements OnInit {

  public codigoActivo:string;
  editRegistroForm:FormGroup;

  constructor(private route:ActivatedRoute) {
    this.codigoActivo = this.route.snapshot.paramMap.get('codigoActivo');
   }

  ngOnInit(): void {
    console.log("PARAMETRO DE PADRE",this.codigoActivo)
  }


  saveRecord(values){
    console.log(values)
  }

}
