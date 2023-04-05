import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chat } from 'src/app/model/chat';
import { Compte } from 'src/app/model/compte';
import { Garde } from 'src/app/model/garde';
import { Reservation } from 'src/app/model/reservation';
import { ChatService } from 'src/app/sevice.api/chat.service';
import { CompteService } from 'src/app/sevice.api/compte.service';
import { GardeService } from 'src/app/sevice.api/garde.service';
import { ReservationService } from 'src/app/sevice.api/reservation.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent {

  gardes : Array<Garde> = new Array<Garde>;
  chats : Array<Chat> = new Array<Chat>;
  myCompte: Compte;
  updateCompte!: FormGroup;
  showUpdateForm = false;

  toto:string="100%";
  col:string='red';

  gardes : Array<Garde> = new Array<Garde>;
  chats : Array<Chat>=new Array<Chat>;
  reservations : Array<Reservation> = new Array<Reservation>;

  constructor(private gardeService: GardeService , private chatService: ChatService, private toastr: ToastrService, private formBuilder: FormBuilder, private compteService: CompteService, private router: Router, private reservationService : ReservationService) {



    if (!compteService.auth?.id) {
      this.router.navigate(['/connexion']);
    }

    this.updateCompte = this.formBuilder.group({
      nom: this.formBuilder.control('', Validators.required),
      prenom: this.formBuilder.control('', [Validators.required]),
      login: this.formBuilder.control('', [Validators.required, Validators.email]),
      telephone: this.formBuilder.control('', [Validators.required, Validators.minLength(8)])
    });

    this.findClientDetail();
    this.chatService.loadById();
  }

  showToaster() {
    this.toastr.error('everything is broken', 'Major Error', {
      timeOut: 3000,
      positionClass: 'toast-top-left',
    });

  }

  getMyCat() {
    //console.log("this.chatService.findAllByClientId(): ",this.chatService.findAllByClientId());
    console.log("problème chat");
    this.chats = this.chatService.findAllByClientId();
    return this.chats;
  }

  getMyCatGard() {
    console.log("problème garde");
    this.gardes = this.gardeService.findAllByClient();
    return this.gardes;
  }

  getMyReservation(){
    console.log("problème reservation");
    this.reservations = this.reservationService.findAllByClientId(this.compteService.auth.id);
    return this.reservations;
  }



  getClient() {
    this.compteService.findClientById(this.compteService.auth.id);
  }

update(){
    this.compteService.update(this.updateCompte.value).subscribe(resp => {
      console.log("Resp: ", resp);

      if (resp?.id) {
        this.myCompte = resp;
        this.toastr.success('Modification enregistrés', 'succes', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width',
        });
        this.showUpdateForm = false;

      }
      else {
        this.toastr.error('Modification non enregistrés', 'error', {
          timeOut: 3000,
          positionClass: 'toast-top-full-width',
        });
      }

    });
  }


  findClientDetail(): void {
    this.compteService.findClientDetail(this.compteService.auth.id).subscribe(resp => {
      if (!resp?.id) {
        console.log("No Client");
      }
      this.myCompte = resp;
    })
  }

}
