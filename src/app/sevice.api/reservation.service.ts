import { Injectable } from '@angular/core';
import { Reservation } from '../model/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompteService } from './compte.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  private reservationApiPath : string;
  private reservations : Array<Reservation>;
  private reservationsById : Array<Reservation>;
  private reservation2 : Array<Reservation>;

  constructor(private http: HttpClient, private clientService: CompteService) { 
    this.reservationApiPath = "http://localhost:8080/api" +"/reservation";
    this.load();
    this.loadById();
  }

  load(){
    this.http.get<Array<Reservation>>(this.reservationApiPath).subscribe(resp =>{
      this.reservations = resp;
    })
  }
  loadById(){
    let clientId: number = this.clientService.compte.id;
    this.http.get<Array<Reservation>>((this.reservationApiPath+"/by-client-id/"+clientId)).subscribe(resp => {
      this.reservationsById = resp;
    })
  }

  findAll(): Array<Reservation>{
    return this.reservations;
  }


  findAllByClientId() {
    return this.reservationsById;
  }

  findById(id : number):Observable<Reservation>{
    return this.http.get<Reservation>(this.reservationApiPath+"/"+id);
  }

  create(reservation : Reservation): Observable<Reservation>{
    return this.http.post<Reservation>(this.reservationApiPath, reservation);
  }

  update(reservation : Reservation):void{
    this.http.put<Reservation>(this.reservationApiPath+"/"+reservation.id,reservation).subscribe(resp=>{
      console.log("je vais ici");
      this.load();
      this.loadById();
    });
  }

  remove(id :number):void{
    console.log("2");
    this.http.delete<boolean>(this.reservationApiPath+"/"+id).subscribe(resp=>{
      this.load();
      this.loadById();
    });
  }

}
