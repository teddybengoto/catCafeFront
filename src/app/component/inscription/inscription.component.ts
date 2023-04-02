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
export class InscriptionComponent /*implements OnInit */ {

  inscriptionForm: FormGroup;
  client: ClientRequest;
  public auth: Auth = new Auth();


  constructor(private formBuilder: FormBuilder, private compteService: CompteService) {

    this.inscriptionForm = this.formBuilder.group({
      login: this.formBuilder.control(''),
      prenom: this.formBuilder.control(''),
      nom: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    });

  }

  login() {

    this.compteService.login(this.inscriptionForm.value)

  }

}
