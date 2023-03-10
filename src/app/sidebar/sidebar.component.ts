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
    { path: '/client/carlist',          title: 'Garage',      icon:'nc-single-02',  class: '' },
    { path: '/client/depot',          title: 'Deposer une voiture',      icon:'nc-single-02',  class: '' },
];

export const RoutesAtelier: RouteInfo[] = [
    { path: '/atelier/reception',          title: 'Reception Voitures',      icon:'nc-single-02',  class: '' },
    { path: '/atelier/garage',          title: 'Garage',      icon:'nc-single-02',  class: '' },
    { path: '/atelier/bonsortie',          title: 'Bon de Sortie',      icon:'nc-single-02',  class: '' },
];

export const RoutesFinance: RouteInfo[] = [
    { path: '/finance/paiement',          title: 'Valider Paiements',      icon:'nc-single-02',  class: '' },
    { path: '/finance/paiement',          title: 'Statistiques',      icon:'nc-single-02',  class: '' },
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
        if(currentUser && currentUser.type === "finance") {
            this.menuItems = RoutesFinance.filter(menuItem => menuItem);
        }
    }
}

