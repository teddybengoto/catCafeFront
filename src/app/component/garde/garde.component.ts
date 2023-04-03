import { Component } from '@angular/core';
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

  gardes: Array<Garde>;
  garde: Garde;
  chats: Array<Chat>;
  
  constructor(private gardeService: GardeService, private clientService: CompteService, private chatService: ChatService){


    //alert("id du client : " + clientService.compte.id);
  }

  ngOnInit(): void{

    console.log("id du client :");
    console.log(this.clientService.auth.id);
    this.chats = this.chatService.findAll(); 
    //this.chats = this.chatService.findAllByClientId(this.clientService.auth.id);
    //console.log("ca marche :" + this.chats[0].nom);
    /*for(let c of this.chats){
      console.log(c.nom);
    }*/

  }

}
