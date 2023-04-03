import { Component } from '@angular/core';
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


}
