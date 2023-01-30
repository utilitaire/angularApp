import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private webReqService: WebRequestService) { }

  getFactureNonPaye() { return this.webReqService.get('nonpaye'); }
  ValiderPaiement(FactureId: string) { return this.webReqService.patch(`pay`, { FactureId }); }
}
