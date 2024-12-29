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
    return this.http.get<OrderDTO | null>(`/api/orders/pending/${userId}`);
  }

  createOrder(userId: number): Observable<OrderDTO> {
    return this.http.post<OrderDTO>('/api/orders', { userId });
  }

  addToCart(watchId: number, orderId: number, quantity: number): Observable<void> {
    return this.http.post<void>(`/api/orders/${orderId}/add`, { watchId, quantity });
  }

  private addWatchToOrder(watchId: number, orderId: number, quantity: number): Observable<void> {
    return this.http.post<void>(`/api/orders/${orderId}/add`, { watchId, quantity });
  }

  handleAddToCart(watchId: number, quantity: number): Observable<void> {
    return new Observable((observer) => {
      this.userSettingsService.getLoggedUser().then((user) => {
        if (!user || !user.id) {
          observer.error('Utilisateur non connecté. Veuillez vous connecter.');
          return;
        }

        const userId = user.id;

        this.getPendingOrder(userId).subscribe({
          next: (order) => {
            if (order) {
              // Commande "pending" trouvée
              this.addToCart(watchId, order.id, quantity).subscribe({
                next: () => {
                  observer.next();
                  observer.complete();
                },
                error: (err) => {
                  observer.error(err);
                },
              });
            } else {
              // Pas de commande "pending", on en crée une
              this.createOrder(userId).subscribe({
                next: (newOrder) => {
                  this.addToCart(watchId, newOrder.id, quantity).subscribe({
                    next: () => {
                      observer.next();
                      observer.complete();
                    },
                    error: (err) => {
                      observer.error(err);
                    },
                  });
                },
                error: (err) => {
                  observer.error(err);
                },
              });
            }
          },
          error: (err) => {
            observer.error(err);
          },
        });
      }).catch((err) => {
        observer.error("Erreur lors de la récupération de l'utilisateur connecté : " + err);
      });
    });
  }
  getOrderItems(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${orderId}/items`);
  }
}
