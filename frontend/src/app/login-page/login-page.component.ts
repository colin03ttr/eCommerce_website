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
  validUserDTO: UserDTO = { id: -1, name: '', email: '', password: '' };
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
    
    this.userService.GetUserByEmail(this.loginUser.email).subscribe({
      next: data => {
        console.log("finished loaded user");
        this.validUserDTO.id = data.id;
        this.validUserDTO.name = data.name;
        this.validUserDTO.email = data.email;
        this.validUserDTO.password = data.password;
      },
      error: err => {
        console.log('Failed to load Users from Http server', err);
      }
    })
    
    if(this.validUserDTO != null)
    {
      console.log("User found");
      console.log("name entered : ",this.validUserDTO.name);
      console.log("email entered : ",this.validUserDTO.email);
      console.log("passwd entered : ",this.validUserDTO.password);
      console.log("passwd wanted : ",this.loginUser.password);
      if(this.validUserDTO.password == this.loginUser.password){
        console.log("User logged in successfully");
        console.log(this.validUserDTO);
      }else{
        console.log("Failed to login User");
      }
    }else
    {
      console.log("Couldn't get user from server");
    }
  }
}
