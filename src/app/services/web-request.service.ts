import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  getPDF(uri: string, payload: any) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload, {responseType: 'blob'});
  }

  post(uri: string, payload: any) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: any) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }

  signupClient(email: string, nom: string, prenom: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/clients/sign`, {
      email,
      nom,
      prenom,
      password
    }, {
        observe: 'response'
      });
  }

//   {
//     "email": "Newonil@mail.com",
//     "nom": "Mamirazana",
//     "prenom": "Isis O'nil",
//     "password":"123456789"
// }

}
