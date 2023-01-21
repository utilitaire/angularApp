import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let home = document.createElement('script');
    home.setAttribute('src', 'assets/login.js');
    console.log(home)
    document.body.appendChild(home);
  }
  

}
