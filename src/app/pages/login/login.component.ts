import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private router: Router){
  }

  LogOn() {
    this.router.navigate(['/dashboard']);
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
