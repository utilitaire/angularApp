import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { CarListComponent } from './components/car-list/car-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {path:'carlist',component:CarListComponent},
      {path:'carlist/:carId', component: CarListComponent },
      {path:'',component:CarListComponent},
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
export class ClientRoutingModule { }

// import { Routes } from '@angular/router';

// import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
// import { UserComponent } from '../../pages/user/user.component';
// import { TableComponent } from '../../pages/table/table.component';
// import { IconsComponent } from '../../pages/icons/icons.component';

// export const AdminLayoutRoutes: Routes = [
//     { path: 'dashboard',      component: DashboardComponent },
//     { path: 'user',           component: UserComponent },
//     { path: 'table',          component: TableComponent },
//     { path: 'icons',          component: IconsComponent },
// ];
