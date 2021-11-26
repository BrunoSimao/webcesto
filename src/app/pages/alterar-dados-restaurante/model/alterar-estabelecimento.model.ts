import { RestaurantCategories } from "../../cadastro-estabelecimento/model/restaurantcategories";

export class RestaurantModel {
    restaurantID: number;
    companyName: string;
    tradingName: string;
    phoneNumber: string;
    cnpj: string;
    imageURL: string;
    onlyForTake: boolean;
    restaurantCategories: RestaurantCategories;
}