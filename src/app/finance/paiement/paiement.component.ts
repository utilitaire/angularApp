import { FinanceService } from 'app/services/finance.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from 'app/client/client-layout/client-layout.component';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

  factures: any[];
  
  constructor(
    private financeService : FinanceService
    ) { }

  ngOnInit(): void {
    this.refreshfactureList();
  }

  refreshfactureList() {
    this.financeService.getFactureNonPaye().subscribe((factures: any[]) => {
      this.factures = factures;
    })
  }

  onValiderPaiementClick(idFacture:any) {
    console.log(idFacture)
    this.financeService.ValiderPaiement(idFacture).subscribe((reception: any) => {
      this.refreshfactureList();
    });
    
  }

}
