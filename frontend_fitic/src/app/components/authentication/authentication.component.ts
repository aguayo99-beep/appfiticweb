import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  showLogin: boolean = true;
  showRegister: boolean = false;

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
   
  }


  showLoginForm() {
    this.showLogin = true;
    this.showRegister = false;
  }

  showRegisterForm() {
    this.showLogin = false;
    this.showRegister = true;
  }
  
}
