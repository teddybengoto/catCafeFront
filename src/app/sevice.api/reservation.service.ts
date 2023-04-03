import { Injectable } from '@angular/core';
import { Reservation } from '../model/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  private reservationApiPath : string;
  private reservations : Array<Reservation>;

  constructor(private http: HttpClient) { 
    this.reservationApiPath = "http://localhost:8080/api" +"/reservation";
  }

  findAll(): Array<Reservation>{
    this.http.get<Array<Reservation>>(this.reservationApiPath).subscribe(resp =>{
      this.reservations = resp;
    })
    return this.reservations;
  }


  findAllByClientId(id : number): Array<Reservation>{
    this.http.get<Array<Reservation>>(this.reservationApiPath+"/by-client-id/"+id).subscribe(resp =>{
      this.reservations= resp;
    });
    return this.reservations;
  }

  findById(id : number):Observable<Reservation>{
    return this.http.get<Reservation>(this.reservationApiPath+"/"+id);
  }

  create(reservation : Reservation):void{
    this.http.post<Reservation>(this.reservationApiPath, reservation).subscribe(resp => {
      console.log(resp);})
  }

  update(reservation : Reservation):void{
    this.http.put<Reservation>(this.reservationApiPath+"/"+reservation.id,reservation);
  }

  remove(id :number):void{
this.http.delete<boolean>(this.reservationApiPath+"/"+id);
  }

}
