import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Adoption } from 'src/app/model/adoption';
import { Chat } from 'src/app/model/chat';
import { AdoptionService } from 'src/app/sevice.api/adoption.service';
import { ChatService } from 'src/app/sevice.api/chat.service';
import { CompteService } from 'src/app/sevice.api/compte.service';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.scss']
})
export class AdoptionComponent {

  chats : Array<Chat> = new Array<Chat>;
  adoption : Adoption = new Adoption();

  constructor(private chatService: ChatService,
    private adoptionService : AdoptionService,
    private compteService: CompteService,
    private router : Router){
    if (!compteService.auth?.id) {
      this.router.navigate(['/connexion']);
    }
  }

  findAllAdoptable(): Array<Chat>{
    this.chats=this.chatService.findAllAdoptable();
    return this.chats
  }

  adopter(chat : Chat): void{
    chat.adoptable=false;
    chat.permanent=false;
    chat.clientId=this.compteService.auth?.id;
    this.chatService.update(chat);
    this.adoption.idChat=chat.id;
    this.adoption.idClient=this.compteService.auth?.id;
    this.adoption.prix=10;
    this.adoptionService.create(this.adoption);
    alert("Votre demande d'adoption pour "+chat.nom+" à bien été pris en compte.");
  }

}
