import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserDTO } from '../DTOs/userDTO';
import { UserSettingsService } from '../user-settings.service';
import { WatchDTO } from '../DTOs/watchDTO';
import { watchService } from '../watch.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly userSettingsService = inject(UserSettingsService);
  private readonly watchService = inject(watchService);

  title = 'ecommerce_webapp';
  sessionStatus: boolean | null = null;
  user: UserDTO | null = null;
  featuredWatches: WatchDTO[] = [];

  ngOnInit(): void {
    this.sessionStatus = this.userSettingsService.isSessionActive();
    if (this.sessionStatus) {
      this.getLoggedUser().then((user) => {
        this.user = user;
        if (this.user?.isAdmin) {
          this.router.navigate(['/admin']).then(() => {
            window.location.reload();
          });
        }
      });
    }
    this.loadFeaturedWatches();
  }

  isSessionActive(): boolean {
    return this.userSettingsService.isSessionActive();
  }

  getLoggedUser(): Promise<UserDTO | null> {
    return this.userSettingsService.getLoggedUser();
  }

  loadFeaturedWatches(): void {
    this.watchService.getWatchesDTOBySorting('price_desc').subscribe({
      next: (watches) => {
        this.featuredWatches = watches.slice(0, 4); // Display top 4 watches
      },
      error: (err) => {
        console.error('Error loading featured watches:', err);
      },
    });
  }

  viewWatchDetails(watchId: number): void {
    this.router.navigate([`/products/${watchId}`]);
  }
}
