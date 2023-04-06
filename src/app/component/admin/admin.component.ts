import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/model/chat';
import { ClientRequest } from 'src/app/model/clientRequest';
import { Compte } from 'src/app/model/compte';
import { AdoptionService } from 'src/app/sevice.api/adoption.service';
import { ChatService } from 'src/app/sevice.api/chat.service';
import { CompteService } from 'src/app/sevice.api/compte.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private chatService: ChatService,
    private adoptionService : AdoptionService,
    private compteService: CompteService,
    private router : Router){
      if (!compteService.auth?.id) {
        this.router.navigate(['/connexion']);
      }
  }
}
