import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { UserSettingsService } from '../user-settings.service';
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

  constructor(private userService: userService, private userSettingsService: UserSettingsService) {}

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
}
