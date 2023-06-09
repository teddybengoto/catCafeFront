import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Adoption } from 'src/app/model/adoption';
import { Chat, ChatSend } from 'src/app/model/chat';
import { Compte } from 'src/app/model/compte';
import { Garde } from 'src/app/model/garde';
import { Reservation } from 'src/app/model/reservation';
import { AdoptionService } from 'src/app/sevice.api/adoption.service';
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

  myCompte: Compte;
  updateCompte!: FormGroup;
  showUpdateForm = false;

  toto: string = "100%";
  col: string = 'red';

  chatForm: ChatSend = null;
  race: Array<string> = ["Europeen", "Ragdoll", "MainCoon", "Persan",
    "Sphynx", "SacreDeBirmanie", "BritishShorthair",
    "Norvegien", "Chartreux", "Siamois", "Abyssin", "Bengal", "Autre"];

  gardes: Array<Garde> = new Array<Garde>;
  chats: Array<Chat> = new Array<Chat>;
  reservations: Array<Reservation> = new Array<Reservation>;
  adoptions: Array<Adoption> = new Array<Adoption>;

  file: File = null; // Variable to store file
  loading: boolean = false; // Flag variable
  // Variable to store shortLink from api response
  shortLink: string = "";
  uploadImage=false;
  catId:number;


  constructor(private gardeService: GardeService, private chatService: ChatService, private toastr: ToastrService, private formBuilder: FormBuilder, private compteService: CompteService, private router: Router, private reservationService: ReservationService, private adoptionService: AdoptionService) {



    if (!compteService.auth?.id) {
      this.router.navigate(['/connexion']);
    }
    this.findClientDetail();
    this.updateCompte = this.formBuilder.group({
      nom: this.formBuilder.control(this.getDataClient().nom, [Validators.required]),
      prenom: this.formBuilder.control(this.getDataClient().prenom, [Validators.required]),
      login: this.formBuilder.control(this.getDataClient().login, [Validators.required, Validators.email]),
      telephone: this.formBuilder.control(this.getDataClient().telephone, [Validators.required, Validators.minLength(8)])
    });

    this.findClientDetail();
    this.chatService.loadById();
  }

  showToaster() {
    this.toastr.error('everything is broken', 'Major Error', {
      timeOut: 3000,
      positionClass: 'toast-center-center',
    });

  }

  getMyCat() {
    this.chats = this.chatService.findAllByClientId();
    return this.chats;
  }

  getCatById(id: number) {
    return this.chatService.findById(id);
  }

  getMyCatGard() {
    this.gardes = this.gardeService.findAllByClient();
    return this.gardes;
  }

  getMyAdoption() {
    this.adoptions = this.adoptionService.findAllByClient();
    return this.adoptions;
  }
  getDataClient(): Compte {
    return this.compteService.compte;
  }

  getMyReservation() {
    console.log("problème reservation");
    this.reservations = this.reservationService.findAllByClientId();
    return this.reservations;
  }

  getClient() {
    this.compteService.findClientById(this.compteService.auth.id);
  }

  fileChange(event: any) {
    this.file = event.target.files[0];
  }

  update() {


    this.compteService.update(this.updateCompte.value).subscribe(resp => {

      if (resp?.id) {
        this.myCompte = resp;
        this.toastr.success('Modification enregistrées', "C'est tout bon !", {
          timeOut: 3000,
          positionClass: 'toast-center-center',
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

  add(): void {
    this.chatForm = new ChatSend();
    this.chatService.loadById();
  }

  save(): void {
    this.chatForm.clientId = this.compteService.auth?.id;
    this.chatService.create(this.chatForm);
    this.cancel();
  }

  cancel() {
    this.chatForm = null;
  }

showuploadImageForm(id:number){
  this.uploadImage=true;
  this.catId=id;
}
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.uploadImage=false;
    this.loading = !this.loading;
    console.log(this.file);
    this.chatService.upload(this.catId, this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          // Short link via api response
          this.shortLink = event.link;
          this.loading = false; // Flag variable 
          this.router.navigate(['/']);          
        }
      }  
    );
    console.log("load");
    


  }

}
