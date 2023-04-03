import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../model/chat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatApiPath: string;
  private chats: Array<Chat> = new Array<Chat>;
  private chatsAll: Array<Chat> = new Array<Chat>;
  private chatsAdoptable: Array<Chat> = new Array<Chat>;
  private chatsPermanent: Array<Chat> = new Array<Chat>;

  constructor(private http: HttpClient) {
    this.chatApiPath = "http://localhost:8080/api" + "/chat";
    this.loadAdoptable();
    this.loadAll();
    this.loadPermanent();
  }

  findAll(): any {
    return this.chatsAll
    
  }

  findAllAdoptable(): Array<Chat> {
    return this.chatsAdoptable;
  }

  findAllPermanent(): any {
    return this.chatsPermanent;
  }
  findAllByClientId(id: number): any {
    this.http.get<Array<Chat>>(this.chatApiPath + "/by-client-id/" + id).subscribe(resp => {
      this.chats = resp;
      return this.chats;
    });
  }

  findById(id: number): Observable<Chat> {
    return this.http.get<Chat>(this.chatApiPath + "/" + id);
  }

  create(chat: Chat): void {
    this.http.post<Chat>(this.chatApiPath, chat).subscribe(resp => {
      this.loadAdoptable();
    this.loadAll();
    this.loadPermanent();
    });
  }

  update(chat: Chat): void {
    this.http.put<Chat>(this.chatApiPath + "/" + chat.id, chat).subscribe(resp => {
      this.loadAdoptable();
    this.loadAll();
    this.loadPermanent();
    });
  }

  remove(id: number): void {
    this.http.delete<boolean>(this.chatApiPath + "/" + id).subscribe(resp => {
      this.loadAdoptable();
    this.loadAll();
    this.loadPermanent();
    });
  }

  private loadAll(): void {
    this.http.get<Array<Chat>>(this.chatApiPath).subscribe(resp => {
      this.chatsAll = resp;
    })
  }

  private loadAdoptable(): void {
    this.http.get<Array<Chat>>(this.chatApiPath + "/adoptable").subscribe(resp => {
      this.chatsAdoptable = resp;
    })
  }
  private loadPermanent(): void {
    this.http.get<Array<Chat>>(this.chatApiPath + "/permanent").subscribe(resp => {
      this.chatsPermanent = resp;
    })
  }
}
