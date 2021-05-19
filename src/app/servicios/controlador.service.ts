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
    var formData = new FormData();
    for (var key in data) {
      formData.append(key,data[key]);
    }
    return this.http.post(url,formData);
  }
}
