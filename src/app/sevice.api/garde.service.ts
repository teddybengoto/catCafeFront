import { Injectable } from '@angular/core';
import { Garde } from '../model/garde';
import { HttpClient } from '@angular/common/http';
import { CompteService } from './compte.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GardeService {

  private gardeApiPath: string;
  private gardesById : Array<Garde> = new Array<Garde>;
  private garde: Garde;
  gardes: Array<Garde> = new Array<Garde>;

  constructor(private router: Router, private http: HttpClient, private clientService: CompteService) {
    this.gardeApiPath = ("http://localhost:8080/api" + "/garde"); 
    this.loadById();
    }


  findAllByClient(): Array<Garde> {
    return this.gardesById;
  }

  loadById():void{
    let clientId: number = this.clientService.compte.id;
    this.http.get<Array<Garde>>((this.gardeApiPath+"/client:"+clientId)).subscribe(resp => {
      this.gardesById = resp;
    })
  }

  create(g: Garde) : Observable<Garde>
  {

    return this.http.post<Garde>(this.gardeApiPath, g);
  }
}
