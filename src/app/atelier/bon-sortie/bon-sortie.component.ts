import { AtelierService } from './../../services/atelier.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bon-sortie',
  templateUrl: './bon-sortie.component.html',
  styleUrls: ['./bon-sortie.component.scss']
})
export class BonSortieComponent implements OnInit {

  voitures: any[];
  
  constructor(
    private atelierService: AtelierService, 
    ) { }

  ngOnInit(): void {
    this.refreshGarageList();
  }

  refreshGarageList() {
    this.atelierService.getGaragelist().subscribe((voitures: any[]) => {
      this.voitures = voitures;
    })
  }

  onValiderSortieClick(id:any) {
    this.atelierService.ValiderSortie(id).subscribe((reception: any) => {
      this.refreshGarageList();
    });
    
  }

}
