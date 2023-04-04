import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  updateCompte!: FormGroup;


  constructor(private formBuilder: FormBuilder ,private compteService: CompteService, private router:Router ){


    
    if (!compteService.auth?.id) {
      this.router.navigate(['/connexion']);
    }


    this.updateCompte = this.formBuilder.group({
      nom: this.formBuilder.control('', Validators.required),
      prenom: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      telephone: this.formBuilder.control('', Validators.required)

    });



    //this.getClient()  ;
    this.findClientDetail();


  }

  

  getClient(){
    this.compteService.findClientById(this.compteService.auth.id);
  }

  update(){

    console.log("update");
    

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
