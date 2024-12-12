import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { userService } from '../user.service';
import { UserDTO } from '../DTOs/userDTO';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, RouterLink, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private readonly userService = inject(userService);
  private readonly router = inject(Router);
  validUserDTO: UserDTO = { id: -1, name: '', email: '', password: '' };
  loginUser: { username: string; email: string; password: string } = { username: '', email: '', password: '' };
  showForm: boolean = false;
  errorMessage: string | null = null;
  sessionStatus: string | null = null; // Pour afficher l'état de la session

  onClickDeployForm() {
    this.showForm = !this.showForm;
    console.log(`Form state toggled. Current state: ${this.showForm ? 'Deployed' : 'Hidden'}`);
  }

  onSubmit() {
    console.log("Submitting login form");
    console.log("User entered details:");
    console.log("Username: ", this.loginUser.username);
    console.log("Email: ", this.loginUser.email);
    console.log("Password: ", this.loginUser.password);
  
    this.userService.GetUserByEmail(this.loginUser.email).subscribe({
      next: data => {
        console.log("User data fetched from server:", data);
        this.validUserDTO.id = data.id;
        this.validUserDTO.name = data.name;
        this.validUserDTO.email = data.email;
        this.validUserDTO.password = data.password;

        if (this.validUserDTO.password === this.loginUser.password) {
          console.log("User logged in successfully. Starting session.");
          this.errorMessage = null;
          this.startUserSession(this.validUserDTO); // Démarrer la session
          this.sessionStatus = `Session started for user: ${this.validUserDTO.name}`; // Indication visuelle
          console.log(this.sessionStatus);
          this.router.navigate(['/']); // Redirige vers la page d'accueil
        } else {
          console.log("Failed to login user. Invalid password.");
          this.errorMessage = "Invalid credentials. Please try again.";
        }
      },
      error: err => {
        console.error("Failed to load user data from server:", err);
        this.errorMessage = "An error occurred. Please try again later.";
      }
    });
  }

  startUserSession(user: UserDTO) {
    const sessionData = {
      user,
      expiry: new Date().getTime() + 60 * 60 * 1000 // Durée de session : 1 heure
    };
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    console.log("Session data saved to localStorage:", sessionData);
  }

  isSessionActive(): boolean {
    const sessionData = localStorage.getItem('userSession');
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      const isActive = new Date().getTime() < parsedData.expiry;
      console.log(`Session active: ${isActive}`);
      return isActive;
    }
    console.log("No active session found.");
    return false;
  }

  getLoggedUser(): UserDTO | null {
    const sessionData = localStorage.getItem('userSession');
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      if (new Date().getTime() < parsedData.expiry) {
        console.log("Logged user retrieved from session:", parsedData.user);
        return parsedData.user;
      } else {
        console.log("Session expired. Clearing session data.");
        localStorage.removeItem('userSession');
      }
    } else {
      console.log("No session data found.");
    }
    return null;
  }

  logout() {
    console.log("Logging out user.");
    localStorage.removeItem('userSession');
    this.sessionStatus = "No active session"; // Réinitialisation de l'état de la session
    this.router.navigate(['/login']); // Redirige vers la page de login
  }
}
