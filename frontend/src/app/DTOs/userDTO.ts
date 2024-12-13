export interface UserDTO {
    id: number;
    name: string;
    email: string;
    password: string;
    solde: number ;
    creationdate: Date;
    discount: number;
  }
  
  export class UserModel {
    id: number;
    name: string;
    email: string;
    password: string;
    solde: number ;
    creationdate: Date;
    discount: number;
    
  
    constructor(src: UserDTO) {
      this.id = src.id || -1;
      this.name = src.name || "";
      this.email = src.email || "";
      this.password = src.password || "";
      this.solde = src.solde || 0;
      this.creationdate = src.creationdate || Date.now;
      this.discount = src.discount || 0 ;
    }
    
  }