import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Operador } from './model/operator.model';
import { OperadorService } from './service/operador.service';
declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  operadores: Operador[];
  operador: Operador;
  submitted: boolean;
  productDialog: boolean;
  username: string;
  password: string;
  restaurantID: number;
  isSalvar: boolean = false;
  isExcluir: boolean = false;
  isAlterar: boolean = false;

  constructor(private operadorService: OperadorService, private router: Router) { }

  ngOnInit() {
  this.isSalvar = false;
  this.isExcluir = false;
  this.isAlterar = false;

  this.operador = new Operador();
  this.operadores = new Array<Operador>();
   this.restaurantID =  parseInt(window.sessionStorage.getItem('restaurantID'));
  this.getOperador(this.restaurantID);
  }

  getOperador(restaurantID: number) {
    this.operadorService.getPedidos(restaurantID).subscribe(res => {
      console.log(res);
      this.operadores = res;
     });
  }

  salvarOperador() {
   
    // this.operador.username = this.username;
    // this.operador.password = this.password;
    this.operador.restaurantID = this.restaurantID;

    this.operadorService.salvarOperador(this.operador).subscribe( res => {
     console.log(res);
     this.productDialog = false;
     
     this.router.navigate(['/maps']);
     this.getOperador(this.restaurantID);

    });
  }

  alterarOperador() {
    this.operadorService.alterarOperador(this.operador).subscribe( res => {
      console.log(res);
      this.productDialog = false;
      
      this.router.navigate(['/maps']);
      this.getOperador(this.restaurantID);
 
     });
  }

  editProduct(operador: Operador) {
    this.operador = {...operador};
    this.productDialog = true;
    this.isExcluir = false;
    this.isSalvar = false;
    this.isAlterar = true;
}

deleteProduct(operador: Operador) {
  this.operadorService.excluirOperador(operador.operatorID).subscribe( res => {
    console.log(res);
    this.productDialog = false;
    this.router.navigate(['/maps']);
    this.getOperador(this.restaurantID);
   });
}


  openNew() {
    this.submitted = false;
    this.isSalvar = true;
    this.isExcluir = false;
    this.isAlterar = false;
    this.productDialog = true;
    this.operador = new Operador();
}

}
