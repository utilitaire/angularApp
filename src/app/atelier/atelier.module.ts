import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtelierRoutingModule } from './atelier-routing.module';
import { FixedPluginModule } from 'app/shared/fixedplugin/fixedplugin.module';
import { FooterModule } from 'app/shared/footer/footer.module';
import { NavbarModule } from 'app/shared/navbar/navbar.module';
import { SidebarModule } from 'app/sidebar/sidebar.module';
import { GarageComponent } from './garage/garage.component';
import { BonSortieComponent } from './bon-sortie/bon-sortie.component';
import { ReceptionComponent } from './reception/reception.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { AddReparationModalComponent } from './add-reparation-modal/add-reparation-modal.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
@NgModule({
  declarations: [

  
    GarageComponent,
        BonSortieComponent,
        ReceptionComponent,
        AddReparationModalComponent
  ],
  imports: [
    CommonModule,
    AtelierRoutingModule,
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
export class AtelierModule { }
