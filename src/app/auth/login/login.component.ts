import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router ) { 
    // this.authService.getUserinfo();
    // console.log(this.authService.currentUserValue)
    if (this.authService.currentUserValue) {
          this.router.navigate(['/client/carlist']);
        }
  }

  ngOnInit(): void {
    let home = document.createElement('script');
    home.setAttribute('src', 'assets/login.js');
    document.body.appendChild(home);
  }

  onLoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        console.log(res.body.type)
        if (res.body.type == 'client') { this.router.navigate(['/client/carlist']); }
        else if (res.body.type == 'atelier') { this.router.navigate(['/atelier/garage']); }
        else if (res.body.type == 'finance') { this.router.navigate(['/finance/paiement']); }
      }
    });
  }

  onRegisterButtonClicked(email: string, nom: string, prenom: string, password: string, Validpassword: string) {
    // signupClient(email: string, nom: string, prenom: string, password: string)
    this.authService.signupClient(email, nom, prenom, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        // we have logged in successfully
        this.router.navigate(['/client/carlist']);
      }
    });
  }

  onUserInfoClick() { 
    // this.authService.getUserinfo();
    console.log(this.authService.currentUserValue)
  }


}
