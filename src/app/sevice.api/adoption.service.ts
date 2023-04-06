import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adoption } from '../model/adoption';
import { Observable } from 'rxjs';
import { CompteService } from './compte.service';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

private adoptionApiPath : string;
private adoptions : Array<Adoption> = new Array<Adoption>;
private adoptionsById : Array<Adoption> = new Array<Adoption>;

  constructor( private http: HttpClient, private clientService : CompteService) { 
    this.adoptionApiPath = "http://localhost:8080/api"+"/adoption";
    this.load();
    this.loadById();
  }

  private load():void{
    this.http.get<Array<Adoption>>(this.adoptionApiPath).subscribe(resp =>{
      this.adoptions=resp;
    })
  }

  loadById(){
    let clientId: number = this.clientService.compte.id;
    this.http.get<Array<Adoption>>((this.adoptionApiPath+"/by-client-id/"+clientId)).subscribe(resp => {
      this.adoptionsById = resp;
    })
  }

  findAll(): Array<Adoption>{
    return this.adoptions
  }
  findAllByClient():Array<Adoption>{
    return this.adoptionsById;
  }

  findById(id: number): Observable<Adoption> {
    return this.http.get<Adoption>(this.adoptionApiPath + "/" + id);
  }

  create(adoption: Adoption): void {
    this.http.post<Adoption>(this.adoptionApiPath, adoption).subscribe(resp => {
      this.load();
    });
  }

  update(adoption: Adoption): void {
    this.http.put<Adoption>(this.adoptionApiPath + "/" +  adoption.id, adoption).subscribe(resp => {
      this.load();
    });
  }

  remove(id: number): void {
    this.http.delete<boolean>(this.adoptionApiPath + "/" + id).subscribe(resp => {
      this.load();
    });
  }
}
