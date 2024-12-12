import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-or-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-or-register.component.html',
  styleUrl: './login-or-register.component.css'
})
export class LoginOrRegisterComponent {
  private readonly router = inject(Router);
  ngOnInit(): void {
    if (this.isLoggedIn()) {
      console.log('Utilisateur déjà connecté, redirection vers login-page.');
      this.router.navigate(['/login-page']);
    }
  }

  goToLogin() {
    console.log("Navigating to login page");
    this.router.navigate(['/login-page']);
  }

  goToRegister() {
    console.log("Navigating to register page");
    this.router.navigate(['/register-page']);
  }
  isLoggedIn(): boolean {
    const sessionData = localStorage.getItem('userSession');
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      return new Date().getTime() < parsedData.expiry;
    }
    return false;
  }
}
