import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { CompteService } from './sevice.api/compte.service';
import { HealderComponent } from './component/healder/healder.component';
import { HomeComponent } from './component/home/home.component';
import { CatButtonComponent } from './component/cat-button/cat-button.component';
import { FooterComponent } from './component/footer/footer.component';
import { CompteComponent } from './component/compte/compte.component';
import { AdoptionComponent } from './component/adoption/adoption.component';
import { ReservationComponent } from './component/reservation/reservation.component';
import { GardeComponent } from './component/garde/garde.component';
import { ReservationService } from './sevice.api/reservation.service';
import { AdoptionService } from './sevice.api/adoption.service';
import { TestComponent } from './component/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    HealderComponent,
    HomeComponent,
    CatButtonComponent,
    FooterComponent,
    CompteComponent,
    AdoptionComponent,
    TestComponent,
    GardeComponent,
    ReservationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
    
  ],
  // why do I need to put module in providers ?
  providers: [CompteService,InscriptionComponent,ReservationService,AdoptionService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
