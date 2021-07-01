import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AuthOwner } from '../model/AuthOwner';
import { Owner } from '../model/owner';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'https://cesto.azurewebsites.net/api/AppAuth/AuthOwner'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  loginOwner(authOwner: AuthOwner){
    return this.httpClient.post(this.url, JSON.stringify(authOwner), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }



  // deleta um carro
//   deleteCar(car: Car) {
//     return this.httpClient.delete<Car>(this.url + '/' + car.id, this.httpOptions)
//       .pipe(
//         retry(1),
//         catchError(this.handleError)
//       )
//   }

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