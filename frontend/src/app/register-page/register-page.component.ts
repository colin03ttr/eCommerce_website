import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { userService } from '../user.service';
import { UserDTO } from '../DTOs/userDTO';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private readonly userService = inject(userService);
  private readonly router = inject(Router);

  registerUser: { name: string; email: string; password: string, solde: number, creationdate : Date, discount: number } = { name: '', email: '', password: '',solde:0, creationdate : new Date(), discount: 0  };
  successMessage: string | null = null; // Pour afficher un message de succès
  errorMessage: string | null = null; // Pour afficher un message d'erreur

  onRegister() {
    console.log("Register form submitted");
    console.log("User entered details:");
    console.log("Name: ", this.registerUser.name);
    console.log("Email: ", this.registerUser.email);
    console.log("Password: ", this.registerUser.password);
    console.log("Balance: ", this.registerUser.solde);
    console.log("Date: ", this.registerUser.creationdate);
    console.log("Discount: ", this.registerUser.discount);

    this.userService.addUser(this.registerUser).subscribe({
      next: () => {
        console.log("User registered successfully.");
        this.successMessage = "Registration successful! You can now log in.";
        this.errorMessage = null; // Réinitialisation du message d'erreur
        setTimeout(() => {
          this.router.navigate(['/login-page']); // Redirige vers la page de login après succès
        }, 2000); // Redirection après 2 secondes
      },
      error: err => {
        console.error("Failed to register user:", err);
        this.successMessage = null; // Réinitialisation du message de succès
        this.errorMessage = "Failed to register user. Please try again later.";
      }
    });
  }
}
