import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log('CartComponent initialized'); // Ajout d'un log pour vérifier l'initialisation
    this.loadCart();
}

loadCart(): void {
    this.cartService.fetchCart().subscribe({
        next: (data) => {
            console.log('Cart data fetched:', data); // Log des données récupérées
            this.cartItems = data.items;
            this.loading = false;
        },
        error: (err) => {
            console.error('Error fetching cart data:', err); // Log des erreurs
            this.error = 'Erreur lors du chargement du panier.';
            this.loading = false;
        },
    });
}
}
