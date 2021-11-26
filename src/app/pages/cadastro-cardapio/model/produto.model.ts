import { ProductCategory } from "../../detalhe-cardapio/model/product-category";
import { ProductStatus } from "../../pedidos/component/model/product-status";

export class ProdutoModel {
    prodID: number;
    restaurantID: number;
    productCategories: ProductCategory[];
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
}   