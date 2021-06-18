import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ResetRequestOwner } from '../model/reset-request-owner';

@Injectable({
  providedIn: 'root'
})
export class ResetRequestOwnerService {

  url = 'https://cesto.azurewebsites.net/api/AppAuth/ResetRequestOwner';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  resetOwner(resetOwnerEmail: ResetRequestOwner): Observable<ResetRequestOwner> {
    return this.httpClient.post<ResetRequestOwner>(this.url, JSON.stringify(resetOwnerEmail), this.httpOptions)
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
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      
    }
    window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}