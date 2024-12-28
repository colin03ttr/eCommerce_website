import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { userService } from './user.service';
import { UserDTO } from './DTOs/userDTO';

@Injectable({
  providedIn: 'root'
})

export class UserSettingsService{
  sessionStatus: string | null = null;
  private readonly userService = inject(userService);
  private readonly router = inject(Router);

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  isSessionActive(): boolean {
    if(this.isLocalStorageAvailable()) {
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken) {
        try {
          // Decode the JWT token
          const payloadBase64 = jwtToken.split('.')[1]; // Extract the payload part
          const payloadJson = atob(payloadBase64); // Decode Base64 string
          const payload = JSON.parse(payloadJson); // Parse JSON payload
  
          // Check for an expiration field (exp) in the payload
          if (payload.exp) {
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            const isActive = payload.exp > currentTime; // Valid if current time is before expiration
            console.log(`Session active: ${isActive}`);
            const timeRemaining = payload.exp * 1000 - new Date().getTime();
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = Math.floor((timeRemaining % 60000) / 1000);
            console.log(`Session expires in: ${minutes} minutes and ${seconds} seconds`);
            return isActive;
          }
  
          return false; // If no exp field, consider the session invalid
        } catch (error) {
          console.error('Error parsing JWT token:', error);
          return false; // If token is malformed, session is invalid
        }
      }
      console.log("No active session found.");
      return false;
    } else {
      return false;
    }
  }

  async getLoggedUser(): Promise<UserDTO | null> {
    if(this.isLocalStorageAvailable()) {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        return null; // No token found, user is not logged in
      }

      try {
        // Make the GET request to /api/profile with the Authorization header
        const response = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
          return null;
        }

        const userInfo = await response.json();

        return {
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            solde: userInfo.solde,
            creationdate: userInfo.creationDate,
            discount: userInfo.discount,
            isAdmin: userInfo.isAdmin
          }
      }catch (error) {
        console.error('Error retrieving user information:', error);
        return null;
      }
    }else return null;
  }

  logout() {
      if(this.isLocalStorageAvailable()) {
      console.log("Logging out user.");
      localStorage.removeItem('jwtToken');
      this.sessionStatus = "No active session";
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      }); 
    }
  }
}
