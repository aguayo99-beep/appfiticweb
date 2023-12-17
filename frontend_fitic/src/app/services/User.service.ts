// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AuthService } from '../services/AuthService';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient,private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getTokenFromCookie();

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`
    });
  }

  getAllUsers(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${this.baseUrl}/getUsers`, { headers });
  }

  searchUsers(searchTerm: string): Observable<User[]> {
    const headers = this.getHeaders();
    const body = { searchTerm }; 
  
    return this.http.post<User[]>(`${this.baseUrl}/getUsersByKeyWords`, body, { headers });
  }
  

  getUserProfile(): Observable<User> {
    const headers = this.getHeaders();
    return this.http.get<User>(`${this.baseUrl}/profile`, { headers });
  }

  checkAllInvoicesPaid(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/checkAllInvoicesPaid`, { headers });
  }

  isPasswordCorrect(password: string): Observable<any[]> {
    const headers = this.getHeaders();
    const params = new HttpParams().append('password', password);
    return this.http.get<any[]>(`${this.baseUrl}/isCorrectpassword`, { headers, params });
  }
  



 
  updateUserProfile(user: User): Observable<User> {
    const headers = this.getHeaders();
    return this.http.put<User>(`${this.baseUrl}/profile`, user, { headers });
  }

  changePassword(password: string): Observable<User> {
    const headers = this.getHeaders();
    return this.http.post<User>(`${this.baseUrl}/change-password`, { password }, { headers });
  }

  deleteAccount(userName: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.baseUrl}/delete-account/${userName}`, { headers });
  }
  

  logout(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/logout`, {}, { headers });
  }
}
