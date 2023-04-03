import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chat } from 'src/app/model/chat';
import { Garde } from 'src/app/model/garde';
import { ChatService } from 'src/app/sevice.api/chat.service';
import { CompteService } from 'src/app/sevice.api/compte.service';
import { GardeService } from 'src/app/sevice.api/garde.service';


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
  
  constructor(private router: Router, private formBuilder: FormBuilder, private gardeService: GardeService, private clientService: CompteService, private chatService: ChatService){
    

    this.garde.prix = 0;
    this.gardeForm = this.formBuilder.group({
      dateDebut: this.formBuilder.control(''),
      dateFin: this.formBuilder.control(''),
      chatId: this.formBuilder.control(''),
    });

 
  }

  ngOnInit(): void{



  }

  createGarde(){


    this.garde.chatId = this.gardeForm.value.chatId;
    this.garde.dateDebut = this.gardeForm.value.dateDebut;
    this.garde.dateFin = this.gardeForm.value.dateFin;
    this.garde.clientId = 4;
    this.garde.prix = this.garde.prix;
    this.gardeService.create(this.garde);
    this.router.navigate(["/"]);

  }

  listChats(): Array<Chat> {

    return this.chatService.findAllByClientId();
  }

  @HostListener('change', ['$event.target'])
  modifPrix(): void {
    if (this.gardeForm.value.dateDebut == "" || this.gardeForm.value.dateDebut == "") { this.garde.prix = 122; }
    else {
      let dDebut = new Date(this.gardeForm.value.dateDebut);
      let dFin = new Date(this.gardeForm.value.dateFin);
      this.garde.prix = (dFin.getTime() - dDebut.getTime()) / (1000 * 3600 * 24) * 10;
      console.log(this.garde.prix)
    }

  }



}