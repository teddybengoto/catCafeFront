import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Compte } from 'src/app/model/compte';
import { Espace } from 'src/app/model/espace';
import { Reservation } from 'src/app/model/reservation';
import { CompteService } from 'src/app/sevice.api/compte.service';
import { ReservationService } from 'src/app/sevice.api/reservation.service';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.scss']
})
export class AdminReservationComponent {

  reservationForm : Reservation = null;
  reservations : Array<Reservation> = new Array<Reservation>;
  clients : Array<Compte> = new Array<Compte>;
  keys = Object.keys;
  espaces = Espace;

  constructor(private compteService: CompteService, private reservationService: ReservationService,
    private router : Router){
      if (!compteService.auth?.id) {
        this.router.navigate(['/connexion']);
      }
  }

  findAllReservation(): Array<Reservation>{
    this.reservations=this.reservationService.findAll();
    return this.reservations
  }

  toNumber(a:string): number{
    return Number(a);
  }

  edit(id: number): void{
    this.reservationService.findById(id).subscribe(resp =>{
      this.reservationForm = resp;
      //this.reservationForm.client_id=this.reservationForm.client.id;
      //console.log(this.chatForm);
    });
    //console.log(this.chatForm);
  }

  remove(id: number):void{
    console.log("1");
    this.reservationService.remove(id);
  }
  
  add(): void{
    this.reservationForm=new Reservation();
  }

  save():void{
    if(this.reservationForm.id){
      console.log(this.reservationForm);
      this.reservationForm.client.id=Number(this.reservationForm.client_id);
      console.log(this.reservationForm);
      this.reservationForm.client_id = Number(this.reservationForm.client_id);
      this.reservationService.update(this.reservationForm);
    }
    else{
      //this.reservationForm.client=Number(this.reservationForm.client_id);
      this.reservationService.create(this.reservationForm);
    }
    this.cancel();
  }

  findAllClient(): Array<Compte> {
    this.clients = this.compteService.findAll();
    return this.clients;
  }

  cancel(){
    this.reservationForm=null;
  }

  retour(){
    this.router.navigate(['/admin'])
  }
}
