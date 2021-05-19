import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  EditarItem() {
    this.router.navigate(['/detalhe-cardapio']);
  }

}
