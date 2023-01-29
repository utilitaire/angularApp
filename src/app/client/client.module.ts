import { SidebarModule } from './../sidebar/sidebar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule} from '@angular/cdk/drag-drop';

import { ClientRoutingModule } from './client-routing.module';
import { CarListComponent } from './components/car-list/car-list.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { NavbarModule } from 'app/shared/navbar/navbar.module';
import { FixedPluginModule } from 'app/shared/fixedplugin/fixedplugin.module';
import { FooterModule } from 'app/shared/footer/footer.module';
import { DepotVoitureComponent } from './components/depot-voiture/depot-voiture.component';
import { ReparationComponent } from './components/reparation/reparation.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    CarListComponent,
    ClientLayoutComponent,
    DepotVoitureComponent,
    ReparationComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbModule,
    NgxSliderModule
  ]
})
export class ClientModule { }
