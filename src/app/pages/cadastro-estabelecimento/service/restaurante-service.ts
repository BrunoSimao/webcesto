import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';import { Restaurant } from '../model/restaurant';
import { UserService } from 'src/app/app.service';
import { RestaurantCategories } from '../model/restaurantcategories';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
 
  url = 'https://cesto.azurewebsites.net/api/Restaurant';
  urlRestaurantAll = 'https://cesto.azurewebsites.net/api/RestaurantCategory/FindAllByName';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient, private userService: UserService) { }
  
  token = window.sessionStorage.getItem('token');
  // Headers
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
   'Authorization': 'bearer  ' + this.token })
  }

  createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    console.log(this.token);
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
    window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}