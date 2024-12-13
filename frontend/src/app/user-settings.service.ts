import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from './DTOs/userDTO';

@Injectable({
  providedIn: 'root'
})

export class UserSettingsService{
  sessionStatus: string | null = null;
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

  startUserSession(user: UserDTO) {
    const sessionData = {
      user,
      expiry: new Date().getTime() + 60 * 60 * 1000 
    };
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    console.log("Session data saved to localStorage:", sessionData);
  }

  isSessionActive(): boolean {
    if(this.isLocalStorageAvailable()) {
      const sessionData = localStorage.getItem('userSession');
      if (sessionData) {
        const parsedData = JSON.parse(sessionData);
        const isActive = new Date().getTime() < parsedData.expiry;
        console.log(`Session active: ${isActive}`);
        return isActive;
      }
      console.log("No active session found.");
      return false;
    }else { return false; }
  }

  getLoggedUser(): UserDTO | null {
    if(this.isLocalStorageAvailable()) {
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
    }
    return null;
  }

  logout() {
      if(this.isLocalStorageAvailable()) {
      console.log("Logging out user.");
      localStorage.removeItem('userSession');
      this.sessionStatus = "No active session";
      this.router.navigate(['/']); 
    }
  } 
}
