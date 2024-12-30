import { WatchDTO } from "./watchDTO";

export interface OrderDTO {
    id: number;            
    userId: number;        
    items: OrderItemDTO[]; 
    totalPrice: number;    
    status: string;    
    createdAt: Date;
    updatedAt: Date;

}

export interface OrderItemDTO {
    watchId: number;       
    quantity: number;      
    price: number;   
    watch?: WatchDTO | null; // Ajout de null      
}
