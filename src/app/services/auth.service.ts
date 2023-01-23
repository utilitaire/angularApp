import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { User } from 'app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser : any = {
    _id: "",
    email: "",
    nom: "",
    prenom: "",
    type: "",
    __v: 7
  };
  private unsubscribe: Subscription[] = []; 
  currentUserSubject: BehaviorSubject<any>;

  get currentUserValue(): User {
    // return this.currentUserSubject.asObservable();
    return this.currentUserSubject.value;
  }

  constructor(
    private webService: WebRequestService, 
    private router: Router, 
    private http: HttpClient
  ) { 
    this.currentUserSubject = new BehaviorSubject<any>(undefined); 
    const subscr = this.getUserinfo().subscribe();
    this.unsubscribe.push(subscr);
  }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'),res.body);
        console.log("LOGGED IN!");
        this.currentUser = res.body;
        this.currentUserSubject = new BehaviorSubject<User>(this.currentUser);
        console.log(this.currentUserSubject)
      })
    )
  }

  getUserinfo(): Observable<User> {
    const auth = this.getAccessToken();
    if (!auth) {
      return of(undefined);
    }
    return this.http.get(`${this.webService.ROOT_URL}/userInfo`, {
            headers: {
              'x-refresh-token': this.getRefreshToken(),
              '_id': this.getUserId(),
              'x-access-token' : this.getAccessToken()
            },
            observe: 'response'
          }).pipe(
      map((user: any) => {
        if (user) {
          this.currentUserSubject = new BehaviorSubject<User>(user.body);
        } else {
          this.logout();
        }
        return user.body;
      }),
    );
  }

  signupClient(email: string, nom: string, prenom: string, password: string) {
    return this.webService.signupClient(email, nom, prenom, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'),res.body.value);
        console.log("Successfully signed up and now logged in!");
        this.currentUser = res.body;
        this.currentUserSubject = new BehaviorSubject<User>(this.currentUser);
        console.log(this.currentUserSubject)
      })
    )
  }
  
  logout() {
    console.log("log out ")
    this.removeSession();
    this.router.navigate(['/client/login']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }
  
  private setSession(userId: string, accessToken: string, refreshToken: string,userinfo: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('user-info', userinfo);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('user-info');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken() {
    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    )
  }
}