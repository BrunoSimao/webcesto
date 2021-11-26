export class RestaurantModel {
    cnpj: string;
    restaurantID: number;
    ownerID: number;
    addressID: number;
    address: string;
    restaurantCategories: string;
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
    onlyForTake: boolean;
    onBehalfOf: string;
    rating: string;
}