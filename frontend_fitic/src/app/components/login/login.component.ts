import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';
import { UserLogin } from '../../models//UserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userLogin: UserLogin = new UserLogin('', '');
  incorrectLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  login() {
    this.authService.login(this.userLogin).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso', response);

        if (response && response.token) {
          this.authService.setTokenInCookie(response.token);
          this.authService.checkIsAdmin(response.token).subscribe(
            (response) => {
              if (response.isAdmin) {
                this.router.navigate(['/admin/gestion-clientes']);
              }
            },
            (error) => {

              console.error('Error verificando administrador:', error);
            }
          );
        }
        else {
          this.incorrectLogin = true;
          console.log("incorrectLogin", this.incorrectLogin);
        }



      },
      (error) => {
        this.incorrectLogin = true;
        console.log("incorrectLogin", this.incorrectLogin);
        console.error('Error durante el inicio de sesión', error);
      }
    );
  }
}


