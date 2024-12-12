import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO, UserModel } from './DTOs/userDTO';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class userService {
  private readonly httpClient = inject(HttpClient);

  getusersDTO(): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>('/api/users');
  }

  //post method to add a new user
  addUser(infos : {name:string,email:string,password:string}): Observable<UserModel> {
    return this.httpClient.post<UserModel>('/api/users', infos);
  }

  //put method to update a user
  updateUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.put<UserModel>('/api/users', user);
  }

  constructor() { }
}
