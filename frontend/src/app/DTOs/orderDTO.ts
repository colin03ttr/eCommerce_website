export interface OrderDTO {
    id: number;            
    userId: number;        
    items: OrderItemDTO[]; 
    totalPrice: number;    
    status: string;        
}

export interface OrderItemDTO {
    watchId: number;       
    quantity: number;      
    price: number;         
}
