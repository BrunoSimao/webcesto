import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthOwner } from '../model/AuthOwner';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { LoginService } from '../service/LoginService';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  owner: AuthOwner;
  cnpj: string;
  pass: string;

  constructor(private router: Router, private ownerService: LoginService){
  }

  ngOnInit() {
    this.owner = new AuthOwner();
  }

  LogIn() {
    this.owner.cnpj = this.cnpj;
    this.owner.password = this.pass;
    this.owner.username = "";

    console.log(this.owner);
    this.ownerService.loginOwner(this.owner).subscribe(() => {
     this.router.navigate(['/dashboard']);
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
