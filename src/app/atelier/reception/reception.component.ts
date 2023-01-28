import { AtelierService } from './../../services/atelier.service';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

  waitlist: any[];
  garage: any[];

  constructor(private atelierService: AtelierService) { }

  ngOnInit(): void {
    this.atelierService.getWaitlist().subscribe((voitures: any[]) => {
      this.waitlist = voitures;
      console.log(this.waitlist)
    })
    this.atelierService.getGaragelist().subscribe((voitures: any[]) => {
      this.garage = voitures;
      console.log(this.garage)
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
      this.atelierService.ToGarage(dragedCar._id).subscribe((reception: any) => {

      })
    }
  }

}
