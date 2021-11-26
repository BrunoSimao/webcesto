import { DeliveryInfo } from "./delivery-info";
import { OrderItem } from "./order-item";
import { OrderStatus } from "./order-status";

export class Order {
    orderID: number;
    customerID: number;
    restaurantID: number;
    cPayMethodID: number;
    deliveryInfo: DeliveryInfo;
    orderStatus: OrderStatus;
    orderItems: OrderItem;
    observations: string;
    createdAt: string;
    requiredAt: string;
    readyAt: string;
    shippedAt: string;
    createdAtFormatted:	string;
    requiredAtFormatted: string;
    readyAtFormatted: string;
    shippedAtFormatted:	string;
    orderSecretKey:	string;
    placeTradingName: string;
    placeImageUrl: string;
    customerName: string;
    cancelReason: string;
    rating:	number;
}