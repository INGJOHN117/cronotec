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

  public searchSession(){
    debugger
    var formData = new FormData();
    formData.append('user', localStorage.getItem('user'));
    formData.append('cedula', localStorage.getItem('cedula'));
    return this.http.post('http://localhost/projects/ng/cronotec/src/app/php/authenticate.php',formData);
  }
}
