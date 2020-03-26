import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private info: any;
  private url = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8081';
  
  public getInfo(){
    
  }

  get(){
    return this.http.get(this.baseUrl + '/api/listaPersonas');
  }

  post(data){
    return this.http.post(this.baseUrl + '/api/registrarPersona', data);
  }
}
