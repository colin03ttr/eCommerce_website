import { WatchDTO } from "./watchDTO";
import { UserDTO } from "./userDTO";

export interface OrderDTO {
    id: number;            
    userId: number;        
    items: OrderItemDTO[]; 
    totalPrice: number;    
    status: string;    
    createdAt: Date;
    updatedAt: Date;
    user?: UserDTO | null; // Ajout de any
}

export interface OrderItemDTO {
    watchId: number;       
    quantity: number;      
    price: number;   
    watch?: WatchDTO | null; // Ajout de null      
}
