import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserDTO } from './DTOs/userDTO';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class userService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = '/api/users';
  getusersDTO(): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>('/api/users');
  }

  //post method to add a new user
  addUser(infos : {name:string,email:string,password:string}): Observable<UserDTO> 
  {
    return this.httpClient.post<UserDTO>('/api/users', infos);
  }
  GetUserByEmail(email: string): Observable<UserDTO> 
  {
    console.log(email);
    const encodedEmail = encodeURIComponent(email);
    return this.httpClient.get<UserDTO>(`/api/users/${encodedEmail}`).pipe(
        catchError((error) => {
            console.error('Error fetching user:', error);
            return throwError(() => new Error('Failed to fetch user'));
        })
    );
  }


  //put method to update a user
  updateUserByEmail(email: string, updatedUser: UserDTO): Observable<UserDTO> {
    return this.httpClient.put<UserDTO>(`${this.apiUrl}/${encodeURIComponent(email)}`, updatedUser);
}

  constructor() { }
  getUserProfile(): Observable<UserDTO> {
    const token = localStorage.getItem('jwtToken'); // Récupération du token
  
    if (!token) {
      console.error("No token found. User is not authenticated.");
      throw new Error("No token available.");
    }
  
    return this.httpClient.get<UserDTO>('/api/profile', {
      headers: {
        Authorization: `Bearer ${token}` // Ajout du token dans l'en-tête
      }
    });
  }
  
}

