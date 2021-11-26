import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { NotificationService } from 'src/app/utility/notification-service';
import { Product } from '../../pedidos/component/model/product';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {
 
  url = 'https://cesto.azurewebsites.net/api/Product?restaurantID=';
  
  // injetando o HttpClient
  constructor(private httpClient: HttpClient, private notifyService : NotificationService,) { }
  
  token = window.sessionStorage.getItem('token');

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
   'Authorization': 'bearer  ' + this.token})
  }

  getProdutos(restaurantID: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url + restaurantID +'&limit=50&offset=0', this.httpOptions)
    .pipe(map(res => res));
        // retry(2),
        // catchError(this.handleError))
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