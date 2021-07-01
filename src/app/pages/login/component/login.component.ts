import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthOwner } from '../model/AuthOwner';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { LoginService } from '../service/LoginService';
import { Owner } from '../model/owner';
import { Product } from '../../pedidos/component/model/product';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
              private ngxLoader: NgxUiLoaderService){
  }

  ngOnInit() {
    this.owner = new AuthOwner();
  }

  LogIn() {
    this.owner.cnpj = this.cnpj;
    this.owner.password = this.pass;
    this.owner.username = "";

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
     
      this.ngxLoader.stop();
      this.router.navigate(['/dashboard']);
      
  }, err => {
    this.ngxLoader.stop();
  });
    
    this.owner = new AuthOwner();
  }

  CadastroParceiro(){

    this.router.navigate(['/cadastro-parceiro']);
  }

  ResetSenha() {
    this.router.navigate(['/reset-senha']);
   
  }
}
