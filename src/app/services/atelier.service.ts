import { Injectable } from '@angular/core';
import { AnyCnameRecord } from 'dns';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {

  constructor(private webReqService: WebRequestService) { }

  getWaitlist() { return this.webReqService.get('atelier/reception/waitlist'); }
  getGaragelist() { return this.webReqService.get('atelier/Reception/garage'); }
  ToGarage(carId: string) { return this.webReqService.patch(`reception/togarage`, { carId }); }
  getReparations(carId: string) { return this.webReqService.get(`voitures/${carId}/reparations`); }
  addreparation(reparation:any,carId:string) { return this.webReqService.post(`voitures/${carId}/reparations`, { reparation });}
  updateReparation(reparation: any) { return this.webReqService.patch(`reparations/${reparation._id}`, { reparation }); }
}
