import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Compte } from 'src/app/model/compte';
import { CompteService } from 'src/app/sevice.api/compte.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent {

  myCompte:Compte;


  constructor(private compteService: CompteService, private router:Router ){

    
    if (!compteService.auth?.id) {
      this.router.navigate(['/connexion']);
    }
    //this.getClient()  ;
    this.findClientDetail();

  }

  

  getClient(){
    this.compteService.findClientById(this.compteService.auth.id);
  }

  findClientDetail():void{
 
    this.compteService.findClientDetail(this.compteService.auth.id).subscribe(resp=>{
      if (!resp?.id) {
        console.log("No Client");
      }
      this.myCompte=resp;
    })
  }

}
