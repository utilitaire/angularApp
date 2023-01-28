import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {

  constructor(private webReqService: WebRequestService) { }

  getWaitlist() { return this.webReqService.get('atelier/reception/waitlist'); }
  getGaragelist() { return this.webReqService.get('atelier/Reception/garage'); }
  ToGarage(carId: string) { return this.webReqService.patch(`reception/togarage`, { carId }); }
}
