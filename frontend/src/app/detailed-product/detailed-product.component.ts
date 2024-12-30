import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WatchDTO } from '../DTOs/watchDTO';
import { watchService } from '../watch.service';
import { CartService } from '../cart.service';
import { UserSettingsService } from '../user-settings.service';
import { NgIf } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { OrderDTO } from '../DTOs/orderDTO';

@Component({
  selector: 'app-detailed-product',
  standalone: true,
  imports: [NgIf,AgGridModule,FormsModule],
  templateUrl: './detailed-product.component.html',
  styleUrls: ['./detailed-product.component.css']
})
export class DetailedProductComponent implements OnInit {
  watch!: WatchDTO;
  user: { id: number; name: string; email: string } | null = null;
  errorMessage: string | null = null;
  quantity: number = 1;

  columnDefs: ColDef<WatchDTO>[] = [
    { field: 'name', headerName: 'Nom' },
    { field: 'brand', headerName: 'Marque' },
    {
      field: 'price',
      headerName: 'Prix',
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    { field: 'description', headerName: 'Description' },
  ];

  constructor(
    private route: ActivatedRoute,
    private watchservice: watchService,
    private cartService: CartService,
    private userSettingsService: UserSettingsService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.userSettingsService.getLoggedUser();
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error);
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.watchservice.getWatchById(id).subscribe({
        next: (data) => {
          this.watch = data;
        },
        error: (err) => {
          console.log('Failed to load watch details', err);
        },
      });
    }
  }

  addToOrder(quantity: number): Observable<void> {
    return new Observable((observer) => {
      if (!this.user) {
        observer.error('Utilisateur non connecté.');
        return;
      }
  
      this.cartService.getPendingOrder(this.user.id).subscribe({
        next: (order) => {
          if (order) {
            this.cartService.addToCart(this.watch.id, order.id, quantity).subscribe({
              next: () => {
                observer.next();
                observer.complete();
              },
              error: (err) => observer.error(err),
            });
          } else {
            observer.error('Aucune commande "pending" trouvée.');
          }
        },
        error: (err) => observer.error(err),
      });
    });
  }

// Fonction pour créer une nouvelle commande et y ajouter l'article
createAndAddToNewOrder(): void {
  let u : OrderDTO;
    this.cartService.createOrder().subscribe({
        next: (newOrder) => {
            u:newOrder;
        },
        
        error: (err) => {
            console.error('Erreur lors de la création de la commande :', err);
            this.errorMessage = 'Impossible de créer une nouvelle commande.';
        },
    });
    
      
    this.cartService.addToCart(this.watch!.id, u!.id, 1).subscribe({
      next: () => {
          this.errorMessage = null;
          alert('Article ajouté à la nouvelle commande avec succès.');
      },
      error: (err) => {
          console.error('Erreur lors de l\'ajout à la nouvelle commande :', err);
          this.errorMessage = 'Impossible d\'ajouter cet article à la nouvelle commande.';
      },
  });
    
}
attemptAddToOrder(quantity: number): void {
  this.addToOrder(quantity).subscribe({
    next: () => {
      console.log('Produit ajouté avec succès à une commande existante.');
      alert('Produit ajouté avec succès.');
    },
    error: (err) => {
      console.warn('Erreur lors de l\'ajout à une commande existante. Création d\'une nouvelle commande...', err);
      this.createAndAddToNewOrder();
    },
  });
}


  goBack(): void {
    window.history.back();
  }
}
