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


@NgModule({
  declarations: [

  
    GarageComponent,
        BonSortieComponent,
        ReceptionComponent
  ],
  imports: [
    CommonModule,
    AtelierRoutingModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    DragDropModule
  ]
})
export class AtelierModule { }
