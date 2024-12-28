export interface UserDTO {
    id: number;
    name: string;
    email: string;
    solde: number ;
    creationdate: Date;
    discount: number;
    isAdmin: boolean;
  }
  
  export class UserModel {
    id: number;
    name: string;
    email: string;
    solde: number ;
    creationdate: Date;
    discount: number;
    isAdmin: boolean;
    
  
    constructor(src: UserDTO) {
      this.id = src.id || -1;
      this.name = src.name || "";
      this.email = src.email || "";
      this.solde = src.solde || 0;
      this.creationdate = src.creationdate || Date.now;
      this.discount = src.discount || 0 ;
      this.isAdmin = src.isAdmin || false;
    }
    
  }