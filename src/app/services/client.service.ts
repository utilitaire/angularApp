import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private webReqService: WebRequestService) { }


  getUserVoitures() { return this.webReqService.get('voitures'); }
  getVoituresOut() { return this.webReqService.get('voituresout'); }
  getVoituresIn() { return this.webReqService.get('voituresin'); }

  depotVoiture(carId:any) { return this.webReqService.post('voitures/depot', { carId });}
  createVoiture(nom: string) { return this.webReqService.post('voitures', { nom });}

  updateList(id: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`lists/${id}`, { title });
  }

  // updateVoiture(listId: string, taskId: string, title: string) { return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, { title });}

  // deleteTask(listId: string, taskId: string) {
  //   return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  // }

  // deleteList(id: string) {
  //   return this.webReqService.delete(`lists/${id}`);
  // }

  getReparations(carId: string) { return this.webReqService.get(`voitures/${carId}/reparations`); }

  // createTask(title: string, listId: string) {
  //   // We want to send a web request to create a task
  //   return this.webReqService.post(`lists/${listId}/tasks`, { title });
  // }

  // complete(task: any) {
  //   return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
  //     completed: !task.completed
  //   });
  // }
}
