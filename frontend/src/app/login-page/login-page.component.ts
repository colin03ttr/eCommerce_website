import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userService } from '../user.service';
import { UserDTO } from '../DTOs/userDTO';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserSettingsService } from '../user-settings.service';

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
  loginUser = { email: '', password: '' };
  sessionStatus: string | null = null;  
  errormsg: string | null = null;

  async onSubmit() {
    console.log("Submitting login form");
    console.log("User entered details:");
    console.log("Email: ", this.loginUser.email);
    console.log("Password: ", this.loginUser.password);
    try {
      console.log("Submitting login form");
      const response = await this.userService.login(this.loginUser);
      if (response.token) {
        // Save the token to localStorage or cookies
        localStorage.setItem('jwtToken', response.token);
        this.router.navigate(['/']);
      }
    } catch (error) {
      // Handle errors and display an appropriate message
      console.error("Login error:", error);
      this.errormsg = (error as string) ?? 'An error occurred. Please try again later.';
    }    
  }

  isSessionActive(): boolean {
    return this.userSettingsService.isSessionActive();
  }

  logout() {
    return this.userSettingsService.logout();
  }
}