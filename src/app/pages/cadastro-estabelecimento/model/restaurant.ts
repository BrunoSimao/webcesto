import { Address } from "./address";
import { Rating } from "./rating";
import { RestaurantCategories } from "./restaurantcategories";

export class Restaurant {
    cnpj: string;
    restaurantID: number;
    ownerID: number;
    addressID: number;
    address: Address;
    restaurantCategories: RestaurantCategories;
    companyName: string;
    tradingName: string;
    phoneNumber: string;
    imageURL: string;
    createdAt: string;
    categoriesFormatted: string;
    distance: number;
    distanceFormatted: string;
    preparationTime: number;
    attending: boolean;
    onlyForTake:  boolean;
    onBehalfOf: string;
    rating: Rating;
}
