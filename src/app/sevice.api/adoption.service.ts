import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adoption } from '../model/adoption';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

private adoptionApiPath : string;
private adoptions : Array<Adoption> = new Array<Adoption>;

  constructor( private http: HttpClient) { 
    this.adoptionApiPath = "http://localhost:8080/api"+"/adoption";
    this.load();
  }

  private load():void{
    this.http.get<Array<Adoption>>(this.adoptionApiPath).subscribe(resp =>{
      this.adoptions=resp;
    })
  }

  findAll(): Array<Adoption>{
    return this.adoptions
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
