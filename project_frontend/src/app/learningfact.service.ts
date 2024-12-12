import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LearningFactsService } from '../generated/angular-client';
import { LearningFactDTO, LearningFactModel } from './DTOs/learningFactDTO';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LearningFactService {
  private readonly httpClient = inject(HttpClient);
  getLearningFactDTOsByPackageId(packageId: number): Observable<LearningFactDTO[]> {
    return this.httpClient.get<LearningFactDTO[]>(`/api/package/${packageId}/fact`);
  }

  getLearningFactsModelByPackageId(packageId: number): Observable<LearningFactModel[]> {
    return this.httpClient.get<LearningFactDTO[]>(`/api/package/${packageId}/fact`)
      .pipe(map(FactArray => FactArray.map(x => new LearningFactModel(x))));
  }

  // post method to add a new fact
  addFact(infos: { fact: string, packageId: number }): Observable<LearningFactModel> {
    return this.httpClient.post<LearningFactModel>(`/api/package/${infos.packageId}/fact`, infos);
  }
  /* private readonly learningFactService = inject(LearningFactsService);

  getLearningFactDTOsByPackageId(packageId: number): Observable<LearningFactDTO[]> {
    return this.learningFactService.apiPackageIdFactGet(packageId.toString()).pipe(
      map((FactArray: LearningFactDTO[]) => FactArray.map((x: LearningFactDTO) => new LearningFactModel(x)))
    );
  } */

  constructor() { }
}
