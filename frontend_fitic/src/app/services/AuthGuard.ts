import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.checkAuthentication();
  }

  private checkAuthentication(): boolean {
    const token = this.authService.getTokenFromCookie();

    if (!token) {
      this.router.navigate(['/authentication']);
      return false;
    }

    return true;
  }
}
