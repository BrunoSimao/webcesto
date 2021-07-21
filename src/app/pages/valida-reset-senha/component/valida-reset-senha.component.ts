import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 
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


  constructor(private router: Router, private resetPasswordService: ResetRequestOwnerService){
  }

  ngOnInit() {
    this.resetPasswordOwner = new ResetPasswordOwner();
  }
  ngOnDestroy() {
  }

  // enviarCodigoNovamente() {
  //   this.resetPasswordOwner.email = this.email;
  
  //   console.log(this.resetPasswordOwner);
  //   this.resetPasswordService.enviarCodigo(this.resetPasswordOwner).subscribe(() => {
  //     this.router.navigate(['/valida-reset-senha']);
  //   });
    
  // }

  resetarSenha() {
    this.resetPasswordOwner.code = this.code;
    this.resetPasswordOwner.password = this.password;
    this.resetPasswordOwner.email = '';
  
    console.log(this.resetPasswordOwner);
    this.resetPasswordService.resetOwner(this.resetPasswordOwner).subscribe(() => {
      this.router.navigate(['/login']);
    });
    
    this.resetPasswordOwner = new ResetPasswordOwner();
  }

  goBack() {
    window.history.back();
  }
}
