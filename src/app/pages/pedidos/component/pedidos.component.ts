import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { element } from 'protractor';
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
  produto: Product;
  showModalBox: boolean = false;
  pedidos: Order[];
  pedido: Order;
  orderItems: OrderItem[];
  data: any;
  aguardandoConfirmacaoCount: number = 0;
  finalizadoSucesso: number = 0;
  emAndamentoCount: number = 0;
  canceladoCount: number = 0;
  displayResponsive: boolean = false;
  name: string = '';
  amount: number = 0;
  descricaoStatus: string = '';
  motivoCancelamento: string = '';
  orderID: number = 0;
  quantity: number = 0;
  isShowAceitarPedido: boolean = false;
  isShowRecusarPedido: boolean = false;
  isShowPedidoPronto: boolean = false;
  isShowColocarSenha: boolean = false;
  isShowCancelado: boolean = false;
  pag : Number = 1 ;
  contador : Number = 5;
  
  constructor(private router: Router,
              private ngxLoader: NgxUiLoaderService,
              private pedidosService: PedidosService) { }

  @ViewChild('myModal') myModal;
  
  ngOnInit() {
    this.pedido = new Order();
    this.isShowCancelado = false;
    var restaurantID = window.sessionStorage.getItem('restaurantID');
    this.pedidosService.getPedidos(restaurantID).subscribe((pedidos: Order[]) => {

      console.log(pedidos);
      var orderStatus = pedidos.map(function(item, indice){
        if (Array.isArray(item.orderStatus) != null) {
          return item.orderStatus;
        }
       
     });
     console.log(orderStatus);

     var orderItems = pedidos.map(function(item, indice){
      if (Array.isArray(item.orderStatus) != null) {
        return item.orderItems;
      }
     
   });
   console.log(orderItems);
   
   var produt = orderItems.map(function(item, indice){
    if (Array.isArray(item.product) != null) {
      return item.product;
    }
   
 });
 console.log(produt);

     orderStatus.forEach(element => {
        if (element.statusDescription === 'ordered') {
           this.aguardandoConfirmacaoCount +=1;
          element.statusDescription = 'Aguardando Confirmação';
        } else if (element.statusDescription === 'prepared' || element.statusDescription === 'preparing') {
          this.emAndamentoCount += 1;
          element.statusDescription = 'Preparando';
        } else if (element.statusDescription === 'done') { 
          this.finalizadoSucesso += 1;
          element.statusDescription = 'Finalizado com Sucesso';
        } else if (element.statusDescription === 'rejected' || element.statusDescription === 'canceled') {
          this.canceladoCount += 1;
          element.statusDescription = 'Pedido Cancelado';
        }
     });

     this.pedidos = pedidos;

    });
  }


  showResponsiveDialog(event: any) {
    console.log(event);
    this.produto = event;
    console.log(this.produto);
    this.name = event.customerName;
    this.amount = event.amount;
    this.orderID = event.orderID;
    console.log(event.orderStatus.statusDescription);
    this.isShowCancelado = false;
    this.isShowAceitarPedido = false;
    this.isShowRecusarPedido = false;
    this.isShowPedidoPronto = false;

   if (event.orderStatus.statusDescription == 'Pedido Cancelado') {
     this.descricaoStatus = event.orderStatus.statusDescription;
     this.motivoCancelamento = event.cancelReason;
     this.isShowCancelado = true;
   } else if (event.orderStatus.statusDescription == 'Finalizado com Sucesso') {
    this.descricaoStatus = event.orderStatus.statusDescription;
   } else if (event.orderStatus.statusDescription == 'Aguardando Confirmação') {
    this.descricaoStatus = event.orderStatus.statusDescription;
    this.isShowAceitarPedido = true;
    this.isShowRecusarPedido = true;
   } else if (event.orderStatus.statusDescription == 'Preparando') {
     this.descricaoStatus = event.orderStatus.statusDescription;
     this.isShowPedidoPronto = true;
   }

    this.displayResponsive = true;
  }

  aceitarPedido() {
    console.log(this.produto);
    this.ngxLoader.start();
    this.pedidosService.aceitarPedido(this.produto).subscribe(res => {
      console.log(res);

      this.router.navigate(['/tables']);
      this.ngxLoader.stop();
  }, err => {
    this.ngxLoader.stop();
  });
  
  }

  recusarPedido() {
    console.log(this.produto);
    this.ngxLoader.start();
    this.pedidosService.recusarPedido(this.produto).subscribe(res => {
      console.log(res);
      this.router.navigate(['/tables']);
      this.ngxLoader.stop();
  }, err => {
    this.ngxLoader.stop();
  });
}

  pedidoPronto() {
    console.log(this.produto);
    this.ngxLoader.start();
    this.pedidosService.pedidoPronto(this.produto).subscribe(res => {
      console.log(res);
      this.router.navigate(['/tables']);
      this.ngxLoader.stop();
  }, err => {
    this.ngxLoader.stop();
  });
  }

  colocarSenha() {
    console.log(this.produto);
    this.ngxLoader.start();
    this.pedidosService.pedidoPronto(this.produto).subscribe(res => {
      console.log(res);
      this.router.navigate(['/tables']);
      this.ngxLoader.stop();
  }, err => {
    this.ngxLoader.stop();
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
