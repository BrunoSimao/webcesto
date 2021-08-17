import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Order } from 'src/app/pages/pedidos/component/model/order';
import { PedidosService } from 'src/app/pages/pedidos/component/service/pedidos.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/tables', title: 'Pedidos',  icon:'ni-bell-55 text-primary', class: '' },
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    //{ path: '/register', title: 'Operadores',  icon:'ni-bullet-list-67 text-primary', class: '' },
    { path: '/cardapio', title: 'Cardápio',  icon:'ni-bullet-list-67 text-primary', class: '' },
    { path: '/icons', title: 'Relatório',  icon:'ni-planet text-blue', class: '' },
     { path: '/maps', title: 'Operadores',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/user-profile', title: 'Perfil de usuário',  icon:'ni-pin-3 text-orange', class: '' }
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,
              private pedidosService: PedidosService) { }

  ngOnInit() {
    
    setInterval(() => {
      this.getVerificaPedidos(); 
      }, 5000);

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  getVerificaPedidos() {
    var restaurantID = parseInt(window.sessionStorage.getItem('restaurantID'));
    var primeiroParametro = 0

    this.pedidosService.getPedidos(restaurantID.toString()).subscribe((pedidos: Order[]) => {
      console.log(pedidos);

      console.log(pedidos.length);

   //Função para verificar se há pedidos novos na hora de logar.
    // if (pedidos.filter(x => x.orderStatus.statusDescription === 'ordered')) {
    //   var audio = new Audio('./assets/img/ding-dong-pedido.mp3');
    //   audio.play();
    // }

   window.sessionStorage.setItem('quantidadeAtualPedido', pedidos.length.toString());
  });

    
    this.pedidosService.verificaPedidos(restaurantID, primeiroParametro).subscribe(res => {
    console.log(res);

    var valorAtualPedido = parseInt(window.sessionStorage.getItem('quantidadeAtualPedido'));
    console.log(valorAtualPedido);
  
    if (!isNaN(res)) {
      if (res !== valorAtualPedido) {
        var audio = new Audio('./assets/img/ding-dong-pedido.mp3');
        audio.play();
        this.router.navigate(['/tables']);
      }
    }
   
    
  }, err => {
    console.log(err);
  });

  console.log('Chamada verifica pedido novo');
  
  }
 }
