import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { UserSettingsService } from '../user-settings.service';
import { UserDTO } from '../DTOs/userDTO';

@Component({
  selector: 'app-menu-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, FontAwesomeModule, CommonModule],
  templateUrl: './menu-nav-bar.component.html',
  styleUrls: ['./menu-nav-bar.component.css']
})
export class MenuNavBarComponent implements OnInit, OnDestroy {
  faHome = faHome;
  faShoppingCart = faShoppingCart; // Icone pour le panier
  user: UserDTO | null = null;

  constructor(private router: Router, private userSettingsService: UserSettingsService) {
    console.log('MenuNavBarComponent.constructor()');
  }

  ngOnDestroy(): void {
    console.log('MenuNavBarComponent.ngOnDestroy()');
  }

  async ngOnInit(): Promise<void> {
    console.log('MenuNavBarComponent.ngOnInit()');
    if (this.userSettingsService.isSessionActive()) {
      this.user = await this.userSettingsService.getLoggedUser();
    }
  }

  isLoggedIn(): boolean {
    return this.userSettingsService.isSessionActive();
  }

  logout(): void {
    this.userSettingsService.logout();
  }

  goToProfile(): void {
    this.router.navigate(['/profile/', this.user?.email]);
  }

  /**
   * Redirige l'utilisateur vers la page du panier.
   */
  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
