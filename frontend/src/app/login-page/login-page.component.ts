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
      const response = await this.userService.login(this.loginUser);
      if (response.token) {
        // Save the token to localStorage or cookies
        localStorage.setItem('jwtToken', response.token);
        // get logged user
        const user = await this.userSettingsService.getLoggedUser();
        if (user?.isAdmin) {
          this.router.navigate(['/admin']).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }
      }
    } catch (error: any) {
      // Handle specific errors
      console.error("Login error:", error);

      // Check if the error is a 404 or has specific details
      if (error.status === 404) {
        this.errormsg = 'User not found. Please check your email and password.';
      } else if (error.error && typeof error.error === 'string') {
        this.errormsg = error.error; // Use server-provided error message if available
      } else {
        this.errormsg = 'An unexpected error occurred. Please try again later.';
      }
    }
  }

  isSessionActive(): boolean {
    return this.userSettingsService.isSessionActive();
  }

  logout() {
    return this.userSettingsService.logout();
  }
}
