import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Espace } from 'src/app/model/espace';
import { Reservation } from 'src/app/model/reservation';
import { CompteService } from 'src/app/sevice.api/compte.service';
import { ReservationService } from 'src/app/sevice.api/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  reservationForm: Reservation = new Reservation();
  plan: string ="../../../assets/img/Plan_Standard.jpg";

  keys= Object.keys;
  espaces = Espace;

  constructor (private reservationService: ReservationService, private compteService: CompteService, private router:Router){
    if (!compteService.auth?.id) {
      this.router.navigate(['/connexion']);
    }
  }

  create(){
    this.reservationForm.client_id = this.compteService.auth.id;
    this.reservationService.create(this.reservationForm);
    alert("Votre réservation a bien été pris en compte. Merci !");
    this.router.navigate(['/']);
  }

  @HostListener('change', ['$event.target'])
  modifPlan() {
    console.log("test : ", this.reservationForm.espace);
    console.log("test2", this.reservationForm.espace.toString());
    switch (this.reservationForm.espace.toString())
    {
      case null:{this.plan = "../../../assets/img/Plan_Standard.jpg";   break;}
      case "Chill":{this.plan = "../../../assets/img/Plan_Chill.jpg";  break;}
      case "Coworking":{this.plan = "../../../assets/img/Plan_Cowork.jpg";  break;}
      case "Jeu":{this.plan = "../../../assets/img/Plan_Jeu.jpg"; break;}
      case "SalonDeThé":{this.plan = "../../../assets/img/Plan_SalonThe.jpg"; break;}
    }

   
    
  }









}
