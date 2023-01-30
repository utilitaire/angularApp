import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyCnameRecord } from 'dns';
import { Observable } from 'rxjs';
import { WebRequestService } from './web-request.service';

// const company : any = {
//   name: "m1p10mean-Onil-Fanilo",
//   address: "Antananarivo",
//   email: "m1p10mean-Onil-Fanilo@mail.com"
// }

// const client : any = {
//   name: "Client Name",
//   address: "Antananarivo",
//   email: "Client@mail.com"
// }

// const facture : any = {
//   _id: "idFacture",
//   _carId: "63ca9ea024d1fd4491e5cc1d",
//   total: "1000000"
// }

// const data : any ={
//   date: '29-01-2023',
//   company : {
//     name: "m1p10mean-Onil-Fanilo",
//     address: "Antananarivo",
//     email: "m1p10mean-Onil-Fanilo@mail.com"
//   },
//   client : {
//     name: "Client Name",
//     address: "Antananarivo",
//     email: "Client@mail.com"
//   },
//   facture : {
//     _id: "idFacture",
//     _carId: "63ca9ea024d1fd4491e5cc1d",
//     total: "1000000"
//   }
// }

let data :any;

@Injectable({
  providedIn: 'root'
})
export class AtelierService {
  readonly ROOT_URL;

  constructor(private webReqService: WebRequestService , private http:HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000';
  }

  getWaitlist() { return this.webReqService.get('atelier/reception/waitlist'); }
  getGaragelist() { return this.webReqService.get('atelier/Reception/garage'); }
  ToGarage(carId: string) { return this.webReqService.patch(`reception/togarage`, { carId }); }
  ValiderSortie(carId: string) { return this.webReqService.patch(`reception/Out`, { carId }); }
  getReparations(carId: string) { return this.webReqService.get(`voitures/${carId}/reparations`); }
  addreparation(reparation:any,carId:string) { return this.webReqService.post(`voitures/${carId}/reparations`, { reparation });}
  updateReparation(reparation: any) { return this.webReqService.patch(`reparations/${reparation._id}`, { reparation }); }

  getFactureData(idReparation: string) { return this.webReqService.get(`factureData/${idReparation}`); }
  getUserData(idUser: string) { return this.webReqService.get(`getUserinfo/${idUser}`); }
  // getReparation(idReparation: string) { return this.webReqService.get(`getReparationInfo/${idReparation}`); }

  // getFacture(idReparation:any) { 
  //   this.getFactureData(idReparation).subscribe((factureData: any) => {
  //     data = factureData;
  //     data.client = {
  //         name: factureData.client.nom + factureData.client.prenom,
  //         address: "Antananarivo",
  //         email: factureData.client.email
  //       }
  //     console.log(data)
  //     return this.webReqService.getPDF('finance/facture/pdf',{ data });
  //   });
  //   return this.webReqService.getPDF('finance/facture/pdf',{ data });
  // }

  getFacture(data:any) { return this.webReqService.getPDF('finance/facture/pdf',{ data }) }
}


