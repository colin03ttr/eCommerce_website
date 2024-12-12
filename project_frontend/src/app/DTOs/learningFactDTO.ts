export interface LearningFactDTO {
    id: number;
    fact: string;
    packageId: number;
  }
  
  export class LearningFactModel {
    id: number;
    fact: string;
    packageId: number;
  
    constructor(src: LearningFactDTO) {
      this.id = src.id || -1;
      this.fact = src.fact || "";
      this.packageId = src.packageId || -1;
    }
  }