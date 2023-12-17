import { inject } from '@angular/core';
import { AuthService } from './../../services/AuthService';
import { CanActivateFn, Router } from '@angular/router';


/**
 * Function that determines whether a user is authorized to access a certain route.
 * This guard is specifically designed for admin users.
 * 
 * @param route - The route being activated.
 * @param state - The current router state.
 * @returns A boolean indicating whether the user is authorized to access the route.
 */
export const authGuardAdmin: CanActivateFn = (route, state) => {
  const authService =  inject(AuthService);
  const router = inject(Router);

  const token = authService.getTokenFromCookie();
  
  authService.checkToken(token).subscribe(
    (response) => {
     if (!response.isCorrect) {
         router.navigate(['/authentication']);
      }
      else{
        router.navigate(['/admin']);
      }
    },
    (error) => {
      console.error('Error verificando la validez del token:', error);
    }
  );
  
  return true;

  
};


