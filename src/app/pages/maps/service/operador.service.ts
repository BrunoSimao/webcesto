import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Operator, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { NotificationService } from 'src/app/utility/notification-service';
import { Operador } from '../model/operator.model';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {
 
  url = 'https://cesto.azurewebsites.net/api/Operator/GetAllByRestID?restaurantID=';
  urlSalvarOperador = 'https://cesto.azurewebsites.net/api/Operator';
  urlExcluirOperador = 'https://cesto.azurewebsites.net/api/Operator/';
  
  // injetando o HttpClient
  constructor(private httpClient: HttpClient, private notifyService : NotificationService,) { }
  
  token = window.sessionStorage.getItem('token');
  // Headers
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
   'Authorization': 'bearer  ' + this.token})
  }

  getPedidos(restaurantID: number): Observable<Operador[]> {
    return this.httpClient.get<Operador[]>(this.url + restaurantID, this.httpOptions)
    .pipe(map(res => res));
        // retry(2),
        // catchError(this.handleError))
  }

  salvarOperador(operador: Operador): Observable<Operador> {
    return this.httpClient.post<Operador>(this.urlSalvarOperador, JSON.stringify(operador), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  alterarOperador(operador: Operador): Observable<Operador> {
    return this.httpClient.put<Operador>(this.urlSalvarOperador, JSON.stringify(operador), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  excluirOperador(id: number): Observable<Operador> {
    return this.httpClient.delete<Operador>(this.urlExcluirOperador + id, this.httpOptions)
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