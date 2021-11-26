import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
import { NotificationService } from 'src/app/utility/notification-service';
import { ResetRequestOwnerService } from '../../reset-senha/service/reset-request-owner.service';
import { ResetPasswordOwner } from '../model/reset-password-owner';

@Component({
  selector: 'app-valida-reset-senha',
  templateUrl: './valida-reset-senha.component.html',
  styleUrls: ['./valida-reset-senha.component.scss']
})
export class ValidaResetSenhaComponent implements OnInit, OnDestroy {

  resetPasswordOwner: ResetPasswordOwner;
  email: string;
  password: string;
  code: string;
  confirmaPassword: string;
  isErrorSenha: boolean = false;


  constructor(private router: Router, private resetPasswordService: ResetRequestOwnerService,
              private notifyService : NotificationService){
  }

  ngOnInit() {
    this.resetPasswordOwner = new ResetPasswordOwner();
    this.isErrorSenha = false;
  }
  ngOnDestroy() {
  }

  enviarCodigoNovamente() {
    // this.resetPasswordOwner.email = this.email;
  
    // console.log(this.resetPasswordOwner);
    // this.resetPasswordService.enviarCodigo(this.resetPasswordOwner).subscribe(() => {
    //   this.router.navigate(['/valida-reset-senha']);
    // });
    
  }

  resetarSenha() {

    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

    this.resetPasswordOwner.code = this.code;
    this.resetPasswordOwner.password = this.password;
    this.resetPasswordOwner.email = '';

    var verificaSenha = strongRegex.test(this.resetPasswordOwner.password);
    if (!verificaSenha) {
      this.isErrorSenha = true;
      return;
    }else {
      this.isErrorSenha = false;
    }
  
    console.log(this.resetPasswordOwner);
    if (this.password === this.confirmaPassword) {
      this.resetPasswordService.resetOwner(this.resetPasswordOwner).subscribe(() => {
        this.router.navigate(['/login']);
      });
    } else {
      this.notifyService.showAlerta('As senhas não são iguais, por favor digite a senha correta!', 'Alerta!');
    }
    this.resetPasswordOwner = new ResetPasswordOwner();
  }

  goBack() {
    window.history.back();
  }
}
