import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { WatchDTO } from '../DTOs/watchDTO';
import { watchService } from '../watch.service';
import { userService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { OrderDTO } from '../DTOs/orderDTO';
import { UserDTO } from '../DTOs/userDTO';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly watchService = inject(watchService);
  private readonly userService = inject(userService);
  ordersDTO: OrderDTO[] = [];
  isFormVisible = false;
  errorMessage: string | null = null;
  newOrder: { userId: number; status: 'pending' } = {
    userId: 0,
    status: 'pending'
  };

  ngOnInit(): void {
    this.loadOrders();
  }

  // Method to load all orders
  loadOrders(): void {
    // Assuming an endpoint exists to fetch all orders (update service if necessary)
    this.cartService.getOrders().subscribe({
      next: async (orders) => {
        this.ordersDTO = orders;

        // Charger les montres pour tous les items des commandes
        for (const order of this.ordersDTO) {
          order.user = await this.loadUser(order.userId); // Associer user
          for (const item of order.items) {
            item.watch = await this.loadWatch(item.watchId); // Associer les montres
          }
        }

        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Error fetching user orders or user:', err);
        this.errorMessage = 'Failed to fetch your orders or user.';
      },
    });
  }

  async loadUser(userId: number): Promise<UserDTO | null> {
    return new Promise((resolve) => {
      this.userService.getUserById(userId).subscribe({
        next: (data) => resolve(data),
        error: (err) => {
          console.error(`Error fetching user with ID ${userId}:`, err);
          resolve(null); // Retourne null si une erreur survient
        },
      })
    });
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


  // Method to toggle the form visibility
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  // Method to add a new order
  addOrder(): void {
    if (this.newOrder.userId) {
      this.cartService.createOrderForUser(this.newOrder).subscribe({
        next: () => {
          console.log('Order added successfully');
          this.loadOrders();
          this.isFormVisible = false;
          this.newOrder = { userId: 0, status: 'pending' };
        },
        error: (err) => {
          console.error('Failed to add order', err);
        }
      });
    } else {
      console.warn('User ID is required');
    }
  }

  // Method to complete an order
  completeOrder(orderId: number, userId: number): void {
    this.cartService.completeOrder(orderId, userId).subscribe({
      next: () => {
        console.log('Order completed successfully');
        this.loadOrders();
      },
      error: (err) => {
        console.error('Failed to complete order', err);
      }
    });
  }

  // Method to confirm deletion of an order
  confirmDelete(orderId: number): void {
    const confirmation = confirm('Are you sure you want to delete this order?');
    if (confirmation) {
      this.deleteOrder(orderId);
    }
  }

  // Method to delete an order
  deleteOrder(orderId: number): void {
    // Assuming a delete endpoint exists (update service if necessary)
    this.cartService.deleteOrder(orderId).subscribe({
      next: () => {
        console.log('Order deleted successfully');
        this.loadOrders();
      },
      error: (err) => {
        console.error('Failed to delete order', err);
      }
    });
  }

  // Method to sort orders
  sortOrders(event: Event): void {
    const sortOption = (event.target as HTMLSelectElement).value;
    if (sortOption === 'date_asc') {
      this.ordersDTO.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
    } else if (sortOption === 'date_desc') {
      this.ordersDTO.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }
  }
}
