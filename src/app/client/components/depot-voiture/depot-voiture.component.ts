import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ClientService } from 'app/services/client.service';

@Component({
  selector: 'app-depot-voiture',
  templateUrl: './depot-voiture.component.html',
  styleUrls: ['./depot-voiture.component.scss']
})
export class DepotVoitureComponent implements OnInit {

  voitures: any[];
  garage: any[];

  constructor (private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getVoituresOut().subscribe((voitures: any[]) => {
      this.voitures = voitures;
    })
    this.clientService.getVoituresIn().subscribe((voitures: any[]) => {
      this.garage = voitures;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let dragedCar: any;
      dragedCar = event.container.data[event.currentIndex];
      console.log(dragedCar);
      // console.log(event.container.data[event.currentIndex]);
      this.clientService.depotVoiture(dragedCar._id).subscribe((reception: any) => {

      })
      
    }
  }

}
