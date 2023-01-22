import { ClientService } from './../../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  voitures: any[];
  reparations: any[];

  selectedvoitureId: string;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.carId) {
          this.selectedvoitureId = params.carId;
          this.clientService.getReparations(params.carId).subscribe((reparations: any[]) => {
            this.reparations = reparations;
            console.log(this.reparations)
          })
        } else {
          this.reparations = undefined;
        }
      }
    )

    this.clientService.getUserVoitures().subscribe((voitures: any[]) => {
      this.voitures = voitures;
    })
  }

}
