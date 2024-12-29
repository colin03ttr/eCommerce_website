import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderService } from './order.service';
import { OrderDTO } from './DTOs/orderDTO';
import { UserSettingsService } from './user-settings.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = '/api/cart';
  private currentOrderId: number | null = null;

  constructor(
    private http: HttpClient,
    private orderService: OrderService,
    private userSettingsService: UserSettingsService
  ) {}

  getCartItems(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(`${this.baseUrl}`);
  }

  getPendingOrder(userId: number): Observable<OrderDTO | null> {
    // Requête au backend pour récupérer une commande avec le statut "pending"
    return this.http.get<OrderDTO | null>(`/api/orders/user/${userId}/pending`);
  }

  createOrder(): Observable<OrderDTO> {
    return new Observable((observer) => {
      this.userSettingsService.getLoggedUser().then((user) => {
        if (!user || !user.id) {
          observer.error('Utilisateur non connecté. Impossible de créer une commande.');
          return;
        }
  
        const newOrder = {
          userId: user.id, // Utilisateur actuellement connecté
          status: 'pending', // Statut par défaut
        };
  
        this.http.post<OrderDTO>('/api/orders', newOrder).subscribe({
          next: (order) => {
            observer.next(order);
            observer.complete();
          },
          error: (err) => {
            console.error('Erreur lors de la création de la commande :', err);
            observer.error('Impossible de créer une commande.');
          },
        });
      }).catch((err) => {
        console.error('Erreur lors de la récupération de l\'utilisateur connecté :', err);
        observer.error('Impossible de récupérer l\'utilisateur connecté.');
      });
    });
  }
  

  addToCart(watchId: number, orderId: number, quantity: number): Observable<void> {
    return this.http.post<void>(`/api/orders/${orderId}/add`, { watchId, quantity });
  }

  private addWatchToOrder(watchId: number, orderId: number, quantity: number): Observable<void> {
    return this.http.post<void>(`/api/orders/${orderId}/add`, { watchId, quantity });
  }

  
  getOrderItems(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${orderId}/items`);
  }
}
