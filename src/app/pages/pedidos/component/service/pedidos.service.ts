import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { NotificationService } from 'src/app/utility/notification-service';
import { Order } from '../model/order';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
 
  url = 'https://cesto.azurewebsites.net/api/Order?restaurantID=';
  urlOrder = 'https://cesto.azurewebsites.net/api/Order';
  urlVerificaPedidos = 'https://cesto.azurewebsites.net/api/Order/GetNewOrderCount?';
  
  // injetando o HttpClient
  constructor(private httpClient: HttpClient, private notifyService : NotificationService) { }
  
  token = window.sessionStorage.getItem('token');
  // Headers
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
   'Authorization': 'bearer  ' + this.token})
  }

  getPedidos(restaurantID: string): Observable<Order[]> {
    var token = window.sessionStorage.getItem('token');

    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
     'Authorization': 'bearer  ' + token})
    }
    return this.httpClient.get<Order[]>(this.url + restaurantID +'&limit=10&offset=0', this.httpOptions)
    .pipe(map(res => res));
        // retry(2),
        // catchError(this.handleError))
  }

  aceitarPedido(produto: Order): Observable<Order> {
    return this.httpClient.put<Order>(this.urlOrder, JSON.stringify(produto), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  verificaPedidos(restaurantID: number, lastReadID: number): Observable<any> {
    var token = window.sessionStorage.getItem('token');

    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
     'Authorization': 'bearer  ' + token})
    }
    return this.httpClient.get<any>(this.urlVerificaPedidos + 'restaurantID=' + restaurantID + '&lastReadID=' + lastReadID, this.httpOptions)
    .pipe(map(res => res));
    // retry(2),
    // catchError(this.handleError))
  }

  recusarPedido(produto: Order): Observable<Order> {
    return this.httpClient.put<Order>(this.urlOrder, JSON.stringify(produto), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  pedidoPronto(produto: Order): Observable<Order> {
    return this.httpClient.put<Order>(this.urlOrder, JSON.stringify(produto), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  colocarSenha(produto: Order): Observable<Order> {
    return this.httpClient.put<Order>(this.urlOrder, JSON.stringify(produto), this.httpOptions)
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