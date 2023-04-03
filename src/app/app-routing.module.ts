import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatButtonComponent } from './component/cat-button/cat-button.component';
import { CompteComponent } from './component/compte/compte.component';
import { HomeComponent } from './component/home/home.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { AdoptionComponent } from './component/adoption/adoption.component';
import { TestComponent } from './component/test/test.component';

const routes: Routes = [
  {path : "", component: HomeComponent, pathMatch: 'full'},
  {path : "connexion", component: InscriptionComponent},
  {path : "test", component: TestComponent},
  {path : "profil", component: CompteComponent},
  {path : "adoption", component: AdoptionComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
