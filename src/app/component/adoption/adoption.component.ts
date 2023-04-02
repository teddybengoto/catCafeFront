import { Component } from '@angular/core';
import { Chat } from 'src/app/model/chat';
import { ChatService } from 'src/app/sevice.api/chat.service';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.scss']
})
export class AdoptionComponent {

  chats : Array<Chat>;

  constructor(private chatService: ChatService){}


  findAllAdoptable(): Array<Chat>{
    this.chats=this.chatService.findAllAdoptable();
    return this.chats;
  }

  load(){
    console.log("hello")
    this.chats=this.chatService.findAllAdoptable();
  }
}
