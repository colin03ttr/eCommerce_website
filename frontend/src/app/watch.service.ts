import { Injectable, inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { WatchDTO } from './DTOs/watchDTO'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class watchService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = '/api/watches';

  public getWatchesDTO(): Observable<WatchDTO[]> {
    return this.httpClient.get<WatchDTO[]>(`/api/watches`);
  }

  public getWatchById(id: number): Observable<WatchDTO> {
    return this.httpClient.get<WatchDTO>(`/api/watches/${id}`);
  }

  public updateWatch(updatedWatch: WatchDTO): Observable<WatchDTO> {
    return this.httpClient.put<WatchDTO>(`/api/watches`, updatedWatch);
  }
}
