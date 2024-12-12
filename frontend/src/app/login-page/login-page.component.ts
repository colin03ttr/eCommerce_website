import { Component,inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { userService } from '../user.service';
import { UserDTO } from '../DTOs/userDTO';
import { FormsModule } from '@angular/forms';
import {RouterLink, RouterModule,Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule,NgFor,FormsModule,RouterLink,RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private readonly userService = inject(userService);
  usersDTO: UserDTO[] = [];
  loginUser: { username: string; email: string; password: string } = { username: '', email: '', password: '' };
  showForm: boolean = false;
  onClickDeployForm() {
    if (this.showForm) {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
  }

  onSubmit() {
    console.log(this.loginUser);
    
    const validuser = this.userService.GetUserByEmail(this.loginUser.email).subscribe
    /*
    if (
      this.loginUser.username === validuser.name &&
      this.loginUser.email === validuser.email &&
      this.loginUser.password === validuser.password
  ) {
      console.log('Login successful');
      // Perform additional actions like redirecting or showing a success message
  } else {
      console.error('Login failed: Invalid credentials');
      // Handle invalid credentials (e.g., show an error message in the UI)
      alert('Invalid username, email, or password. Please try again.');
  }
      */
    
  }

}
