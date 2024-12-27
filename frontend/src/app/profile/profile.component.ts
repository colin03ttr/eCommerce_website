import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { UserSettingsService } from '../user-settings.service';
import { userService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  standalone : true,
  imports : [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfilePageComponent implements OnInit {
  addedSolde: number = 0; // Pour ajouter au solde
  user: { id: number, name: string, email: string, solde: number, discount: number } | null = null; // Stocke les données utilisateur
  soldeVisible: boolean = false; // Contrôle la visibilité du solde
  discountVisible: boolean = false; // Contrôle la visibilité de la réduction
  formChanged: boolean = false;
  showMoneyInput: boolean = false;
  
  constructor(private userService: userService, protected userSettingsService: UserSettingsService) {  }

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.userSettingsService.getLoggedUser(); // Récupère les données utilisateur stockées
      if(this.user){
        console.log('Données utilisateur récupérées :', this.user);
      }else{
        console.error('Aucune donnée utilisateur récupérée.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error);
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
    this.userService.updateUser(this.user).subscribe({
      next: data => {
        console.log('User updated successfully:', data);
        this.formChanged = false;
      },
      error: err => {
        console.error('Failed to update user:', err);
      }
    });
    window.location.reload();
}

  onChange(): void {
    this.formChanged = true;
  }
  addMoney(money: number): void {
    if(this.user){
      if(money<0){
        console.log("Positive values only : if you don't want to lose your money");
        window.alert("Positive values only : if you don't want to lose your money");
        ("Positive values only : if you don't want to lose your money")
        return;
      }else if(money!=0){
        const newSolde = this.user.solde+money;
        this.user.solde = newSolde;
        this.editProfile();
      }
    }
  }
}

