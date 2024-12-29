import { Component, OnDestroy, OnInit, inject} from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MenuNavBarComponent } from "./menu-nav-bar/menu-nav-bar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule, NgIf } from '@angular/common';
import { UserSettingsService } from './user-settings.service';
import { UserDTO } from './DTOs/userDTO';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuNavBarComponent, FormsModule, ReactiveFormsModule, CommonModule, NgIf],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ecommerce_webapp';
  private readonly userSettingsService = inject(UserSettingsService);
  user: UserDTO | null = null;
  isAdmin: boolean = false;
  constructor(private router: Router) {
    console.log('AppComponent.constructor()');
  }
  ngOnDestroy(): void {
    console.log('AppComponent.ngOnDestroy()');
  }
  ngOnInit(): void {
    console.log('AppComponent.ngOnInit()');
/* 
    if (this.userSettingsService.isSessionActive()) {
      console.log('Session active');
      this.userSettingsService.getLoggedUser().then((user) => {
        this.user = user;
        if (this.user?.isAdmin) {
          console.log('User is admin');
          this.isAdmin = true;
          this.router.navigate(['/admin']);
        }
        else {
          console.log('User is not admin');
          this.isAdmin = false;
          this.router.navigate(['/home']);
        }
      });
    }
    else
    {
      console.log('Session not active');
      this.router.navigate(['/home']);
    } */
  }
  
}
