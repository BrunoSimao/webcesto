import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-valida-reset-senha',
  templateUrl: './valida-reset-senha.component.html',
  styleUrls: ['./valida-reset-senha.component.scss']
})
export class ValidaResetSenhaComponent implements OnInit, OnDestroy {
  constructor(private router: Router){
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  goBack() {
    window.history.back();
  }
}
