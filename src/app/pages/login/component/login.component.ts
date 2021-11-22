import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthOwner } from '../model/AuthOwner';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { LoginService } from '../service/LoginService';
import { Owner } from '../model/owner';
import { Product } from '../../pedidos/component/model/product';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PedidosService } from '../../pedidos/component/service/pedidos.service';
import { Order } from '../../pedidos/component/model/order';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  owner: AuthOwner;
  cnpj: string;
  pass: string;
  product: Product[];
  ownerProduct: Owner;
  
  data: any;

  constructor(private router: Router, 
              private ownerService: LoginService,
              private ngxLoader: NgxUiLoaderService,
              private pedidosService: PedidosService){
  }

  ngOnInit() {
    this.owner = new AuthOwner();
  }

  LogIn() {

    this.owner.cnpj = this.cnpj;
    this.owner.password = this.pass;
    this.owner.username = "";

    this.owner.cnpj = this.owner.cnpj.replace('.', '').replace('.', '').replace('/', '').replace('-', '');

    console.log(this.owner);
    this.ngxLoader.start();
    this.ownerService.loginOwner(this.owner).subscribe(res => {
      
      this.data = res;
      console.log(this.data);
      console.log(this.data.owner.token)
      console.log(res);
    
      window.sessionStorage.setItem('token', this.data.owner.token);
      window.sessionStorage.setItem('ownerID', this.data.owner.ownerID);
      window.sessionStorage.setItem('imagemRestaurantURL', this.data.restaurant.imageURL);
      window.sessionStorage.setItem('nomeRestaurante', this.data.restaurant.companyName);
      window.sessionStorage.setItem('restaurantID', this.data.restaurant.restaurantID);
      window.sessionStorage.setItem('addressID', this.data.restaurant.addressID);
      window.sessionStorage.setItem('bankDataID', this.data.bankData.bankDataID);
      window.sessionStorage.setItem("restaurant", JSON.stringify(this.data.restaurant));

      this.verificaUltimoPedido(this.data.restaurant.restaurantID);

      this.ngxLoader.stop();
      this.router.navigate(['/dashboard']);
      
  }, err => {
    this.ngxLoader.stop();
  });
    
    this.owner = new AuthOwner();
  }

  verificaUltimoPedido(restaurantID) {
    this.pedidosService.getPedidos(restaurantID).subscribe((pedidos: Order[]) => {
      console.log(pedidos);

      console.log(pedidos.length);

   //Função para verificar se há pedidos novos na hora de lnogar ordered.
   pedidos.forEach(element => {
     if (element.orderStatus.statusDescription === 'ordered') {
      var audio = new Audio('./assets/img/ding-dong-pedido.mp3');
      audio.play();
      
      this.router.navigate(['/tables']);
     }

   });

   window.sessionStorage.setItem('quantidadeAtualPedido', pedidos.length.toString());
  });
}

  CadastroParceiro(){
    this.router.navigate(['/cadastro-parceiro']);
  }

  ResetSenha() {
    this.router.navigate(['/reset-senha']);
  }
}
