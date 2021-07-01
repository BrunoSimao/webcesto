import { DeliveryType } from "./delivery-type";

export class DeliveryInfo {
    deliveryInfoID: number;	
    orderID:  number;
    deliveryType: DeliveryType; 
    tableNumber: number;
    observations: string;
   
}