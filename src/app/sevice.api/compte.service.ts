import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientRequest } from '../model/clientRequest';
import { Auth } from '../model/auth';
import { Observable } from 'rxjs';
import { Compte } from '../model/compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  private clientApiPath: string;
  private adminApiPath: string;

  auth: Auth;
  compte: Compte;

  constructor(private http: HttpClient) {
    this.clientApiPath = "http://localhost:8080/api" + "/compte";
  }

  login(cr: ClientRequest) {

    this.http.post<Auth>(this.clientApiPath + "/connexion", cr).subscribe(resp => {

      if (resp?.success) {
        return this.auth = resp;
      }
      else {
        return this.auth = null;
      }

    })

  }

  create() {

    //this.http.put<clientRequest>

  }

  //http://localhost:8080/catCafe/api/compte/admin/1

  findClientById(id: number): Compte {
    return this.http.get<Compte>(this.clientApiPath + "/client/" + id).subscribe(resp => {
      console.log("Compte: ",resp);
      
      return this.compte = resp;
    })

  }


}
