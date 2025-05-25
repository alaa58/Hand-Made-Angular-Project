
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddOrderDTO, OrderItemDTO } from '../interfaces/order'

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://handmade.runasp.net/api/Order'; 

  constructor(private http: HttpClient) {}

  createOrder(orderData: AddOrderDTO): Observable<any> {
    const token = localStorage.getItem('token');  

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || ''}`
    });

    return this.http.post(`${this.apiUrl}/CreateOrder`, orderData, { headers });
  }
}

