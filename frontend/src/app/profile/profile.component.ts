import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { userService } from '../user.service';
import { CommonModule } from '@angular/common';
import { UserDTO } from '../DTOs/userDTO';

@Component({
  selector: 'app-profile-page',
  standalone : true,
  imports : [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: UserDTO | null = null; // Stocke les données utilisateur
  soldeVisible: boolean = false; // Contrôle la visibilité du solde
  discountVisible: boolean = false; // Contrôle la visibilité de la réduction

  constructor(private userService: userService) {}

  ngOnInit(): void {
    const sessionData = localStorage.getItem('userSession'); // Charge les données de la session
    if (sessionData) {
      const userEmail = JSON.parse(sessionData).email; // Récupère l'email depuis la session
      this.loadUserData(userEmail); // Charge les données utilisateur depuis le backend
    } else {
      console.warn('Aucune session active trouvée.');
    }
  }

  // Charge les données utilisateur depuis la base de données avec l'email
  loadUserData(email: string): void {
    this.userService.GetUserByEmail(email).subscribe({
      next: (data: UserDTO) => {
        this.user = data; // Affecte les données utilisateur récupérées
        console.log('Données utilisateur chargées :', data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données utilisateur :', err);
      }
    });
  }

  showSolde(): void {
    this.soldeVisible = true;
    this.discountVisible = false;
  }

  showDiscount(): void {
    this.discountVisible = true;
    this.soldeVisible = false;
  }
}
