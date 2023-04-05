import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatButtonComponent } from './component/cat-button/cat-button.component';
import { CompteComponent } from './component/compte/compte.component';
import { HomeComponent } from './component/home/home.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { AdoptionComponent } from './component/adoption/adoption.component';
import { TestComponent } from './component/test/test.component';
import { GardeComponent } from './component/garde/garde.component';
import { ReservationComponent } from './component/reservation/reservation.component';
import { AdminComponent } from './component/admin/admin.component';
import { AdminChatComponent } from './component/admin-chat/admin-chat.component';

const routes: Routes = [
  {path : "", component: HomeComponent, pathMatch: 'full'},
  {path : "connexion", component: InscriptionComponent},
  {path : "test", component: TestComponent},
  {path : "profil", component: CompteComponent},
  {path : "adoption", component: AdoptionComponent},
  {path : "garde", component: GardeComponent},
  {path : "reservation", component: ReservationComponent},
  {path : "admin", component: AdminComponent},
  {path: "allChat", component:AdminChatComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
