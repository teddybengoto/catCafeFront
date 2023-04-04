import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Auth } from 'src/app/model/auth';
import { ClientRequest } from 'src/app/model/clientRequest';
import { CompteService } from 'src/app/sevice.api/compte.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit{

  inscriptionForm: FormGroup;
  connexionForm: FormGroup;
  client: ClientRequest;
  //is use to display connexion or login form
  connexion: boolean = true;

  constructor(private formBuilder: FormBuilder, private compteService: CompteService) {
    this.connexionForm = this.formBuilder.group({
      login: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

ngOnInit(): void {
    this.inscriptionForm = this.formBuilder.group({
      login: this.formBuilder.control('', [Validators.required, Validators.email]),
      prenom: this.formBuilder.control('', Validators.required),
      nom: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
      confirmMdp: this.formBuilder.control('', [Validators.required]),
    }, {validator: this.passwordsMatchValidator("password","confirmMdp")});
  }


  login() {
    this.compteService.login(this.connexionForm.value)
  }
  
  showSigning(val: boolean) { this.connexion = val }

  creat() {
    console.log("this.inscriptionForm.value: ", this.inscriptionForm.value);
    this.compteService.create(this.inscriptionForm.value).subscribe(resp => {
      console.log("resp: ", resp);

      if (resp?.id) {
        this.showSigning(true);
      }
      else { alert("Une erreur se produit lors de la creation du compte ") }
    });
  }

passwordsMatchValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];  
  
  if (control.value !== matchingControl.value) {
    matchingControl.setErrors({ confirmedValidator: true });
  } else {
    matchingControl.setErrors(null);
  }
}
}
}