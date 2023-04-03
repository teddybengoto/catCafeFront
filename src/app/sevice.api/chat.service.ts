import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../model/chat';
import { Observable } from 'rxjs';
import { CompteService } from './compte.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private chatApiPath : string;
  private chats : Array<Chat> = new Array<Chat>;
  private chatsById : Array<Chat> = new Array<Chat>;

  constructor(private http: HttpClient, private clientService: CompteService) { 
    this.chatApiPath = "http://localhost:8080/api" +"/chat";
    this.load();
    this.loadById();
  }

  findAll(): any{
    this.http.get<Array<Chat>>(this.chatApiPath).subscribe(resp =>{
      this.chats = resp;
      return this.chats;
    })
  }

  findAllAdoptable(): Array<Chat>{
    return this.chats;
  }

  findAllPermanent(): any{
    this.http.get<Array<Chat>>(this.chatApiPath+ "/permanent").subscribe(resp =>{
      this.chats = resp;
      return this.chats;
    })
  }
  findAllByClientId(): Array<Chat>{

    return this.chatsById;
  }

  findById(id : number):Observable<Chat>{
    return this.http.get<Chat>(this.chatApiPath+"/"+id);
  }

  create(chat : Chat):void{
    this.http.post<Chat>(this.chatApiPath, chat);
  }

  update(chat : Chat):void{
    this.http.put<Chat>(this.chatApiPath+"/"+chat.id,chat);
  }

  remove(id :number):void{
this.http.delete<boolean>(this.chatApiPath+"/"+id);
  }

  private load():void{
    this.http.get<Array<Chat>>(this.chatApiPath+ "/adoptable").subscribe(resp =>{
      this.chats = resp;
    })
  }

  private loadById():void{
    this.http.get<Array<Chat>>(this.chatApiPath+"/by-client-id/" + this.clientService.auth.id).subscribe(resp =>{
      this.chatsById = resp;
    });

  }

  getChats() : Array<Chat>
  {
    return this.chats;
  }

}
