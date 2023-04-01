import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientRequest } from '../model/clientRequest';
import { Auth } from '../model/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

    private clientApiPath: string;
    private adminApiPath: string;

  constructor(private http : HttpClient) { 
    this.clientApiPath = "http://localhost:8080/api" + "/compte";
  }

  login( cr:ClientRequest ):Observable<Auth>{
 
    return this.http.post<Auth>(this.clientApiPath+"/connexion", cr)
    
  }

  create(){

    //this.http.put<clientRequest>
    
  }

  
}
