import { UserLogin } from '../models/UserLogin';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth'; 

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(userLogin: UserLogin): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, userLogin);
  }

  checkEmailExists(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkEmailExists`, { email });
  }

  checkUsernameExists(username: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkUsernameExists`, { username });
  }

checkIsAdmin(token: string): Observable<any> {
  const headers = { Authorization: `${token}` };
  return this.http.get(`${this.baseUrl}/checkIsAdmin`, { headers });
}

checkToken(token: string): Observable<any> {
  const headers = { Authorization: `${token}` };
  return this.http.get(`${this.baseUrl}/checkToken`, { headers });
}
logout(): void {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}


setTokenInCookie(token: string): void {
  const currentDate = new Date();

  const expirationTime = new Date(currentDate.getTime() + 5 * 60 * 60 * 1000);

  const expires = expirationTime.toUTCString();
  console.log("Guardando token");
  document.cookie = `token=${token}; expires=${expires}; path=/`;
}


  getTokenFromCookie(): string  {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === 'token') {
        return cookieValue;
      }
    }
    return "";
  }

}

