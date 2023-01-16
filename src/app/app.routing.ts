import { ClientLayoutComponent } from './client/client-layout/client-layout.component';
import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full',
  },
  // {
  //   path: '',
  //   component: AdminLayoutComponent,
  //   children: [
  //       {
  //         path: '',
  //         loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  //       }
  //     ]
  // },
  {
    path: '',
    // canActivate: [AuthGuard],
    // component: ClientLayoutComponent,
    loadChildren: () => import('./client/client.module').then((m) => m.ClientModule),
  },
  {
    path: '**',
    redirectTo: 'client'
  }
]
