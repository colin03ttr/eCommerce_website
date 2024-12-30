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

  // function to attempt to add a watch to the cart, if error, then create a new order and add the watch to it
  attemptToAddToCart(quantity: number): void {
    if (!this.user) {
      this.errorMessage = 'Vous devez être connecté pour ajouter cet article à une commande.';
      return;
    }

    if (this.watch) {
      this.cartService.getPendingOrder(this.user.id).subscribe({
        next: (order) => {
          if (order) {
            console.log('Commande en cours trouvée, ajout de l\'article à la commande existante.');
            this.cartService.addToCart(this.watch.id, order.id, quantity).subscribe({
              next: () => {
                this.errorMessage = null;
                console.log('Article ajouté à la commande existante avec succès.');
                alert('Article ajouté à la commande existante avec succès.');
              },
              error: (err) => {
                console.error('Erreur lors de l\'ajout à la commande existante :', err);
                this.errorMessage = 'Impossible d\'ajouter cet article à la commande existante.';
              },
            });
          } else {
            this.createAndAddToNewOrder();
          }
        },
        error: (err) => {
          if(err.status === 404) {
            console.log('Aucune commande en cours trouvée, création d\'une nouvelle commande.');
            this.createAndAddToNewOrder();
          }else {
            console.error('Erreur lors de la vérification des commandes existantes :', err);
            this.errorMessage = 'Impossible de vérifier les commandes existantes.';
          }
        },
      });
    }
  }

// Fonction pour créer une nouvelle commande et y ajouter l'article
createAndAddToNewOrder(): void {
  if (!this.user) {
      this.errorMessage = 'Vous devez être connecté pour ajouter cet article à une commande.';
      window.alert(this.errorMessage);
      return;
  }
  let order: OrderDTO;

  this.cartService.createOrderForUser({ userId: this.user.id, status: 'pending' }).subscribe({
    next: () => {
      console.log('Commande créée avec succès.');
      this.addToOrder();
    },
    error: (err) => {
      console.error('Erreur lors de la création de la commande :', err);
      this.errorMessage = 'Impossible de créer une nouvelle commande.';
    },
  });
}

addToOrder(): void {
  if (!this.user) {
    this.errorMessage = 'Vous devez être connecté pour ajouter cet article à une commande.';
    return;
  }
  if (this.watch) {
    this.cartService.getPendingOrder(this.user.id).subscribe({
      next: (order) => {
        if (order) {
          console.log('Commande en cours trouvée, ajout de l\'article à la commande existante.');
          this.cartService.addToCart(this.watch.id, order.id, 1).subscribe({
            next: () => {
              this.errorMessage = null;
              console.log('Article ajouté à la commande existante avec succès.');
              alert('Article ajouté à la commande existante avec succès.');
            },
            error: (err) => {
              console.error('Erreur lors de l\'ajout à la commande existante :', err);
              this.errorMessage = 'Impossible d\'ajouter cet article à la commande existante.';
            },
          });
        }
      },
      error: (err) => {
        console.error('Erreur lors de la vérification des commandes existantes :', err);
        this.errorMessage = 'Impossible de vérifier les commandes existantes.';
      },
    });
  }
}

  goBack(): void {
    window.history.back();
  }
}
