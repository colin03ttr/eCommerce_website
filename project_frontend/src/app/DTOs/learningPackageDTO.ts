export interface LearningPackageDTO {
    id: number;
    name: string;
    description: string;
    category: string;
    targetAudience: string;
    difficultyLevel: number;
  }

  export class LearningPackageModel {
    id: number;
    name: string;
    description: string;
    category: string;
    targetAudience: string;
    difficultyLevel: number;
  
    constructor(src: LearningPackageDTO) {
      this.id = src.id || -1;
      this.name = src.name || "";
      this.description = src.description || "";
      this.category = src.category || "";
      this.targetAudience = src.targetAudience || "";
      this.difficultyLevel = src.difficultyLevel || 1;
    }
  }
  