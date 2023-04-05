import { Component, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chat } from 'src/app/model/chat';
import { Garde } from 'src/app/model/garde';
import { ChatService } from 'src/app/sevice.api/chat.service';
import { CompteService } from 'src/app/sevice.api/compte.service';
import { GardeService } from 'src/app/sevice.api/garde.service';
import { ValidatorFn } from '@angular/forms';


@Component({
  selector: 'garde',
  templateUrl: './garde.component.html',
  styleUrls: ['./garde.component.scss']
})
export class GardeComponent {

  gardeForm: FormGroup;
  gardes: Array<Garde>;
  garde: Garde = new Garde();
  chats: Array<Chat>;
  validation: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private gardeService: GardeService, private clientService: CompteService, private chatService: ChatService) {
    if (!clientService.auth?.id) {
      alert("veuillez vous connecter pour utiliser les services");
      this.router.navigate(['/connexion']);

    }


    this.garde.prix = 0;
    this.gardeForm = this.formBuilder.group({
      dateDebut: this.formBuilder.control('', [Validators.required]),
      dateFin: this.formBuilder.control('', [Validators.required]),
      chatId: this.formBuilder.control('', [Validators.required]),
    }), { validator: this.confirmDateValidator() };


  }

  ngOnInit(): void {



  }

  createGarde() {


    this.garde.chatId = this.gardeForm.value.chatId;
    this.garde.dateDebut = this.gardeForm.value.dateDebut;
    this.garde.dateFin = this.gardeForm.value.dateFin;
    this.garde.clientId = this.clientService.compte.id;
    this.garde.prix = this.garde.prix;
    this.gardeService.create(this.garde);
    this.router.navigate(["/"]);

  }

  listChats(): Array<Chat> {

    return this.chatService.findAllByClientId();
  }

  @HostListener('change', ['$event.target'])
  modifPrix(): void {
    if (this.gardeForm.value.dateDebut == "" || this.gardeForm.value.dateDebut == "") { this.garde.prix = 0; console.log("vrai ou pas : ", this.gardeForm.value.dateDebut) }
    else {
      let dDebut = new Date(this.gardeForm.value.dateDebut);
      let dFin = new Date(this.gardeForm.value.dateFin);

      this.garde.prix = (dFin.getTime() - dDebut.getTime()) / (1000 * 3600 * 24) * 10;
      let compare = dDebut.getTime() - dFin.getTime();
      console.log(compare)
      if (compare > 0) { this.validation = false }
      else { this.validation = true }
    }

  }


  confirmDateValidator(): ValidatorFn {

    let dDebut = new Date(this.gardeForm.value.dateDebut);
    let dFin = new Date(this.gardeForm.value.dateFin);
    
    return (ctrl: AbstractControl): null | ValidationErrors => {
        if (dFin.getTime() > dDebut.getTime()) {
            return null;
        } else {
            return {
                validValidator: ctrl.value
            };
        }
    };
}


}
