import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { userService } from '../user.service';
import { UserDTO } from '../DTOs/userDTO';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.css'
})
export class UsersListPageComponent {
  private readonly userService = inject(userService);
  usersDTO: UserDTO[] = [];

  onClickReloadDTO() {
    this.userService.getusersDTO().subscribe({
      next: data => {
        console.log("finished loaded Users, saving to component field");
        this.usersDTO = data;
        console.log(this.usersDTO);
      },
      error: err => {
        console.log('Failed to load Users from Http server', err);
      }
    });
  }
}
