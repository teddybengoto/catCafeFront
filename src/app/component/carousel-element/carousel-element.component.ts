import { Component, Input } from '@angular/core';
import { Chat } from 'src/app/model/chat';
import { ChatService } from 'src/app/sevice.api/chat.service';


@Component({
  selector: 'carousel-element',
  templateUrl: './carousel-element.component.html',
  styleUrls: ['./carousel-element.component.scss']
})
export class CarouselElementComponent {
  
  @Input()
  chat: Chat;
  potitChat : string;

  constructor(private chatService : ChatService){
    //let temp:number = this.chat.id % 3;
    this.potitChat = ("../../../assets/img/chat rebord 4.png");
  }




}
