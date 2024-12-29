import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDTO } from './DTOs/orderDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
    private baseUrl = '/api/orders';
  
    constructor(private http: HttpClient) {}
  
    createOrder(userId: number): Observable<OrderDTO> {
      return this.http.post<OrderDTO>(`${this.baseUrl}`, { userId });
    }
  
    addWatchToOrder(orderId: number, watchId: number, quantity: number): Observable<void> {
      return this.http.post<void>(`${this.baseUrl}/${orderId}/items`, { watchId, quantity });
    }

    getOrderById(orderId: number): Observable<OrderDTO> {
        return this.http.get<OrderDTO>(`${this.baseUrl}/${orderId}`);
      }
    
      // Récupérer les items d'une commande
    getOrderItems(orderId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/${orderId}/items`);
      }
  }