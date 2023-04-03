import { Injectable } from '@angular/core';
import { Garde } from '../model/garde';
import { HttpClient } from '@angular/common/http';
import { CompteService } from './compte.service';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GardeService {

  private gardeApiPath: string;
  private garde: Garde;
  private gardes: Array<Garde>;

  constructor(private http: HttpClient, private clientService: CompteService) {
    this.gardeApiPath = ("http://localhost:8080/api" + "/garde"); { }
  }


  findAllByClient(): Array<Garde> {
    let clientId: number = this.clientService.compte.id;
    this.http.get<Array<Garde>>((this.gardeApiPath+"/client:"+clientId)).subscribe(resp => {
      this.gardes = resp;
    })
    return this.gardes;
  }

  create(g: Garde)
  {
    let ok: boolean;
    this.http.post<Garde>(this.gardeApiPath, g).subscribe(resp => {

      alert("Garde programmée du :" + resp.dateDebut + " au " + resp.dateFin);
    });
  }
}