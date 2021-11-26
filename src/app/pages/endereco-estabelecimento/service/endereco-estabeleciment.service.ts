import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { NotificationService } from 'src/app/utility/notification-service';
import { EnderecoEstabelecimento } from '../model/endereco-estabelecimento';
import { Restaurant } from '../../cadastro-estabelecimento/model/restaurant';
import { AddressModel } from '../../user-profile/model/adress.model';
import { Address } from '../../cadastro-estabelecimento/model/address';

@Injectable({
  providedIn: 'root'
})
export class EndrecoEstabelecimentoService {
 
  url = 'https://cesto.azurewebsites.net/api/Address/CreateRestaurantAddress';
  urlAlterarEndereco = 'https://cesto.azurewebsites.net/api/Address';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient, private notifyService : NotificationService,) { }
  
  token = window.sessionStorage.getItem('token');

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
   'Authorization': 'bearer  ' + this.token })
  }

  salvarEnderecoEstabelecimento(enderecoEstabelecimento: Restaurant): Observable<Restaurant> {
    return this.httpClient.post<Restaurant>(this.url, JSON.stringify(enderecoEstabelecimento), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  alterarEnderecoEstabelecimento(enderecoEstabelecimento: AddressModel) {
    return this.httpClient.put<any>(this.urlAlterarEndereco, JSON.stringify(enderecoEstabelecimento), this.httpOptions)
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