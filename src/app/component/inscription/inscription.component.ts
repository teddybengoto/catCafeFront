import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Auth } from 'src/app/model/auth';
import { ClientRequest } from 'src/app/model/clientRequest';
import { CompteService } from 'src/app/sevice.api/compte.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  inscriptionForm: FormGroup;
  client: ClientRequest;
  auth: Auth=new Auth();


  constructor(private formBuilder: FormBuilder, private compteService: CompteService) {
  }

  ngOnInit(): void {

    this.inscriptionForm = this.formBuilder.group({
      login: this.formBuilder.control(''),
      prenom: this.formBuilder.control(''),
      nom: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    });

    this.auth.success=false;
  }

  login() {

    this.compteService.login(this.inscriptionForm.value).subscribe(resp => {

      if (resp?.success) {
        this.auth = { ...resp }
        console.log("this.auth: ", this.auth);
      }

    })




  }

}
