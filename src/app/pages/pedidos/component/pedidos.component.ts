import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Order } from './model/order';
import { OrderItem } from './model/order-item';
import { Product } from './model/product';
import { PedidosService } from './service/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
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
export class PedidosComponent implements OnInit {
  products: Product[];
  showModalBox: boolean = false;
  pedidos: Order[];
  pedido: Order;
  orderItems: OrderItem[];
  data: any;

  constructor(private router: Router,
              private ngxLoader: NgxUiLoaderService,
              private pedidosService: PedidosService) { }

  @ViewChild('myModal') myModal;
  
  ngOnInit() {
    this.pedido = new Order();
    var restaurantID = window.sessionStorage.getItem('restaurantID');
    this.pedidosService.getPedidos(restaurantID).subscribe((pedidos: Order[]) => {

      var orderitens = pedidos.map(function(item, indice){
        if (Array.isArray(item.orderItems) != null) {
          return item.orderItems;
        }
       
     });
     console.log(orderitens);

  //    var produtos = orderitens.map(function(itemProduto, indice){
  //      if (orderitens.length === 0 && orderitens.length === undefined){
  //       console.log(itemProduto);
  //      }else{
  //         return itemProduto.product;
  //      }
  //  });
  //  console.log(produtos);

      this.pedidos = pedidos;
     

       console.log(this.pedidos);
       pedidos.forEach(element => {
         this.pedido.customerName = element.customerName;
         this.pedido.orderID = element.orderID;
        
        //  this.pedido.orderItems = new OrderItem();
        //  this.pedido.orderItems.product = new Product();
        //  this.pedido.orderItems.product.finalPrice = element.orderItems.product.finalPrice;
      
        //  this.pedido.orderItems.product.productCategory = element.orderItems.product.productCategory;
        //  this.pedido.orderItems.product.finalPrice = element.orderItems.product.finalPrice;
         //this.pedidos.push(this.pedido);
       });

       //console.log(this.pedidos);
       console.log(this.pedido);
    });
   
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
