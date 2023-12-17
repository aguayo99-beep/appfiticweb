import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  navigationAdmin: boolean = false;
  navBarResponsive: boolean = false;
  @Output() navigationClientsEmit = new EventEmitter<void>();
  @Output() navigationClassesEmit = new EventEmitter<void>();

  @Output() navigationReservationsEmit = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) { }





  ngOnInit() {
    const token = this.authService.getTokenFromCookie();
    console.log("Se esta recibiendo el token");
    if (token) {
      this.authService.checkIsAdmin(token).subscribe(
        (response) => {
          if (response.isAdmin) {
            this.navigationAdmin = true;
          } else {
            this.navigationAdmin = false;
          }
        },
        (error) => {
          console.error('Error verificando administrador:', error);
        }
      );
    }

  }

  navigationClients() {
    this.navigationClientsEmit.emit();
  }

  navigationClasses() {
    this.navigationClassesEmit.emit();
  }

  navigationReservations() {
    this.navigationReservationsEmit.emit();
  }



  logout(): void {
    this.authService.logout();

    setTimeout(() => {
      this.router.navigate(['/authentication']);
    }, 100);
  }


  toggleNavBarResponsive(): void {
    this.navBarResponsive = !this.navBarResponsive;
  }

}

