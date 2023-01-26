import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/client/carlist',          title: 'Mes Voitures',      icon:'nc-single-02',  class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
];

export const RoutesAtelier: RouteInfo[] = [
    { path: '/atelier/garage',          title: 'Garage',      icon:'nc-single-02',  class: '' },
    { path: '/atelier/bonsortie',          title: 'Bon de Sortie',      icon:'nc-single-02',  class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    constructor( private authService: AuthService , private router: Router) { }
    
    public menuItems: any[];

    ngOnInit() {
        const currentUser = this.authService.currentUserValue;
        if(currentUser && currentUser.type === "client") {
            this.menuItems = ROUTES.filter(menuItem => menuItem);
        }
        if(currentUser && currentUser.type === "atelier") {
            this.menuItems = RoutesAtelier.filter(menuItem => menuItem);
        }
    }

    Logout() {
        this.authService.logout();
        this.router.navigate(['/client/login']);
    }
}

