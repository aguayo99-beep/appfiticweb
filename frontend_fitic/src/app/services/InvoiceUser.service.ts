// invoice-user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceUser } from '../models/InvoiceUser';
import { AuthService } from '../services/AuthService';

@Injectable({
  providedIn: 'root'
})
export class InvoiceUserService {
  private baseUrl = 'http://localhost:3000/api/invoices';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getTokenFromCookie();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`
    });
  }

  addInvoice(invoice: InvoiceUser): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/add`, invoice, { headers });
  }

  getAllInvoices(): Observable<InvoiceUser[]> {
    const headers = this.getHeaders();
    return this.http.get<InvoiceUser[]>(`${this.baseUrl}/getAllInvoices`, { headers });
  }

  payInvoice(invoiceId: string): Observable<any> {
    const headers = this.getHeaders();
    const body = { invoiceId };
    return this.http.put<any>(`${this.baseUrl}/pay`, body, { headers });
  }

  getInvoiceById(invoiceId: string): Observable<InvoiceUser> {
    const headers = this.getHeaders();
    const params = { invoiceId };
    return this.http.get<InvoiceUser>(`${this.baseUrl}/detailsInvoice`, { headers, params });
  }

 // invoice-user.service.ts
getUserInvoices(userId: string): Observable<any> {
  const headers = this.getHeaders();
  const params = { userId }; 

  return this.http.get<any>(`${this.baseUrl}/getUserInvoices`, { headers, params });
}

  
}
