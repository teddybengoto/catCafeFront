import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientRequest } from '../model/clientRequest';
import { Auth } from '../model/auth';
import { Observable } from 'rxjs';
import { Compte } from '../model/compte';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  private clientApiPath: string;
  private adminApiPath: string;

  clients:Array<Compte> = new Array<Compte>; 
  auth: Auth = new Auth();
  compte: Compte = new Compte();

  constructor(private http: HttpClient,private router:Router) {
    this.clientApiPath = "http://localhost:8080/api" + "/compte";
    this.load();
  }

  load(){
    this.http.get<Array<Compte>>(this.clientApiPath + "/client").subscribe(resp =>{
      this.clients = resp;
    })
  }

  findAll(){
    return this.clients;
  }

  login(cr: ClientRequest) {

    this.http.post<Auth>(this.clientApiPath + "/connexion", cr).subscribe(resp => {

      if (resp?.success) {
        this.router.navigate(['/']);
        this.auth = resp;
        this.loadCurrentCompte();
        return this.auth;
      }
      else {
        return this.auth = null;
      }

    })

  }

 
  create(c: ClientRequest):  Observable<Compte> {
    return this.http.post<Compte>(this.clientApiPath+ "/client", c)
  }

  //http://localhost:8080/catCafe/api/compte/admin/1

  findClientById(id: number): void {
     this.http.get<Compte>(this.clientApiPath + "/client/" + id).subscribe(resp => {
       this.compte = resp;
    })

  }
   findClientDetail(id: number):  Observable<Compte> {
    return this.http.get<Compte>(this.clientApiPath + "/client/" + id);
 }

  loadCurrentCompte() : void{
    this.http.get<Compte>(this.clientApiPath + "/client/" + this.auth.id).subscribe(resp => {
      this.compte = resp;
            console.log("connecté : " + this.compte.nom)
            console.log("compteservice : " , this.compte)
   })
  }

  update(compte: Compte): Observable<Compte> {

   return this.http.put<Compte>(this.clientApiPath+"/client/"+ this.auth.id, compte);
  }


}
