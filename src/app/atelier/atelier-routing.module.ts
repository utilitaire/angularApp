import { ReceptionComponent } from './reception/reception.component';
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
      {path:'bonsortie', component: BonSortieComponent },
      {path:'reception', component: ReceptionComponent },
      {path:'garage',component:GarageComponent},
      {path:'garage/:carId', component: GarageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtelierRoutingModule { }
