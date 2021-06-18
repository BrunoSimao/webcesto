import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ResetPasswordOwner } from '../model/reset-password-owner';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordOwnerService {

  url = 'ttps://cesto.azurewebsites.net/api/AppAuth/ResetPasswordOwner';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  resetOwner(resetPassword: ResetPasswordOwner): Observable<ResetPasswordOwner> {
    return this.httpClient.post<ResetPasswordOwner>(this.url, JSON.stringify(resetPassword), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  enviarCodigo(resetOwnerEmail: ResetPasswordOwner): Observable<ResetPasswordOwner> {
    return this.httpClient.post<ResetPasswordOwner>(this.url, JSON.stringify(resetOwnerEmail), this.httpOptions)
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