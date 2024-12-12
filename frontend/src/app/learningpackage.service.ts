import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DefaultService, LearningPackagesService } from '../generated/angular-client';
import { LearningPackageDTO, LearningPackageModel } from './DTOs/learningPackageDTO';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LearningpackageService {
  private readonly httpClient = inject(HttpClient);

  getLearningPackageDTOs(): Observable<LearningPackageDTO[]> {
    return this.httpClient.get<LearningPackageDTO[]>('/api/package');
  }

  getLearningPackages(): Observable<LearningPackageModel[]> {
    return this.httpClient.get<LearningPackageDTO[]>('/api/package')
      .pipe(map(packageArray => packageArray.map(x => new LearningPackageModel(x))));
  }

  // post method to add a new package
  addPackage(infos: { name: string, description: string, category: string, targetAudience: string, difficultyLevel: number }): Observable<LearningPackageModel> {
    return this.httpClient.post<LearningPackageModel>('/api/package', infos);
  }

  // put method to update a package
  updatePackage(id: number, infos: { name: string, description: string, category: string, targetAudience: string, difficultyLevel: number }): Observable<LearningPackageModel> {
    const learningPackageDTO: LearningPackageDTO = { id, ...infos };
    const learningpackage = new LearningPackageModel(learningPackageDTO);
    return this.httpClient.put<LearningPackageModel>(`/api/package/${id}`, learningpackage);
  }


  /* private readonly defaultService = inject(DefaultService);

  getLearningPackageDTOs(): Observable<LearningPackageModel[]> {
    return this.defaultService.apiPackageGet().pipe(
      map((packageArray: LearningPackageDTO[]) => packageArray.map((x: LearningPackageDTO) => new LearningPackageModel(x)))
    );
  }

  private readonly learningPackagesService = inject(LearningPackagesService);

  getLearningPackageDTObyPackageId(packageId: number): Observable<LearningPackageModel> {
    return this.learningPackagesService.apiPackageIdGet(packageId.toString()).pipe(
      map((x: LearningPackageDTO) => new LearningPackageModel(x))
    );
  } */

  constructor() { }
}
