import { GymClass } from './../models/GymClass';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/AuthService';


@Injectable({
  providedIn: 'root'
})
export class GymClassService {
  private baseUrl = 'http://localhost:3000/api/gymclass';

  constructor(private http: HttpClient,private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getTokenFromCookie();

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`
    });
  }

  getAllGymClasses(): Observable<GymClass[]> {
    const headers = this.getHeaders();
    return this.http.get<GymClass[]>(`${this.baseUrl}/gymClasses`, { headers });
  }

  addGymClass(gymClass: GymClass): Observable<any> {
        const headers = this.getHeaders();
        return this.http.post<any>(`${this.baseUrl}/add`, gymClass, { headers });
  }

  getGymClassById(userId: string): Observable<GymClass[]> {
    const headers = this.getHeaders();
    const params = new HttpParams().append('userId', userId);
    console.log("id", userId);
    return this.http.get<GymClass[]>(`${this.baseUrl}/gymclass`, { headers, params });
  }

 

  updateGymClass(gymClass: GymClass): Observable<GymClass> {
    const headers = this.getHeaders();
    return this.http.put<GymClass>(`${this.baseUrl}/gymClasses`, gymClass, { headers });
  }

  deleteGymClass(gymClassId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.baseUrl}/gymClasses`, { headers, body: { _id: gymClassId } });
}
 
}
