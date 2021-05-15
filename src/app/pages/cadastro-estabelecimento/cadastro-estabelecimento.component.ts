import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-CadastroEstabelecimento',
  templateUrl: './cadastro-estabelecimento.component.html',
  styleUrls: ['./cadastro-estabelecimento.component.scss']
})
export class CadastroEstabelecimentoComponent implements OnInit, OnDestroy {
  constructor(private router: Router){
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  CadastroDadosBancario() {
    this.router.navigate(['/cadastro-conta']);
  }

  
  goBack() {
    window.history.back();
  }

}
