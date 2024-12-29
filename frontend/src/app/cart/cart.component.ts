import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { Module } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { UserSettingsService } from '../user-settings.service';

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
      width: 70, // Ajuster la largeur de la colonne
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

  constructor(
    private cartService: CartService,
    private userSettingsService: UserSettingsService
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
}
