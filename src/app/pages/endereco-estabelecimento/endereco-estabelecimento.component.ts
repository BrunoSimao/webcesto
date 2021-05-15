import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-EnderecoEstabelecimento',
  templateUrl: './endereco-estabelecimento.component.html',
  styleUrls: ['./endereco-estabelecimento.component.scss']
})
export class EnderecoEstabelecimentoComponent implements OnInit, OnDestroy {
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
