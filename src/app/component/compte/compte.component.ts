import { Component, Input } from '@angular/core';
import { Auth } from 'src/app/model/auth';
import { CompteService } from 'src/app/sevice.api/compte.service';
import { InscriptionComponent } from '../inscription/inscription.component';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent {


  constructor(private compteService: CompteService){

    
    
    this.getClient()
    console.log("this.compteService.auth?.id: ", this.compteService.auth.id);

   

  }

  

  getClient(){
    console.log("Profil this.getAut",this.compteService.auth.id);
    this.compteService.findClientById(this.compteService.auth.id);
   
  }

}
