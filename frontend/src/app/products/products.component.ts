import { Component } from '@angular/core';

@Component({
  selector: 'app-product-page',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductPageComponent {
  // Liste des produits avec des liens d'images Internet
  watches = [
    {
      id: 1,
      name: 'Montre Élégante',
      price: 120,
      imageUrl: 'https://guildedesorfevres.fr/montre-tissot-en-acier-acier-1020109-3059.html',
    },
    {
      id: 2,
      name: 'Montre Sportive',
      price: 90,
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      name: 'Montre Luxe',
      price: 250,
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    // Ajoutez plus de produits ici
  ];

  // Méthode pour afficher les détails d'un produit
  viewDetails(product: any): void {
    console.log('Voir les détails du produit :', product);
  }
}