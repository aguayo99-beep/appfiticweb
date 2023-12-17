import { GymClass } from './../models/GymClass';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/AuthService';
import { GymClassReservation } from '../models/ClassReservation';


@Injectable({
  providedIn: 'root'
})
export class GymClassReservationService {
  private baseUrl = 'http://localhost:3000/api/gymclassreservation';

  constructor(private http: HttpClient,private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getTokenFromCookie();

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`
    });
  }

  getAllGymClasses(): Observable<GymClassReservation[]> {
    const headers = this.getHeaders();
    return this.http.get<GymClassReservation[]>(`${this.baseUrl}/all`, { headers });
  }

  getGymClassById(userId: string): Observable<GymClassReservation[]> {
    const headers = this.getHeaders();
    const params = new HttpParams().append('userId', userId);
    console.log("id", userId);
    return this.http.get<GymClassReservation[]>(`${this.baseUrl}/user`, { headers, params });
  }
  
  addGymClass(classId: string, userId: string): Observable<any> {
    const headers = this.getHeaders();
    const gymClassReservation = {
      userId: userId,
      classId: classId
     
    };

    console.log("iduser" ,userId);
    console.log("idclass" ,classId);
    return this.http.post<any>(`${this.baseUrl}/add`, gymClassReservation, { headers });
  }
 

  updateGymClass(gymClassReservation: GymClassReservation): Observable<GymClassReservation> {
    const headers = this.getHeaders();
    return this.http.put<GymClassReservation>(`${this.baseUrl}/update`, gymClassReservation, { headers });
  }

  deleteGymClass(gymClassId: string): Observable<GymClassReservation> {
    const headers = this.getHeaders();
    return this.http.delete<GymClassReservation>(`${this.baseUrl}/delete`, { headers, body: { _id: gymClassId } });
}
 
}