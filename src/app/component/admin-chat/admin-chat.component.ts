import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/model/chat';
import { Compte } from 'src/app/model/compte';
import { ChatService } from 'src/app/sevice.api/chat.service';
import { CompteService } from 'src/app/sevice.api/compte.service';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.scss']
})
export class AdminChatComponent {

  chatForm : Chat = null;
  chats : Array<Chat> = new Array<Chat>;
  clients : Array<Compte> = new Array<Compte>;
  race : Array<string> = ["Europeen","Ragdoll", "MainCoon", "Persan",
    "Sphynx","SacreDeBirmanie","BritishShorthair",
    "Norvegien","Chartreux","Siamois","Abyssin","Bengal","Autre"];
  
    constructor(private chatService: ChatService,
      private compteService: CompteService,
      private router : Router){
        if (!compteService.auth?.id) {
          this.router.navigate(['/connexion']);
        }
    }

    edit(id: number): void{
      this.chatService.findById(id).subscribe(resp =>{
        this.chatForm = resp;
        //console.log(this.chatForm);
      });
      //console.log(this.chatForm);
    }
  
    remove(id: number):void{
      this.chatService.remove(id);
    }
  
    add(): void{
      this.chatForm=new Chat();
    }
  
    save():void{
      if(this.chatForm.id){
        this.chatService.update(this.chatForm);
      }
      else{
        this.chatService.create(this.chatForm);
      }
      this.cancel();
    }
  
    cancel(){
      this.chatForm=null;
    }
  
    findAllChat(): Array<Chat>{
      this.chats=this.chatService.findAll();
      return this.chats
    }

    findAllClient():Array<Compte>{
      this.clients=this.compteService.findAll();
      return this.clients;
    }

}
