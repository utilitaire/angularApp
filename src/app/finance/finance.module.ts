import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { PaiementComponent } from './paiement/paiement.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    PaiementComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbModule,
    NgxSliderModule
  ]
})
export class FinanceModule { }
