import { Component, OnInit } from '@angular/core';
import { OrderDTO } from '../DTOs/orderDTO';
import { UserSettingsService } from '../user-settings.service';
import { CartService } from '../cart.service';
import { watchService } from '../watch.service';
import { CommonModule } from '@angular/common';
import { WatchDTO } from '../DTOs/watchDTO';

@Component({
  selector: 'app-myorders',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders: OrderDTO[] = [];
  errorMessage: string | null = null;

  constructor(
    private userSettingsService: UserSettingsService,
    private cartService: CartService,
    private watchService: watchService,
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const loggedUser = await this.userSettingsService.getLoggedUser();
  
      if (!loggedUser) {
        this.errorMessage = 'Please log in to view your orders.';
        return;
      }
  
      // Charger toutes les commandes
      this.cartService.getUsersOrders(loggedUser.id).subscribe({
        next: async (orders) => {
          this.orders = orders;
  
          // Charger les montres pour tous les items des commandes
          for (const order of this.orders) {
            for (const item of order.items) {
              item.watch = await this.loadWatch(item.watchId); // Associer les montres
            }
          }
  
          this.errorMessage = null;
        },
        error: (err) => {
          console.error('Error fetching user orders:', err);
          this.errorMessage = 'Failed to fetch your orders.';
        },
      });
    } catch (err) {
      console.error('Error fetching user information:', err);
      this.errorMessage = 'An error occurred while fetching user information.';
    }
  }
  
  // Charger une montre par son ID
  async loadWatch(watchId: number): Promise<WatchDTO | null> {
    return new Promise((resolve) => {
      this.watchService.getWatchById(watchId).subscribe({
        next: (data) => resolve(data),
        error: (err) => {
          console.error(`Error fetching watch with ID ${watchId}:`, err);
          resolve(null); // Retourne null si une erreur survient
        },
      });
    });
  }
  

  calculateTotal(order: OrderDTO): number {
    return order.items.reduce((sum, item) => {
      if (item.watch && item.watch.price) {
        return sum + item.quantity * item.watch.price;
      }
      return sum; // Ignore les items sans prix
    }, 0);
  }
  
  GetWatchById(watchId: number): WatchDTO | undefined {
    let watch: WatchDTO | undefined;
  
    this.watchService.getWatchById(watchId).subscribe({
      next: (data) => {
        watch = data;
      },
      error: (err) => {
        console.error(`Error fetching watch with ID ${watchId}:`, err);
      },
    });
  
    return watch;
  }
  
  
  

  
}
