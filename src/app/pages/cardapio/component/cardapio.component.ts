import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Product } from '../../pedidos/component/model/product';
import { CardapioService } from '../service/cardapio.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent implements OnInit {

  productCategory: string;
  products: Product[];
  imagemPath: string;
  restaurantID: string;
 
  constructor(private router: Router, 
    private cardapioService: CardapioService,
    private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {
    this.restaurantID = window.sessionStorage.getItem('restaurantID');
    this.ngxLoader.start();
    this.getProdutos();
    this.ngxLoader.stop();
  }

  getProdutos() {
    this.cardapioService.getProdutos(this.restaurantID).subscribe(products => {
      console.log(products);
      this.products = products;  
  }, err => {
    
  });
  }

  EditarItem() {
   
  }


  onClick(prod: Product) { 
      window.sessionStorage.setItem("produto", JSON.stringify(prod));
      this.router.navigate(['/detalhe-cardapio']);
      console.log('Click!', prod) 
  } 
}
