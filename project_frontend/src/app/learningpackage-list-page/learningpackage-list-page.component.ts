import { Component, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

import { LearningpackageService } from '../learningpackage.service';
import { LearningPackageDTO } from '../DTOs/learningPackageDTO';
import { LearningPackageModel } from '../DTOs/learningPackageDTO';

import { LearningFactService } from '../learningfact.service';
import { LearningFactDTO } from '../DTOs/learningFactDTO';
import { LearningFactModel } from '../DTOs/learningFactDTO';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-learningpackage-list-page',
  standalone: true,
  imports: [NgFor,NgIf,CommonModule, FormsModule],
  templateUrl: './learningpackage-list-page.component.html',
  styleUrl: './learningpackage-list-page.component.css'
})
export class LearningpackageListPageComponent {
  private readonly learningPackageService = inject(LearningpackageService);
  packagesDTO: LearningPackageDTO[] = [];
  packagesModel: LearningPackageModel[] = [];
  private readonly learningFactService = inject(LearningFactService);
  factsDTO: LearningFactDTO[] = [];
  factsModel: LearningFactModel[] = [];
  factsDTOMap: { [key: number]: LearningFactDTO[] } = {};
  factsModelMap: { [key: number]: LearningFactModel[] } = {};
  showFormPost: boolean = false;
  showFormPut: boolean = false;
  showFormPostFact: boolean = false;
  newPackage: { name: string; description: string, category: string, targetAudience: string, difficultyLevel: number } = { name: '', description: '', category: '', targetAudience: '', difficultyLevel: 0 };
  newFact: { fact: string, packageId: number } = { fact: '', packageId: 0 };

  onClickReloadDTO() {
    this.learningPackageService.getLearningPackageDTOs().subscribe({
      next: data => {
        console.log("finished loaded Learning Packages, saving to component field");
        this.packagesDTO = data;
        console.log(this.packagesDTO);
      },
      error: err => {
        console.log('Failed to load Learning Packages from Http server', err);
      }
    });
  }
  onClickReloadModel() {
    this.learningPackageService.getLearningPackageDTOs().subscribe({
      next: data => {
        console.log("finished loaded Learning Packages, saving to component field");
        this.packagesModel = data;
        console.log(this.packagesModel);
      },
      error: err => {
        console.log('Failed to load Learning Packages from Http server', err);
      }
    });
  }
  onClickReloadFactDTO(id: number) {
    this.learningFactService.getLearningFactDTOsByPackageId(id).subscribe({
      next: data => {
        console.log(`finished loaded Learning Facts from Package ${id}, saving to component field`);
        this.factsDTOMap[id] = data;
        console.log(this.factsDTOMap[id]);
      },
      error: err => {
        console.log(`Failed to load Learning Facts from Package ${id} from Http server`, err);
      }
    });
  }
  onClickReloadFactModel(id: number) {
    this.learningFactService.getLearningFactsModelByPackageId(id).subscribe({
      next: data => {
        console.log(`finished loaded Learning Facts from Package ${id}, saving to component field`);
        this.factsModelMap[id] = data;
        console.log(this.factsModelMap[id]);
      },
      error: err => {
        console.log(`Failed to load Learning Facts from Package ${id} from Http server`, err);
      }
    });
  }
  onClickDeployFormPost() {
    if (this.showFormPost) {
      this.showFormPost = false;
    } else {
      this.showFormPost = true;
    }
  }
  onSubmitPost() {
    console.log(this.newPackage);
    this.learningPackageService.addPackage(this.newPackage).subscribe({
      next: data => {
        console.log("Learning Package added successfully");
        this.onClickReloadDTO();
      },
      error: err => {
        console.log("Failed to add Learning Package", err);
      }
    });
  }
  onClickDeployFormPut() {
    if (this.showFormPut) {
      this.showFormPut = false;
    } else {
      this.showFormPut = true;
    }
  }

  // Put method to update a package
  onSubmitPut(id: number) {
    console.log(id,this.newPackage);
    this.learningPackageService.updatePackage(id,this.newPackage).subscribe({
      next: data => {
        console.log("Learning Package updated successfully");
        this.onClickReloadDTO();
      },
      error: err => {
        console.log("Failed to update Learning Package", err);
      }
    });
  }

  onClickDeployFormPostFact() {
    if (this.showFormPostFact) {
      this.showFormPostFact = false;
    } else {
      this.showFormPostFact = true;
    }
  }
  // Post method to add a new fact
  onSubmitPostFact(packageId: number) {
    this.newFact.packageId = packageId;
    console.log(this.newFact);

    this.learningFactService.addFact(this.newFact).subscribe({
      next: data => {
        console.log("Learning Fact added successfully");
        this.onClickReloadFactDTO(packageId);
      },
      error: err => {
        console.log("Failed to add Learning Fact", err);
      }
    });
  }
}
