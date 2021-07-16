import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { NotificationService } from 'src/app/utility/notification-service';
import { OwnerModel } from '../model/owner.model';
import { Restaurant } from '../../cadastro-estabelecimento/model/restaurant';
import { RestaurantModel } from '../../alterar-dados-restaurante/model/alterar-estabelecimento.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
 
  url = 'https://cesto.azurewebsites.net/api/Owner/';
  urlAddress = 'https://cesto.azurewebsites.net/api/Address?addressID=';
  urlRestaurant = 'https://cesto.azurewebsites.net/api/Restaurant/GetRestaurantByID?restaurantID=';
  urlAlterarOwner = 'https://cesto.azurewebsites.net/api/Owner';
  urlAlterarRestaurant = 'https://cesto.azurewebsites.net/api/Restaurant';
  
  // injetando o HttpClient
  constructor(private httpClient: HttpClient, private notifyService : NotificationService,) { }
  
  token = window.sessionStorage.getItem('token');
  // Headers
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
   'Authorization': 'bearer  ' + this.token})
  }

  getOwner(ownerID: number){
    return this.httpClient.get<any>(this.url + ownerID ,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAddress(addressID: number) {
    return this.httpClient.get<any>(this.urlAddress + addressID ,this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getRestaurant(restaurantID: number) {
    return this.httpClient.get<any>(this.urlRestaurant + restaurantID ,this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  alterarOwner(owner: OwnerModel){
    return this.httpClient.put<any>(this.urlAlterarOwner, JSON.stringify(owner), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  alterarRestaurant(restaurant: RestaurantModel){
    return this.httpClient.put<any>(this.urlAlterarRestaurant, JSON.stringify(restaurant), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
   
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem:${error.error.detail}`;
    
    }
    //this.notifyService.showError(errorMessage, "Erro!!!");
    window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}