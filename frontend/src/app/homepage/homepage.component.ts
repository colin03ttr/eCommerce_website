import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserDTO } from '../DTOs/userDTO';
import { UserSettingsService } from '../user-settings.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  private readonly router = inject(Router);
  private readonly userSettingsService = inject(UserSettingsService);
  title = 'ecommerce_webapp';
  sessionStatus : boolean | null = null;
  user: UserDTO | null = null;
  ngOnInit(): void {
    this.sessionStatus = this.userSettingsService.isSessionActive();
    if(this.sessionStatus)
    {this.getLoggedUser().then(user => this.user = user);
      if(this.user?.isAdmin)
      {
        this.router.navigate(['/admin']).then(() => {
          window.location.reload();
        });
      }
    }
  }

  isSessionActive(): boolean {
    return this.userSettingsService.isSessionActive();
  }

  getLoggedUser(): Promise<UserDTO | null> {
    return this.userSettingsService.getLoggedUser(); 
  }
}
