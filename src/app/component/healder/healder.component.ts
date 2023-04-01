import { Component } from '@angular/core';
import { InscriptionComponent } from '../inscription/inscription.component';

@Component({
  selector: 'app-healder',
  templateUrl: './healder.component.html',
  styleUrls: ['./healder.component.scss']
})
export class HealderComponent {

  textButtomConnexion:string= this.auth?.auth?.success ? "Déconnexion": "Connexion";

  constructor(private auth:InscriptionComponent ){
    this.test();

  }

  test(){
    console.log("textButtomConnexion: ",this.textButtomConnexion);
  }

  
  
  
}
