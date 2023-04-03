import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../model/chat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private chatApiPath : string;
  private chats : Array<Chat> = new Array<Chat>;

  constructor(private http: HttpClient) { 
    this.chatApiPath = "http://localhost:8080/api" +"/chat";
    this.load();
  }

  findAll(): Array<Chat>{
    this.http.get<Array<Chat>>(this.chatApiPath).subscribe(resp =>{
      this.chats = resp;
    })
    return this.chats;
  }

  findAllAdoptable(): Array<Chat>{
    return this.chats;
  }

  findAllPermanent(): Array<Chat>{
    this.http.get<Array<Chat>>(this.chatApiPath+ "/permanent").subscribe(resp =>{
      this.chats = resp;
    })
    return this.chats;
  }
  findAllByClientId(id : number): Array<Chat>{
    this.http.get<Array<Chat>>(this.chatApiPath+"/by-client-id/"+id).subscribe(resp =>{
      this.chats= resp;
    });
    return this.chats;
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

}
