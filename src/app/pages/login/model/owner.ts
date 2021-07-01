import { Restaurant } from "../../cadastro-estabelecimento/model/restaurant";

export class Owner {
    cpf: string;
    ownerID: number;
    name: string;
    email: string;
    phoneNumber: string;
    addressID: number;
    isOperator: boolean;
    userID: number;
    login: string;
    password: string;
    createdAt: string;
    token: string;
    restaurant: Restaurant;
}