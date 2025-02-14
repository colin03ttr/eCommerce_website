import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, firstValueFrom } from 'rxjs';
import { UserDTO } from './DTOs/userDTO';
import { catchError } from 'rxjs/operators';
import { CartService } from './cart.service';


@Injectable({
  providedIn: 'root'
})
export class userService {
  private readonly httpClient = inject(HttpClient);
  private readonly cartService = inject(CartService);
  private readonly apiUrl = '/api/users';


  getusersDTO(): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>('/api/users');
  }

  getUserById(id: number): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(`/api/users/${id}`);
  }

  //post method to add a new user
  addUser(infos : {name:string,email:string,password:string}): Observable<UserDTO> 
  {
    return this.httpClient.post<UserDTO>('/api/users', infos);
  }

  //delete method to delete a user
  deleteUser(email: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/users/${email}`);
  }

  login(user: { email: string; password: string }) {
    return firstValueFrom(this.httpClient.post<{ token: string }>('/api/login-page', user));
  }

  //put method to update a user by email
  updateUserByEmail(updatedUser: { id: number, name: string, email: string, solde: number, discount: number }): Observable<UserDTO> {
    return this.httpClient.put<UserDTO>(`/api/users/${updatedUser.email}`, updatedUser);
  }
  //put method to update a user
  updateUser(updatedUser: { id: number, name: string, email: string, solde: number, discount: number }): Observable<UserDTO> {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error("No token found. User is not authenticated.");
      throw new Error("No token available.");
    }

    return this.httpClient.put<UserDTO>(`/api/profile`, updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(error);
      })
    );
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

  getUserOrderSummary(userId: number): Observable<{ count: number; total: number }> {
    return this.httpClient.get<{ count: number; total: number }>(`/api/users/${userId}/orders/summary`).pipe(
      catchError(error => {
        console.error('Error fetching order summary:', error);
        return throwError(error);
      })
    );
  }
}

