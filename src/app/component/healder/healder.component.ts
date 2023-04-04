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
  compte: Compte = new Compte();
  

  textButtomConnexion:string= this.compteService?.auth?.id ? "Déconnexion": "Connexion";

  constructor(private compteService:CompteService ){
    
    this.test();
    console.log("auth : ", compteService.auth)
    if(compteService.auth?.id){   console.log("login");this.login();}
    



  }

  
  test(){
    console.log("textButtomConnexion: ",this.textButtomConnexion);
  }

  login(){
 
    this.compteService.findClientDetail(this.compteService.auth.id).subscribe(resp => {this.compte = resp; });

  }

  logOut(){
    this.compteService.auth=null;
    this.compteService.compte=null;
  }
  
  
  
}
