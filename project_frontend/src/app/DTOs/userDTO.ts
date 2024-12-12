export interface UserDTO {
    id: number;
    name: string;
    email: string;
    password: string;
  }
  
  export class UserModel {
    id: number;
    name: string;
    email: string;
    password: string;
  
    constructor(src: UserDTO) {
      this.id = src.id || -1;
      this.name = src.name || "";
      this.email = src.email || "";
      this.password = src.password || "";
    }
  }