import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // { path: 'client/login',      component: LoginComponent },
  { path: '',
    redirectTo: 'client/login',
    pathMatch: 'full'
  },
  {
    path: 'client/login',
    component: LoginComponent,
    data: {returnUrl: window.location.pathname}
  },
    // {path: '', redirectTo: 'login', pathMatch: 'full'},
    // {path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
