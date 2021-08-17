import { ProductCategory } from "./product-category";
import { ProductStatus } from "./product-status";

export class Product {
    prodID: number;
    restaurantID: number;
    productCategories: ProductCategory;
    productStatus: ProductStatus;
    name: string;
    description: string;
    productCategory: string;
    stockLevel: number;
    price: number;
    finalPrice: number;
    discount: number;
    imageURL: string;
    createdAt: string;
    quantity: number;
}   