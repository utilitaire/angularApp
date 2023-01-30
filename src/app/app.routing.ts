import { ClientLayoutComponent } from './client/client-layout/client-layout.component';
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { ClientAuthGuard } from './client/services/client-auth-guard';
import { AtelierAuthGuard } from './client/services/atelier-auth-guard';
import { FinanceAuthGuard } from './client/services/finance-auth-guard';

export const AppRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
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
    path: 'client',
    canActivate: [ClientAuthGuard],
    loadChildren: () => import('./client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'finance',
    canActivate: [FinanceAuthGuard],
    loadChildren: () => import('./finance/finance.module').then((m) => m.FinanceModule),
  },
  {
    path: 'atelier',
    canActivate: [AtelierAuthGuard],
    loadChildren: () => import('./atelier/atelier.module').then((m) => m.AtelierModule),
  },
  {
    path: '**',
    redirectTo: 'client'
  }
]
