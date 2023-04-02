import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatButtonComponent } from './component/cat-button/cat-button.component';
import { CompteComponent } from './component/compte/compte.component';
import { HomeComponent } from './component/home/home.component';
import { InscriptionComponent } from './component/inscription/inscription.component';

const routes: Routes = [
  {path : "", component: HomeComponent, pathMatch: 'full'},
  {path : "connexion", component: InscriptionComponent},
  {path : "bt", component: CatButtonComponent},
  {path : "profil", component: CompteComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
