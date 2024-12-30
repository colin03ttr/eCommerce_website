import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { Module } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { UserSettingsService } from '../user-settings.service';
import { userService } from '../user.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  rowData: any[] = [];
  columnDefs = [
    {
      headerName: 'Image',
      field: 'watch.imageurl',
      cellRenderer: (params: { value: string }) => {
        return `<img src="${params.value}" alt="Watch Image" style="width: 50px; height: 50px; border-radius: 5px;" />`;
      },
      width: 70,
    },
    { field: 'watch.name', headerName: 'Product Name', sortable: true, filter: true },
    { field: 'watch.price', headerName: 'Price', sortable: true, filter: true },
    { field: 'quantity', headerName: 'Quantity', sortable: true, filter: true },
    {
      headerName: 'Total',
      valueGetter: (params: { data: { quantity: number; watch: { price: number } } }) =>
        params.data.quantity * params.data.watch.price,
    },
  ];
  modules: Module[] = [ClientSideRowModelModule];
  errorMessage: string | null = null;
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private userSettingsService: UserSettingsService,
    private Uservice: userService,
    
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const loggedUser = await this.userSettingsService.getLoggedUser();

      if (!loggedUser) {
        this.errorMessage = 'Please log in to view your cart.';
        return;
      }

      this.cartService.getPendingOrder(loggedUser.id).subscribe({
        next: (order) => {
          if (order) {
            this.rowData = order.items || [];
            this.errorMessage = null;
            this.calculateTotalPrice();
          } else {
            this.errorMessage = 'No pending orders found.';
          }
        },
        error: (err) => {
          console.error('Error fetching orders:', err);
          this.errorMessage = 'Failed to load orders. Please try again later.';
        },
      });
    } catch (err) {
      console.error('Error fetching logged user:', err);
      this.errorMessage = 'An error occurred. Please try again later.';
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.rowData.reduce(
      (sum, item) => sum + item.quantity * item.watch.price,
      0
    );
  }

  async placeOrder(): Promise<void> {
    try {
      const loggedUser = await this.userSettingsService.getLoggedUser();
  
      if (!loggedUser) {
        this.errorMessage = 'Please log in to place your order.';
        return;
      }
  
      // Récupérer la commande en attente
      this.cartService.getPendingOrder(loggedUser.id).subscribe({
        next: (order) => {
          
            const orderId = order.id;
            console.log("L'id utilisé est :", orderId);
  
            // Compléter la commande
            this.cartService.completeOrder(orderId, loggedUser.id).subscribe({
              next: () => {
                console.log("on est au bon endroit");
                loggedUser.solde -= this.totalPrice; // Mise à jour locale du solde
                 // Mise à jour backend
                alert('Order successfully placed!');
                this.rowData = []; // Réinitialiser les items affichés
                this.totalPrice = 0; // Réinitialiser le total
              },
              error: (err) => {
                console.error('Error completing order:', err);
                alert('Insuffisant balance');
              },
            });
          
        },
        error: (err) => {
          console.error('Error fetching pending order:', err);
          this.errorMessage = 'Failed to fetch pending order.';
        },
      });
    } catch (err) {
      console.error('Error placing order:', err);
      this.errorMessage = 'An error occurred while placing the order.';
    }
  }
  
}
