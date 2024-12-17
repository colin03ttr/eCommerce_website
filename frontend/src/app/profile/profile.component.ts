import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { UserSettingsService } from '../user-settings.service';
import { userService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDTO } from '../DTOs/userDTO';

@Component({
  selector: 'app-profile-page',
  standalone : true,
  imports : [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfilePageComponent implements OnInit {
  addedSolde: number = 0; // Pour ajouter au solde
  user: UserDTO | null = null; // Stocke les données utilisateur
  soldeVisible: boolean = false; // Contrôle la visibilité du solde
  discountVisible: boolean = false; // Contrôle la visibilité de la réduction
  formChanged: boolean = false;
  
  constructor(private userService: userService, protected userSettingsService: UserSettingsService) {  }

  ngOnInit(): void {
    this.user = this.userSettingsService.getLoggedUser(); // Récupère les données utilisateur stockées
    if(this.user){
      console.log('Données utilisateur récupérées :', this.user);
    }else{
      console.error('Aucune donnée utilisateur récupérée.');
    }
  }

  showSolde(): void {
    this.soldeVisible = true;
    this.discountVisible = false;
  }

  showDiscount(): void {
    this.discountVisible = true;
    this.soldeVisible = false;
  }
  editProfile(): void {
    if (!this.user) return;
    // update user in database
    this.userService.updateUserByEmail(this.user.email, this.user).subscribe({
        next: (updatedUser) => {
            console.log('Profil mis à jour avec succès :', updatedUser);
            this.user = updatedUser; // Met à jour localement
            // this.updatedUser = {}; // Réinitialise les champs de mise à jour
            this.addedSolde = 0; // Réinitialise le montant ajouté
        },
        error: (err) => {
            console.error('Erreur lors de la mise à jour du profil :', err);
        },
    });

    //update user session
    this.userSettingsService.updateSession(this.user)
    window.location.reload();
}

  onChange(): void {
    this.formChanged = true;
  }
}

