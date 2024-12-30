import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { UserDTO } from '../DTOs/userDTO';
import { OrderDTO } from '../DTOs/orderDTO';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  private readonly userService = inject(userService);
  private readonly cartService = inject(CartService);
  usersDTO: UserDTO[] = [];
  isFormVisible = false;
  newUser: { name: string; email: string; password: string } = {
    name: '',
    email: '',
    password: ''
  };

  constructor() {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Method to load users
  loadUsers(): void {
    this.userService.getusersDTO().subscribe({
      next: (data) => {
        console.log('Loaded users successfully', data);
        this.usersDTO = data;
        this.usersDTO.forEach(user => {
          this.userService.getUserOrderSummary(user.id).subscribe({
            next: (orderSummary) => {
              user.numberOfOrders = orderSummary.count;
              user.totalSpent = orderSummary.total;
            },
            error: (err) => {
              console.error('Error loading user order summary', err);
            }
          });
        });
      },
      error: (err) => {
        console.error('Error loading users', err);
      }
    });
  }

  // Method to toggle the form visibility
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  // Method to add a new user
  addUser(): void {
    if (this.newUser.name && this.newUser.email && this.newUser.password) {
      this.userService.addUser(this.newUser).subscribe({
        next: () => {
          console.log('User added successfully');
          this.loadUsers();
          this.isFormVisible = false;
          this.newUser = { name: '', email: '', password: '' };
        },
        error: (err) => {
          console.error('Failed to add user', err);
        }
      });
    } else {
      console.warn('All fields are required');
    }
  }

  // Method to edit a user
  editUser(updatedUser: UserDTO): void {
    this.userService.updateUserByEmail(updatedUser).subscribe({
      next: () => {
        console.log('User updated successfully');
        this.loadUsers();
      },
      error: (err) => {
        console.error('Failed to update user', err);
      }
    });
  }

  // Method to confirm deletion of a user
  confirmDelete(email: string): void {
    const confirmation = confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      this.deleteUser(email);
    }
  }

  // Method to delete a user
  deleteUser(email: string): void {
    this.userService.deleteUser(email).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.loadUsers();
      },
      error: (err) => {
        console.error('Failed to delete user', err);
      }
    });
  }

  // Method to sort users
  sortUsers(event: Event): void {
    const sortOption = (event.target as HTMLSelectElement).value;
    if (sortOption === 'name_asc') {
      this.usersDTO.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name_desc') {
      this.usersDTO.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'id_asc') {
      this.usersDTO.sort((a, b) => a.id - b.id);
    } else if (sortOption === 'id_desc') {
      this.usersDTO.sort((a, b) => b.id - a.id);
    }
  }
}
