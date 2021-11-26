import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';import { Restaurant } from '../model/restaurant';
import { RestaurantCategories } from '../model/restaurantcategories';
import { MessageService } from 'primeng/api';
import { NotificationService } from 'src/app/utility/notification-service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
 
  url = 'https://cesto.azurewebsites.net/api/Restaurant';
  urlRestaurantAll = 'https://cesto.azurewebsites.net/api/RestaurantCategory/FindAllByName';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient, private notifyService : NotificationService,) { }
  
  token = window.sessionStorage.getItem('token');
  // Headers
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
   'Authorization': 'bearer  ' + this.token })
  }

  createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.httpClient.post<Restaurant>(this.url, JSON.stringify(restaurant), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getRestaurantCategory(): Observable<RestaurantCategories[]> {
    return this.httpClient.get<RestaurantCategories[]>(this.urlRestaurantAll, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError))
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