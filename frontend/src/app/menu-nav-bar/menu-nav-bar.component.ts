import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, FontAwesomeModule,CommonModule],
  templateUrl: './menu-nav-bar.component.html',
  styleUrl: './menu-nav-bar.component.css'
})
export class MenuNavBarComponent implements OnInit, OnDestroy {
  faHome = faHome;
  userName: string | null = null; // Nom de l'utilisateur connecté

  constructor(private router: Router) {
    console.log('MenuNavBarComponent.constructor()');
  }

  ngOnDestroy(): void {
    console.log('MenuNavBarComponent.ngOnDestroy()');
  }

  ngOnInit(): void {
    console.log('MenuNavBarComponent.ngOnInit()');
    this.checkSession(); // Vérifie si une session est active
  }

  /**
   * Vérifie si une session est active et récupère le nom de l'utilisateur.
   */
  checkSession(): void {
    if (typeof localStorage !== 'undefined') {
      const sessionData = localStorage.getItem('userSession');
      if (sessionData) {
        const parsedData = JSON.parse(sessionData);
        if (new Date().getTime() < parsedData.expiry) {
          this.userName = parsedData.user.name;
          console.log('Session active. User:', this.userName);
        } else {
          console.log('Session expirée. Suppression des données de session.');
          localStorage.removeItem('userSession');
          this.userName = null;
        }
      } else {
        console.log('Aucune session active trouvée.');
      }
    } else {
      console.log('localStorage n’est pas disponible.');
    }
  }

  /**
   * Vérifie si l'utilisateur est connecté.
   */
  isLoggedIn(): boolean {
    return this.userName !== null;
  }

  /**
   * Redirige vers la page login-or-register.
   */
 
  /**
   * Déconnecte l'utilisateur.
   */
  logout(): void {
    console.log('Déconnexion de l\'utilisateur.');
    localStorage.removeItem('userSession');
    this.userName = null;
    this.router.navigate(['/']); // Redirige vers la page d'accueil
  }
}