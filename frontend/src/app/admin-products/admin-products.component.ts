import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { WatchDTO } from '../DTOs/watchDTO';
import { CommonModule, NgFor,  } from '@angular/common';
import { watchService } from '../watch.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  private readonly watchservice = inject(watchService);
  isFormVisible = false;
  newWatch: WatchDTO = {
    id: -1,
    name: "",
    description: "",
    price: 0,
    imageurl: "",
    brand: ""
};
  watchesDTO: WatchDTO[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.watchservice.getWatchesDTO().subscribe({
      next: data => {
        console.log('Finished loading watches, saving to component field');
        this.watchesDTO = data;
        console.log(this.watchesDTO);
      },
      error: err => {
        console.log('Failed to load watches from Http server', err);
      }
    });
  }

  // method to sort the list differently
  sortProducts(event: Event): void {
    const order = (event.target as HTMLSelectElement).value;
    switch(order) {
      case 'asc':
        //use watch.service to sort the list of products by price with the parameter 'sorting' set to 'price_asc'
        this.watchservice.getWatchesDTOBySorting('price_asc').subscribe({
          next: data => {
            console.log('Finished loading watches, saving to component field');
            this.watchesDTO = data;
            console.log(this.watchesDTO);
          },
          error: err => {
            console.log('Failed to load watches from Http server', err);
          }
        });
        break;
      case 'desc':
        //use watch.service to sort the list of products by price with the parameter 'sorting' set to 'price_desc'
        this.watchservice.getWatchesDTOBySorting('price_desc').subscribe({
          next: data => {
            console.log('Finished loading watches, saving to component field');
            this.watchesDTO = data;
            console.log(this.watchesDTO);
          },
          error: err => {
            console.log('Failed to load watches from Http server', err);
          }
        });
        break;
      default:
        console.log('no specific order');
        break;
    }
  }

  // Method to toggle the form visibility
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  // Method to add a new product
  addProduct(): void {
    if(this.newWatch) {
      // Create a new product and use a post request to the backend to add it to the database
      this.watchservice.addWatch(this.newWatch).subscribe({
        next: () => {
          console.log('Product added successfully');
          window.location.reload();
        },
        error: err => {
          console.log('Failed to add product', err);
        }
      });
    }else {
      console.log('Product is null');
    }
  }

  // Method to edit a product
  editProduct(watch_updated: WatchDTO): void {
    // Use a put request to the backend to update the product in the database
    this.watchservice.updateWatch(watch_updated).subscribe({
      next: () => {
        console.log('Product updated successfully');
        window.location.reload();
      },
      error: err => {
        console.log('Failed to update product', err);
      }
    });
    
  }
  // Method to ask confirmation to delete a product
  confirmDelete(productId: number): void {
    const confirmation = confirm('Are you sure you want to delete this product?');
    if (confirmation) {
      this.deleteProduct(productId);
    }
  }
  // Method to delete a product
  deleteProduct(productId: number): void {
    this.watchservice.deleteWatch(productId).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        window.location.reload();
      },
      error: err => {
        console.log('Failed to delete product', err);
      }
    });
  }
}
