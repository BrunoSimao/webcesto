import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/layouts/auth-layout/product';
import { ProductService } from '../producer.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class TablesComponent implements OnInit {
  products: Product[];
  showModalBox: boolean = false;

  constructor(private router: Router) { }

  @ViewChild('myModal') myModal;
  
  ngOnInit() {
   // this.productService.getProductsWithOrdersSmall().then(data => this.products = data);
  }

  openModel() {
    this.myModal.nativeElement.className = 'modal fade show';
  }
  closeModel() {
     this.myModal.nativeElement.className = 'modal hide';
  }

  DetalhePedido() {
    this.router.navigate(['/modal-detalhe-pedido']);
  }
}
