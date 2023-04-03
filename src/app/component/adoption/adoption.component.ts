import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/model/chat';
import { ChatService } from 'src/app/sevice.api/chat.service';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.scss']
})
export class AdoptionComponent {

  chats : Array<Chat> = new Array<Chat>;
  taille : number = -1;
  searched = false;

  constructor(private chatService: ChatService){
  }


  findAllAdoptable(): Array<Chat>{
    console.log(this.chats.length)
    this.chats=this.chatService.findAllAdoptable();
    console.log(this.chats.length)
    //this.taille=this.chats.length;
    return this.chatService.findAllAdoptable();
  }

}
