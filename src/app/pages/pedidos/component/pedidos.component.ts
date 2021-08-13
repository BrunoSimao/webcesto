import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { element } from 'protractor';
import { DeliveryInfo } from './model/delivery-info';
import { DeliveryType } from './model/delivery-type';
import { Order } from './model/order';
import { OrderItem } from './model/order-item';
import { OrderStatus } from './model/order-status';
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
  deliveryInfo: DeliveryInfo;
  pedidosAll: Order[];
  pedido: Order;
  orderItems: OrderItem[];
  data: any;
  aguardandoConfirmacaoCount: number = 0;
  finalizadoSucesso: number = 0;
  emAndamentoCount: number = 0;
  canceladoCount: number = 0;
  pedidoProntoCount: number = 0;
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
  primeiraChamada: boolean = false;
  productCategory: string;
  
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
        } else if (element.statusDescription === 'preparing') {
          this.emAndamentoCount += 1;
          element.statusDescription = 'Preparando';
        } else if (element.statusDescription === 'done') { 
          this.finalizadoSucesso += 1;
          element.statusDescription = 'Finalizado com Sucesso';
        } else if (element.statusDescription === 'rejected' || element.statusDescription === 'canceled') {
          this.canceladoCount += 1;
          element.statusDescription = 'Pedido Cancelado';
        } else if (element.statusDescription === 'prepared') {
          this.pedidoProntoCount += 1;
          element.statusDescription = 'Pedido Pronto';
        }
     });

     this.pedidos = pedidos;
     this.pedidosAll = pedidos;
     this.primeiraChamada = true;

    });
  }

  pedodosAll() {
    this.pedidos = this.pedidosAll;
  }

  showResponsiveDialog(event: any) {
    console.log(event);
    //this.pedido = event;
    this.pedido.orderID = event.orderID;
    this.pedido.customerID = event.customerID;
    this.pedido.restaurantID = event.restaurantID;
    this.pedido.cPayMethodID = event.cPayMethodID;
    this.pedido.deliveryInfo = new DeliveryInfo();
    this.pedido.deliveryInfo.deliveryInfoID = event.deliveryInfo.deliveryInfoID;
    this.pedido.deliveryInfo.orderID = event.deliveryInfo.orderID;
    this.pedido.deliveryInfo.tableNumber = event.deliveryInfo.tableNumber;
    this.pedido.deliveryInfo.observations = event.deliveryInfo.observations;
    this.pedido.deliveryInfo.deliveryType = new DeliveryType();
    this.pedido.deliveryInfo.deliveryType.deliveryTypeID = event.deliveryInfo.deliveryType.deliveryTypeID;
    this.pedido.deliveryInfo.deliveryType.deliveryTypeName = event.deliveryInfo.deliveryType.deliveryTypeName;
    this.pedido.orderStatus = new OrderStatus();
    this.pedido.orderStatus.orderStatusID = event.orderStatus.orderStatusID;
    this.pedido.orderStatus.statusDescription = event.orderStatus.statusDescription;
    this.pedido.orderItems = event.orderItems;
    this.pedido.observations = event.observations;
    this.pedido.createdAt = event.createdAt;
    this.pedido.requiredAt = event.requiredAt;
    this.pedido.readyAt = event.readyAt;
    this.pedido.shippedAt = event.shippedAt;
    this.pedido.createdAtFormatted = event.createdAtFormatted;
    this.pedido.requiredAtFormatted = event.requiredAtFormatted;
    this.pedido.readyAtFormatted = event.readyAtFormatted;
    this.pedido.shippedAtFormatted = event.shippedAtFormatted;
    this.pedido.orderSecretKey = event.orderSecretKey;
    this.pedido.placeTradingName = event.placeTradingName;
    this.pedido.placeImageUrl = event.placeImageUrl;
    this.pedido.customerName = event.customerName;
    this.pedido.cancelReason = event.cancelReason;
    this.pedido.rating = event.rating;

    console.log(this.pedido);
    this.name = event.customerName;
    this.amount = event.amount;
    this.orderID = event.orderID;
    console.log(event.orderStatus.statusDescription);
    this.isShowCancelado = false;
    this.isShowAceitarPedido = false;
    this.isShowRecusarPedido = false;
    this.isShowPedidoPronto = false;
    this.isShowColocarSenha = false;

    event.orderItems.forEach(element => {
      this.productCategory = element.product.productCategory;
      console.log(element.product.name)
    }); 

   if (event.orderStatus.statusDescription == 'Pedido Cancelado') {
     this.descricaoStatus = event.orderStatus.statusDescription;
     this.motivoCancelamento = event.cancelReason;
     this.isShowCancelado = true;
   } else if (event.orderStatus.statusDescription == 'Finalizado com Sucesso') {
    this.descricaoStatus = event.orderStatus.statusDescription;
    //Teste retirar
    // this.isShowAceitarPedido = true;
    // this.isShowRecusarPedido = true;
   } else if (event.orderStatus.statusDescription == 'Aguardando Confirmação') {
    this.descricaoStatus = event.orderStatus.statusDescription;
    this.isShowAceitarPedido = true;
    this.isShowRecusarPedido = true;
   } else if (event.orderStatus.statusDescription == 'Preparando') {
     this.descricaoStatus = event.orderStatus.statusDescription;
     this.isShowPedidoPronto = true;
   } else if (event.orderStatus.statusDescription == 'Pedido Pronto') {
     this.isShowColocarSenha = true;
   }

    this.displayResponsive = true;
  }

  aceitarPedido() {
    this.ngxLoader.start();
    console.log(this.pedido);
    this.pedido.orderStatus.orderStatusID = 2;
    this.pedido.orderStatus.statusDescription = 'preparing';
    this.pedidosService.aceitarPedido(this.pedido).subscribe(res => {
      console.log(res);
      location.reload();
      this.ngxLoader.stop();
  }, err => {
    this.ngxLoader.stop();
  });
  }

  recusarPedido() {
    console.log(this.pedido);
    this.pedido.orderStatus.orderStatusID = 4;
    this.pedido.orderStatus.statusDescription = 'rejected';
    this.ngxLoader.start();
    this.pedidosService.recusarPedido(this.pedido).subscribe(res => {
      console.log(res);
      location.reload();
      this.ngxLoader.stop();
  }, err => {
    this.ngxLoader.stop();
  });
}

  pedidoPronto() {
    console.log(this.pedido);
    this.pedido.orderStatus.orderStatusID = 3;
    this.pedido.orderStatus.statusDescription = 'prepared';
    this.ngxLoader.start();
    this.pedidosService.pedidoPronto(this.pedido).subscribe(res => {
      console.log(res);
      location.reload();
      this.ngxLoader.stop();
  }, err => {
    this.ngxLoader.stop();
  });
  }

  colocarSenha() {
    console.log(this.pedido);
    this.pedido.orderStatus.orderStatusID = 6;
    this.pedido.orderStatus.statusDescription = 'done'; 
    this.ngxLoader.start();
    this.pedidosService.pedidoPronto(this.pedido).subscribe(res => {
      console.log(res);
      location.reload();
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

  ngOnDestroy() {
    //clearInterval(intervalo);
  }

  filtroPedidoPronto() {
    this.pedidos = this.pedidosAll.filter(x => x.orderStatus.statusDescription === 'Pedido Pronto');
  }

  filtroAguardandoConfirmacao() {
    this.pedidos = this.pedidosAll.filter(x => x.orderStatus.statusDescription === 'Aguardando Confirmação');
  }

  filtroEmAndamento() {
    this.pedidos = this.pedidosAll.filter(x => x.orderStatus.statusDescription === 'Preparando');
  }

  filtroCancelado() {
    this.pedidos = this.pedidosAll.filter(x => x.orderStatus.statusDescription === 'Pedido Cancelado');
  }

  filtroFinalizadoSucesso() {
  this.pedidos = this.pedidosAll.filter(x => x.orderStatus.statusDescription === 'Finalizado com Sucesso');
  }
}
