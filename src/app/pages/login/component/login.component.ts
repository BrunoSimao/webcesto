import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgForm } from '@angular/forms';
import {LoginService} from '../service/loginService';
import { AuthOwner } from '../model/AuthOwner';
import { NotificationService } from 'src/app/utility/notification-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private router: Router, 
  private loginService: LoginService,
  private notifyService : NotificationService){
  }

  owner = {} as AuthOwner;
  owners: AuthOwner[];

  LogOn(form: NgForm) {
  
    console.log(this.owner.cnpj);
    console.log(this.owner.password);
    if (this.owner.cnpj != undefined) {
      this.notifyService.showSuccess("Por favor digite o CNPJ.", "Erro!!!");
    }if (this.owner.password != undefined) {
      this.notifyService.showSuccess("Por favor digite a senha.", "Erro!!!");
    }
     else {
      this.loginService.loginOwner(this.owner).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  CadastroParceiro(){
    this.router.navigate(['/cadastro-parceiro']);
  }

  ResetSenha() {
    this.router.navigate(['/reset-senha']);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
