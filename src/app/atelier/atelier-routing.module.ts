import { BonSortieComponent } from './bon-sortie/bon-sortie.component';
import { GarageComponent } from './garage/garage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientLayoutComponent } from 'app/client/client-layout/client-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {path:'garage',component:GarageComponent},
      {path:'bonsortie', component: BonSortieComponent },
      // {path:'',component:CarListComponent},
      // {path:'', redirectTo: '/carlist', pathMatch: 'full' },
      // {
      //   path: '**',
      //   redirectTo: 'error/404',
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtelierRoutingModule { }
