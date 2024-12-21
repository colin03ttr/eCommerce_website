import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userService } from '../user.service';
import { UserDTO } from '../DTOs/userDTO';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserSettingsService } from '../user-settings.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private readonly userService = inject(userService);
  private readonly userSettingsService = inject(UserSettingsService);
  private readonly router = inject(Router);
  validUserDTO: UserDTO = { id: -1, name: '', email: '', password: '',solde:0,creationdate : new Date(),discount: 0   };
  loginUser: { username: string; email: string; password: string } = { username: '', email: '', password: '' };
  errorMessage: string | null = null;
  sessionStatus: string | null = null;  

  onSubmit() {
    console.log("Submitting login form");
    console.log("User entered details:");
    console.log("Email: ", this.loginUser.email);
    console.log("Password: ", this.loginUser.password);

    /* // Récupération des informations utilisateur par email
    this.userService.GetUserByEmail(this.loginUser.email).subscribe({
      next: async data => {
        console.log("User data fetched from server:", data);
        this.validUserDTO = { ...data };

        // Comparaison des mots de passe avec bcryptjs
        const isPasswordValid = await bcrypt.compare(this.loginUser.password, this.validUserDTO.password);
        
        if (isPasswordValid) {
          console.log("User logged in successfully. Starting session.");
          this.errorMessage = null;
          this.startUserSession(this.validUserDTO); 
          this.sessionStatus = `Session started for user: ${this.validUserDTO.name}`; 
          console.log(this.sessionStatus);
        } else {
          console.log("Failed to login user. Invalid password.");
          this.errorMessage = "Invalid credentials. Please try again.";
        }
      },
      
      error: err => {
        console.error("Failed to load user data from server:", err);
        this.errorMessage = "An error occurred. Please try again later.";
        
      }
      
    }); */
    
  }

  startUserSession(user: UserDTO) {
    return this.userSettingsService.startUserSession(user);
  }

  isSessionActive(): boolean {
    return this.userSettingsService.isSessionActive();
  }

  getLoggedUser(): UserDTO | null {
    return this.userSettingsService.getLoggedUser();
  }

  logout() {
    return this.userSettingsService.logout();
  }
}