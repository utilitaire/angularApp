import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class ClientAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = this.authService.currentUserValue;
    // if (currentUser) {
    //   // utilisateur connecte donc true
    //   return true;
    // }

    // // not logged in so redirect to login page with the return url
    // this.authService.logout();
    const userId = this.authService.getUserId();
    if (userId) {
      // utilisateur connecte donc true
      return true;
    }
    
    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }
}
