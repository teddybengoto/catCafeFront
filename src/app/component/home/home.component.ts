import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselElementComponent } from '../carousel-element/carousel-element.component';
import { ChatService } from 'src/app/sevice.api/chat.service';
import { Chat } from 'src/app/model/chat';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  chatsPermanents : Array<Chat>;

  constructor(private chatService : ChatService){
  }

  getChatsPermanents() : Array<Chat>{
    //console.log(this.chatService.findAllPermanent());
    return this.chatService.findAllPermanent();

  }
  getChatsPermanentsCourt() : Array<Chat>{
    //console.log(this.chatService.findAllPermanent());
    return this.chatService.findAllPermanent().spice(1,3);

  }


}
