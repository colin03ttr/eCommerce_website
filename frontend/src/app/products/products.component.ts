import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { WatchDTO } from '../DTOs/watchDTO';
import { CommonModule, NgFor } from '@angular/common';
import { watchService } from '../watch.service';
import { Router,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, NgFor, RouterOutlet],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductPageComponent implements OnInit {
  private readonly watchservice = inject(watchService);
  // Liste des produits avec des liens d'images Internet
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

  // Méthode pour afficher les détails d'un produit
  viewDetails(productid: number): void {
    console.log('Voir les détails du produit :', productid);
    this.router.navigate([`/detailed-product/${productid}`]);
  }
}