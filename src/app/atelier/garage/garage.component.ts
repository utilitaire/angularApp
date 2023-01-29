import { AtelierService } from './../../services/atelier.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReparationModalComponent } from '../add-reparation-modal/add-reparation-modal.component';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})
export class GarageComponent implements OnInit {

  voitures: any[];
  reparations: any[];

  selectedvoitureId: string;

  constructor(
    private atelierService: AtelierService, 
    private route: ActivatedRoute, 
    private router: Router,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.carId) {
          this.selectedvoitureId = params.carId;
          this.atelierService.getReparations(params.carId).subscribe((reparations: any[]) => {
            this.reparations = reparations;
            console.log(this.reparations)
          })
        } else {
          this.reparations = undefined;
        }
        this.refreshGarageList();
      }
    )
  }

  refreshGarageList() {
    this.atelierService.getGaragelist().subscribe((voitures: any[]) => {
      this.voitures = voitures;
    })
  }

  refreshRepList() {
    this.atelierService.getReparations(this.selectedvoitureId).subscribe((reparations: any[]) => {
      this.reparations = reparations;
      console.log(this.reparations)
    })
  }

  // createReparation() {
  //   this.editReparation(undefined);
  // }

  createReparation() {
    this.editReparation(undefined);
  }

  editReparation(reparation: any) {
    const modalRef = this.modalService.open(AddReparationModalComponent, { size: 'xl' });
    modalRef.componentInstance.idVoiture = this.selectedvoitureId;
    modalRef.componentInstance.Rep = reparation;
    modalRef.result.then(() =>
    // this.router.navigate(['/atelier/garage', this.selectedvoitureId]),
    // location.reload(),
    this.refreshRepList(),
    () => { }
  );
  }


}
