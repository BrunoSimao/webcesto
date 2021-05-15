import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.scss']
})
export class ResetSenhaComponent implements OnInit, OnDestroy {
  constructor(private router: Router){
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  goBack() {
    window.history.back();
  }

  ValidaResetSenha() {
    this.router.navigate(['/valida-reset-senha']);
  }
}
