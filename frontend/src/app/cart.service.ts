import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDTO } from './DTOs/orderDTO';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor(
    private http: HttpClient
  ) {}

  getOrders(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>('/api/orders');
  }

  getPendingOrder(userId: number): Observable<OrderDTO> {
    const headers = new HttpHeaders({
      'accept': 'application/json'
    });
    return this.http.get<OrderDTO>(`api/users/${userId}/orders/pending`, { headers });
  }

  createOrderForUser(infos: {userId: number, status: 'pending'}): Observable<OrderDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'application/json'
    });
    return this.http.post<OrderDTO>('/api/orders', infos, { headers });
  }

  addToCart(watchId: number, orderId: number, quantity: number): Observable<void> {
    return this.http.post<void>(`/api/orders/${orderId}/add`, { watchId, quantity });
  }
  completeOrder(orderId: number, userId: number): Observable<OrderDTO> {
    return this.http.post<OrderDTO>(`/api/orders/${orderId}/complete/${userId}`, {});
  }
  
  // Method to delete an order
  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`/api/orders/${orderId}`);
  }
  
}
