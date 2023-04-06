import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Adoption } from 'src/app/model/adoption';
import { Chat, ChatSend } from 'src/app/model/chat';
import { AdoptionService } from 'src/app/sevice.api/adoption.service';
import { ChatService } from 'src/app/sevice.api/chat.service';
import { CompteService } from 'src/app/sevice.api/compte.service';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.scss']
})
export class AdoptionComponent {


  chats: Array<Chat> = new Array<Chat>;
  adoption: Adoption = new Adoption();

  constructor(private chatService: ChatService,
    private adoptionService: AdoptionService,
    private compteService: CompteService,
    private router: Router) {
    if (!compteService.auth?.id) {
      this.router.navigate(['/connexion']);
    }
  }

  findAllAdoptable(): Array<Chat> {
    this.chats = this.chatService.findAllAdoptable();
    return this.chats
  }

  adopter(chat: Chat): void {
    let date: Date = new Date();
    console.log(date.toLocaleDateString());
    let chatForm: ChatSend = new ChatSend();
    chatForm.id = chat.id;
    chatForm.nom = chat.nom;
    chatForm.sexe = chat.sexe;
    chatForm.race = chat.race;
    chatForm.sterile = chat.sterile;
    chatForm.idPuce = chat.idPuce;
    chatForm.idTatouage = chat.idTatouage;
    chatForm.pbSante = chat.pbSante;
    chatForm.commentaire = chat.commentaire;
    chatForm.image = chat.image;
    chatForm.naissance = chat.naissance;
    chatForm.adoptable = false;
    chatForm.permanent = false;
    chatForm.clientId = this.compteService.auth?.id;
    this.chatService.update(chatForm);
    this.adoption.idChat = chat.id;
    this.adoption.idClient = this.compteService.auth?.id;
    this.adoption.prix = 10;
    this.adoption.date = date.toLocaleDateString();
    this.adoptionService.create(this.adoption);
    alert("Votre demande d'adoption pour " + chat.nom + " à bien été pris en compte.");
  }

}
