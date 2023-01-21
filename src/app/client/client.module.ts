import { SidebarModule } from './../sidebar/sidebar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { CarListComponent } from './components/car-list/car-list.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { NavbarModule } from 'app/shared/navbar/navbar.module';
import { FixedPluginModule } from 'app/shared/fixedplugin/fixedplugin.module';
import { FooterModule } from 'app/shared/footer/footer.module';


@NgModule({
  declarations: [
    CarListComponent,
    ClientLayoutComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
  ]
})
export class ClientModule { }
