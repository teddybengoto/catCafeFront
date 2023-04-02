import { Component } from '@angular/core';
import { CompteService } from 'src/app/sevice.api/compte.service';
import { InscriptionComponent } from '../inscription/inscription.component';

@Component({
  selector: 'app-healder',
  templateUrl: './healder.component.html',
  styleUrls: ['./healder.component.scss']
})
export class HealderComponent {

  textButtomConnexion:string= this.compteService?.auth?.id ? "Déconnexion": "Connexion";

  constructor(private compteService:CompteService ){
    this.test();

  }

  test(){
    console.log("textButtomConnexion: ",this.textButtomConnexion);
  }

  logOut(){
    this.compteService.auth=null;
    this.compteService.compte=null;
  }
  
  
  
}
