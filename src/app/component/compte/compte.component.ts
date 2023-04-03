import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CompteService } from 'src/app/sevice.api/compte.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent {


  constructor(private compteService: CompteService, private router:Router ){

    
    if (!compteService.auth?.id) {
      this.router.navigate(['/connexion']);
    }
    this.getClient()  

  }

  

  getClient(){
    console.log("Profil this.getAut",this.compteService.auth.id);
    this.compteService.findClientById(this.compteService.auth.id);
   
  }

}
