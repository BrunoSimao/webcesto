import { Product } from "./product";


export class OrderItem {
    orderItemID: number;
    orderID: number;
    quantity: number;
    observations: string;
    product: Product;
}