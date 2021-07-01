import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { NotificationService } from 'src/app/utility/notification-service';
import { Product } from '../../pedidos/component/model/product';
import { ProductCategory } from '../model/product-category';

@Injectable({
  providedIn: 'root'
})
export class DetalheCardapioService {
 
  urlProductCategoryAll = 'https://cesto.azurewebsites.net/api/ProductCategory/FindAllByName';
  url = 'https://cesto.azurewebsites.net/api/Product'
  
  // injetando o HttpClient
  constructor(private httpClient: HttpClient, private notifyService : NotificationService,) { }
  
  token = window.sessionStorage.getItem('token');
  // Headers
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
   'Authorization': 'bearer  ' + this.token})
  }

  getProductCategory(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.urlProductCategoryAll, this.httpOptions)
    .pipe(map(res => res));
        // retry(2),
        // catchError(this.handleError))
  }

  alterarProduto(produto: Product){
    return this.httpClient.put(this.url, JSON.stringify(produto), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deletarProduto(prodID: number) {
    return this.httpClient.delete(this.url + '/' + prodID, this.httpOptions)
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