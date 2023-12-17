// panel-administrador.component.ts
import { Component, OnInit } from '@angular/core';


import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {
  isAdmin: boolean = false;
  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit() {
     const token = this.authService.getTokenFromCookie();
     console.log("Se esta recibiendo el token");
     if (token) {
       this.authService.checkIsAdmin(token).subscribe(
         (response) => {
           if (response.isAdmin) {
             this.isAdmin = true;
           } else {
            this.isAdmin = false;
           }
         },
         (error) => {
           console.error('Error verificando administrador:', error);
         }
       );
     }
  }

 

  
}
