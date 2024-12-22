import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { UserSettingsService } from '../user-settings.service';
import { UserDTO } from '../DTOs/userDTO';

@Component({
  selector: 'app-menu-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, FontAwesomeModule,CommonModule],
  templateUrl: './menu-nav-bar.component.html',
  styleUrl: './menu-nav-bar.component.css'
})
export class MenuNavBarComponent implements OnInit, OnDestroy {
  faHome = faHome;
  user: UserDTO | null = null;

  constructor(private router: Router, private userSettingsService: UserSettingsService) {
    console.log('MenuNavBarComponent.constructor()');
  }

  ngOnDestroy(): void {
    console.log('MenuNavBarComponent.ngOnDestroy()');
  }

  async ngOnInit(): Promise<void> {
    console.log('MenuNavBarComponent.ngOnInit()');
    // looks for logged user
    if(this.userSettingsService.isSessionActive())
      this.user = await this.userSettingsService.getLoggedUser();
  }

  /**
   * Vérifie si l'utilisateur est connecté.
   */
  isLoggedIn(): boolean {
    return this.userSettingsService.isSessionActive();
  }

 
  /**
   * Déconnecte l'utilisateur.
   */
  logout(): void {
    this.userSettingsService.logout();
  }

  /**
   * Redirige l'utilisateur vers la page de profil.
   */
  goToProfile(): void {
    this.router.navigate(['/profile/', this.user?.email]);
  }
}