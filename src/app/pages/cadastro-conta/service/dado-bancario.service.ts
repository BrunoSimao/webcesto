import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BankData } from '../model/dado-bancario';
import { Bank } from '../model/bank';

@Injectable({
  providedIn: 'root'
})
export class BankDataService {

  url = 'https://cesto.azurewebsites.net/api/BankData';
  urlBankAll = 'https://cesto.azurewebsites.net/api/Bank/FindAll';
  urlDadoBancario = 'https://cesto.azurewebsites.net/api/BankData?ownerID='

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  token = window.sessionStorage.getItem('token');

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
   'Authorization': 'bearer  ' + this.token })
  }

  createBankData(bankData: BankData): Observable<BankData> {
    return this.httpClient.post<BankData>(this.url, JSON.stringify(bankData), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

    getBanco(): Observable<Bank[]> {
    return this.httpClient.get<Bank[]>(this.urlBankAll)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getDadoBancario(ownerID: number, bankDataID: number) : Observable<BankData> {
      return this.httpClient.get<BankData>(this.urlDadoBancario + ownerID + '&bankDataID=' + bankDataID, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError)
  )
  }

  alterarDadoBancario(bankData: BankData): Observable<BankData> {
    return this.httpClient.put<BankData>(this.url, JSON.stringify(bankData), this.httpOptions)
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
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.error.detail}`;
      
    }
    window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}