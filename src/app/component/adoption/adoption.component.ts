import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Adoption } from 'src/app/model/adoption';
import { Chat } from 'src/app/model/chat';
import { AdoptionService } from 'src/app/sevice.api/adoption.service';
import { ChatService } from 'src/app/sevice.api/chat.service';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.scss']
})
export class AdoptionComponent {

  chats : Array<Chat> = new Array<Chat>;
  adoption : Adoption = new Adoption();
  

  constructor(private chatService: ChatService, private adoptionService : AdoptionService){
  }


  findAllAdoptable(): Array<Chat>{
    this.chats=this.chatService.findAllAdoptable();
    return this.chats
  }

  test(chat : Chat): void{
    //chat.nom = chat.nom+" hello";
    chat.adoptable=false;
    chat.permanent=false;
    console.log("hello");
    this.chatService.update(chat);
    this.adoption.idChat=chat.id;
    this.adoption.idClient=1;
    this.adoption.prix=10;
    this.adoptionService.create(this.adoption);
    alert("vous avez  adopté un chat §§§§111");
  }

  allAdoption(): Array<Adoption>{
    return this.adoptionService.findAll();
  }

}
