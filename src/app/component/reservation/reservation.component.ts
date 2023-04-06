import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Espace } from 'src/app/model/espace';
import { Reservation } from 'src/app/model/reservation';
import { CompteService } from 'src/app/sevice.api/compte.service';
import { ReservationService } from 'src/app/sevice.api/reservation.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  reservation: Reservation = new Reservation;
  createResa: FormGroup;
  plan: string = "../../../assets/img/Plan_Standard.jpg";

  keys = Object.keys;
  espaces = Espace;

  constructor(private reservationService: ReservationService, private compteService: CompteService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) {
    if (!compteService.auth?.id) {
      this.router.navigate(['/connexion']);

    }

    this.createResa = this.formBuilder.group({
      espace: this.formBuilder.control('', Validators.required),
      jour: this.formBuilder.control('', [Validators.required]),
      heure: this.formBuilder.control('', Validators.required),
      effectif: this.formBuilder.control('', Validators.required)
    });

  }



  create() {

    this.reservation = {...this.createResa.value};
    this.reservation.client_id = this.compteService.auth.id;
    this.reservationService.create(this.reservation).subscribe(resp => {
      console.log("Resp: ", resp);
      let message = "vous avez reservé le " + this.reservation.jour + " à " + this.reservation.heure + " pour " + this.reservation.effectif + " personnes"
      if (this.reservation.id !==null) {
        this.toastr.success(message, 'Réservation enregistrée !', {
          positionClass: 'toast-center-center',
            closeButton : true,
            disableTimeOut : true,
        });
        this.router.navigate(['/']);
      }
      else
      {
        this.toastr.error('Réservation non enregistrée, Veuillez recommencer !', 'error', {
          positionClass: 'toast-bottom-full-width',
        });
      }
    })
  }

  @HostListener('change', ['$event.target'])
  modifPlan() {
    console.log("test : ", this.reservation.espace);
    console.log("test2", this.reservation.espace.toString());
    switch (this.reservation.espace.toString())
    {
      case null:{this.plan = "../../../assets/img/Plan_Standard.jpg";   break;}
      case "Chill":{this.plan = "../../../assets/img/Plan_Chill.jpg";  break;}
      case "Coworking":{this.plan = "../../../assets/img/Plan_Cowork.jpg";  break;}
      case "Jeu":{this.plan = "../../../assets/img/Plan_Jeu.jpg"; break;}
      case "SalonDeThe":{this.plan = "../../../assets/img/Plan_SalonThe.jpg"; break;}
    }
}

}
