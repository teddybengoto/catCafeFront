import { Component } from '@angular/core';
import { CompteService } from 'src/app/sevice.api/compte.service';
import { InscriptionComponent } from '../inscription/inscription.component';
import { Auth } from 'src/app/model/auth';
import { Compte } from 'src/app/model/compte';

@Component({
  selector: 'app-healder',
  templateUrl: './healder.component.html',
  styleUrls: ['./healder.component.scss']
})
export class HealderComponent {
  auth : Auth = null;
  compte: Compte;

  textButtomConnexion:string= this.compteService?.auth?.id ? "Déconnexion": "Connexion";

  constructor(private compteService:CompteService ){
    this.test();
    this.auth = compteService.auth;
    this.compte = compteService.compte;
    console.log("test :"  + this.compte);

  }

  test(){
    console.log("textButtomConnexion: ",this.textButtomConnexion);
  }

  logOut(){
    this.compteService.auth=null;
    this.compteService.compte=null;
  }
  
  
  
}
