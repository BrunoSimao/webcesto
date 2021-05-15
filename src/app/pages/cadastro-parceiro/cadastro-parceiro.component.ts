import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-CadastroParceiro',
  templateUrl: './cadastro-parceiro.component.html',
  styleUrls: ['./cadastro-parceiro.component.scss']
})
export class CadastroParceiroComponent implements OnInit, OnDestroy {
  constructor(private router: Router){
  }

  CadastroEstabelecimento() {
    this.router.navigate(['/cadastro-estabelecimento']);
  }

  goBack() {
    window.history.back();
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
