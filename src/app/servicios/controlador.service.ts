import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ControladorService {

  constructor(private http:HttpClient) { }

  public get(url:string){
    return this.http.get(url);
  }

  public post(url:string, data:any){
    debugger;
    console.log(data);
    return this.http.post(url,data);
  }
}
