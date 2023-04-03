import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { GardeComponent } from './component/garde/garde.component';

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
    GardeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  // why do I need to put module in providers ?
  providers: [CompteService,InscriptionComponent,],
  bootstrap: [AppComponent]
})
export class AppModule { }
