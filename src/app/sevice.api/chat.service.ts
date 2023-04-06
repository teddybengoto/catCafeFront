import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat, ChatSend } from '../model/chat';
import { Observable } from 'rxjs';
import { CompteService } from './compte.service';
import { ClientRequest } from '../model/clientRequest';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatsById : Array<Chat> = new Array<Chat>;

  private chatApiPath: string;
  private chats: Array<Chat> = new Array<Chat>;
  private chatsAll: Array<Chat> = new Array<Chat>;
  private chatsAdoptable: Array<Chat> = new Array<Chat>;
  chatsPermanent: Array<Chat> = new Array<Chat>;

  constructor(private http: HttpClient, private clientService : CompteService) {
    this.chatApiPath = "http://localhost:8080/api" + "/chat";
    this.loadAdoptable();
    this.loadAll();
    this.loadPermanent();
    this.loadById();
  }

  findAll(): Array<Chat> {
    return this.chatsAll
    
  }

  findAllAdoptable(): Array<Chat> {
    return this.chatsAdoptable;
  }

  findAllPermanent(): Array<Chat> {
 
    return this.chatsPermanent;
  }
  
  findAllByClientId(): Array<Chat>{
    return this.chatsById;
  
  }

  findById(id: number): Observable<Chat> {
    return this.http.get<Chat>(this.chatApiPath + "/" + id);
  }

  create(chat: ChatSend): void {
    //console.log(chat);
    this.http.post<Chat>(this.chatApiPath, chat).subscribe(resp => {
    this.loadAdoptable();
    this.loadAll();
    this.loadPermanent();
    });
  }

  update(chat: ChatSend): void {
    console.log(chat);
    this.http.put<Chat>(this.chatApiPath + "/" + chat.id, chat).subscribe(resp => {
      this.loadAdoptable();
    this.loadAll();
    this.loadPermanent();
    });
  }

 /* updateImage(id:number,image:FormData): void {


    //headers: { 'Content-Type': 'multipart/form-data' }, ?????
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/json');


    console.log("Body: ",image);


    this.http.put<any>(this.chatApiPath + "/image/" +id,image).subscribe(resp => {
      
      console.log("resp: ",resp);
      //return null;
      
    });
  }*/

   // Returns an observable
   upload(id:number,file: File):Observable<any> {
   
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.put(this.chatApiPath + "/image/" +id,formData)
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

  loadById():void{
    let clientId: number = this.clientService.compte.id;
    this.http.get<Array<Chat>>(this.chatApiPath+"/by-client-id/" + this.clientService.auth.id).subscribe(resp =>{
      this.chatsById = resp;
    });

  }
  private loadAdoptable(): void {
    this.http.get<Array<Chat>>(this.chatApiPath + "/adoptable").subscribe(resp => {
      this.chatsAdoptable = resp;
    })
  }
  loadPermanent(): void {
    this.http.get<Array<Chat>>(this.chatApiPath + "/permanent").subscribe(resp => {
      this.chatsPermanent = resp;;
    })

  }
  getChats() : Array<Chat>
  {
    return this.chats;
  }
}
